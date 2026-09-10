// Geometry for the cursor- and scroll-driven particle field.
//
// The reference composition is a single idea rather than a sequence of shapes:
// a dense spiral galaxy that, as the hero scrolls away, expands radially until
// it has cleared the viewport, leaving a quiet ambient starfield behind the
// page content. Modelling it as two states (galaxy -> dispersed) keeps the
// render loop to one interpolation and makes reverse scrolling exact, since
// the same interpolation simply runs backwards.
//
// Positions live in a normalised space roughly spanning a 2-unit cube centred
// on the origin, and are built ONCE per particle at startup. The render loop
// then only lerps between two precomputed slabs, so the per-frame cost is a
// few multiply-adds per particle rather than a dozen trig calls.

export const TAU = Math.PI * 2;

// Galaxy at rest, fully dispersed once the hero has been scrolled past.
export const STATE_COUNT = 2;

// Deterministic pseudo-random so the field looks identical on every load and
// across the build pass and the render pass.
export function makeRandom(seed) {
  let state = seed >>> 0;
  return function random() {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 100000) / 100000;
  };
}

// The field is three populations. Arms carry the shape; the bulge is the dense
// bright core the reference has at its centre (an arm-only spiral collapses to
// bare spokes near r=0, leaving a hole); the halo is the faint scatter that
// stops the spiral reading as a drawn curve.
export const KIND_ARM = 0;
export const KIND_BULGE = 1;
export const KIND_HALO = 2;

const BULGE_FRACTION = 0.2;
const HALO_FRACTION = 0.11;

// Number of spiral arms and how tightly they wind.
//
// The winding is applied to log(radius), not to radius: a true logarithmic
// spiral. Making the angle proportional to radius instead produces evenly
// spaced arms, which read as concentric rings rather than as a spiral - the
// single biggest thing that separates a convincing galaxy from a dartboard.
// Two arms is what the reference shows; more blur into a uniform disc.
const ARMS = 2;
const WINDING = 4.15;
// Radius at which the arms start, so log() stays bounded and the innermost
// winding does not spin off to infinity inside the bulge.
const ARM_INNER = 0.055;
// How strongly arm particles bunch towards the centre. Must be > 1.
const RADIAL_CONCENTRATION = 1.55;

/**
 * The landing composition: a logarithmic two-arm spiral with a bright core.
 *
 * `p.u` drives radius, `p.v` the along-arm spread and `p.w` the vertical
 * thickness, so every particle keeps a stable identity between states.
 */
function spiralGalaxy(p, out) {
  if (p.kind !== KIND_ARM) {
    const isBulge = p.kind === KIND_BULGE;
    const theta = p.u * TAU;
    const phi = Math.acos(2 * p.v - 1);
    // The bulge packs tightly around the origin (high exponent = strong
    // central concentration); the halo spreads out past the arm tips.
    const radius = isBulge
      ? Math.pow(p.w, 1.4) * 0.46
      : 0.2 + Math.pow(p.w, 0.7) * 1.0;
    const sinPhi = Math.sin(phi);

    out[0] = Math.cos(theta) * sinPhi * radius;
    // Flattened on Y so both still read as part of a disc seen face-on.
    out[1] = Math.cos(phi) * radius * (isBulge ? 0.55 : 0.3);
    out[2] = Math.sin(theta) * sinPhi * radius;
    return;
  }

  // Exponent > 1 concentrates particles towards the core and thins the arm
  // tips, which is the density gradient the reference shows. An exponent below
  // 1 does the opposite: it biases towards the rim and leaves a hollow centre.
  const radius = ARM_INNER + Math.pow(p.u, RADIAL_CONCENTRATION) * (1 - ARM_INNER);

  // Arm width is specified as a physical thickness and converted to an angle,
  // rather than being an angle directly. A fixed angular spread would make the
  // arms hairline-thin at the core and fan out at the rim; this keeps them a
  // consistent width along their whole length, which is what reads as an arm.
  const thickness = 0.06 + radius * 0.2;
  const spread = (p.v - 0.5) * (thickness / Math.max(radius, 0.1));
  const angle =
    p.arm * (TAU / ARMS) + Math.log(radius / ARM_INNER) * WINDING + spread;

  // Disc height: thin at the core, thicker towards the rim.
  const height = 0.03 + radius * 0.07;

  out[0] = Math.cos(angle) * radius;
  out[1] = (p.w - 0.5) * height;
  out[2] = Math.sin(angle) * radius;
}

/**
 * The scrolled-away state: every particle pushed radially outward along the
 * direction it already had, far enough that the composition has left the
 * frame. Because the direction is preserved, the outward flight and the
 * inward reconstruction on reverse scroll trace the same path.
 */
function dispersed(p, out) {
  spiralGalaxy(p, out);

  const x = out[0];
  const z = out[2];
  const length = Math.hypot(x, z) || 0.0001;

  // Particles that started near the core travel furthest, so the centre
  // empties first - the "clearing" that the reference shows mid-transition.
  const push = 3.1 + (1 - Math.min(length, 1)) * 2.4 + p.v * 1.2;

  out[0] = (x / length) * length * push;
  out[2] = (z / length) * length * push;
  out[1] = out[1] * push + (p.w - 0.5) * 0.6;
}

const STATES = [spiralGalaxy, dispersed];

/**
 * Creates the per-particle seed records. Kept here (rather than in the
 * component) so the arm assignment, halo split and knot brightness all stay
 * consistent with the geometry that consumes them.
 */
export function createParticles(count, paletteWeights) {
  const random = makeRandom(0x9e3779b9);
  const particles = new Array(count);

  for (let i = 0; i < count; i += 1) {
    const u = random();
    const v = random();
    const w = random();

    let colorIndex = 0;
    let cumulative = 0;
    const colorRoll = random();

    for (let c = 0; c < paletteWeights.length; c += 1) {
      cumulative += paletteWeights[c];
      if (colorRoll <= cumulative) {
        colorIndex = c;
        break;
      }
    }

    const kindRoll = random();
    let kind = KIND_ARM;
    if (kindRoll < BULGE_FRACTION) kind = KIND_BULGE;
    else if (kindRoll < BULGE_FRACTION + HALO_FRACTION) kind = KIND_HALO;

    const isHalo = kind === KIND_HALO;
    const isBulge = kind === KIND_BULGE;

    // Beading: the reference's arms are not evenly lit, they are strings of
    // bright knots. Modulating size and brightness along the arm reproduces
    // that without needing more particles.
    const radius = ARM_INNER + Math.pow(u, RADIAL_CONCENTRATION) * (1 - ARM_INNER);
    const along = Math.log(radius / ARM_INNER) * WINDING;
    // Three incommensurate frequencies: a single sine lays the knots out at a
    // fixed pitch, which reads as a dashed line rather than as clustering.
    const knot =
      Math.sin(along * 2.7 + (i % ARMS) * 2.3) * 0.5 +
      Math.sin(along * 1.13 + 1.7) * 0.32 +
      Math.sin(along * 4.61 + 0.4) * 0.18;
    // Knots are suppressed near the core: additive blending stacks the
    // overlapping sprites there into a blown-out white blob, and the reference
    // keeps its centre a smooth glow with the bright clumps out on the arms.
    const isKnot = kind === KIND_ARM && knot > 0.52 && radius > 0.3;

    particles[i] = {
      u,
      v,
      w,
      arm: i % ARMS,
      kind,
      colorIndex,
      // Knots are the large bloom stars; bulge and halo particles stay small,
      // so the core reads as a dense glow rather than as clumps.
      size: isKnot
        ? (1.0 + random() * 1.3) * radius
        : (isHalo ? 0.28 : 0.34) + Math.pow(random(), 3) * (isHalo ? 0.6 : 1.15),
      brightness: isKnot
        ? 0.8 + random() * 0.2
        : isBulge
          ? 0.4 + random() * 0.5
          : (isHalo ? 0.12 : 0.26) + random() * (isHalo ? 0.26 : 0.55),
      driftPhase: random() * TAU,
      driftSpeed: 0.25 + random() * 0.65,
      driftAmount: 0.006 + random() * 0.022,
    };
  }

  return particles;
}

/**
 * Builds the flat Float32Array of every particle's position in every state.
 * Layout is [state][particle][xyz] so the render loop reads two contiguous
 * slabs.
 */
export function buildStates(particles) {
  const count = particles.length;
  const positions = new Float32Array(STATE_COUNT * count * 3);
  const out = [0, 0, 0];

  for (let s = 0; s < STATE_COUNT; s += 1) {
    const shape = STATES[s];
    const base = s * count * 3;

    for (let i = 0; i < count; i += 1) {
      shape(particles[i], out);
      positions[base + i * 3] = out[0];
      positions[base + i * 3 + 1] = out[1];
      positions[base + i * 3 + 2] = out[2];
    }
  }

  return positions;
}

/**
 * The ambient starfield that sits behind the whole page, including after the
 * galaxy has dispersed. These are screen-anchored rather than part of the 3D
 * composition: they carry a `depth` used only for a gentle scroll parallax,
 * which is what keeps the page feeling layered once the galaxy is gone.
 */
export function createStarfield(count, paletteLength) {
  const random = makeRandom(0x85ebca6b);
  const stars = new Array(count);

  for (let i = 0; i < count; i += 1) {
    stars[i] = {
      x: random(),
      y: random(),
      depth: 0.25 + random() * 0.75,
      size: 0.45 + Math.pow(random(), 3) * 1.9,
      brightness: 0.16 + Math.pow(random(), 1.7) * 0.6,
      colorIndex: Math.floor(random() * paletteLength),
      twinklePhase: random() * TAU,
      twinkleSpeed: 0.18 + random() * 0.5,
    };
  }

  return stars;
}

/**
 * The meteor field that streams through the same space once the "Who I Am"
 * section arrives.
 *
 * Modelled directly on the reference clip, whose defining trait is that the
 * trail and the direction of travel do NOT agree: every streak is drawn at a
 * fixed 35 degrees while the field as a whole drifts at roughly 59 degrees. The
 * streaks therefore appear to slide slightly sideways as they fall, which is
 * what separates this from a generic diagonal rain of lines. Both angles are
 * shared by every meteor - in the reference they are constant to within a fifth
 * of a degree - so they live as module constants rather than per-particle.
 *
 * `speed` is the only depth cue, spanning roughly 3x as it does in the
 * reference. It scales travel rate, trail length and brightness together.
 */
export function createMeteors(count, paletteLength) {
  const random = makeRandom(0xc2b2ae35);
  const meteors = new Array(count);

  for (let i = 0; i < count; i += 1) {
    // Squared so the field is weighted towards the slower, more distant
    // layers and only a few streaks tear past close to the camera.
    const speed = 0.55 + Math.pow(random(), 1.7) * 1.2;

    meteors[i] = {
      x: random(),
      y: random(),
      speed,
      // Trail length is near-constant in the reference; the small jitter and
      // the slight stretch with speed stop same-layer streaks reading as
      // copies of one another.
      length: (71 + random() * 22) * (0.82 + speed * 0.22),
      brightness: 0.72 + Math.pow(random(), 1.4) * 0.28,
      colorIndex: Math.floor(random() * paletteLength),
    };
  }

  return meteors;
}

// The two angles that define the look, in radians. TRAIL is the direction the
// streak is drawn; DRIFT is the direction it actually travels.
export const METEOR_TRAIL_ANGLE = (35 * Math.PI) / 180;
export const METEOR_DRIFT_ANGLE = (59 * Math.PI) / 180;
export const METEOR_DRIFT_X = Math.cos(METEOR_DRIFT_ANGLE);
export const METEOR_DRIFT_Y = Math.sin(METEOR_DRIFT_ANGLE);
