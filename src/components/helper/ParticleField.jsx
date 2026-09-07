import { useEffect, useRef } from "react";
import {
  buildStates,
  createParticles,
  createStarfield,
} from "@/utils/particle-shapes";

// Canvas 2D rather than WebGL: a few thousand additive sprites is well within
// what the 2D compositor handles at 60fps, and it avoids pulling a WebGL
// dependency into the bundle for what is ultimately a background layer.
//
// All animation state lives in refs/closures inside the effect. Nothing here
// touches React state, so the field never triggers a re-render.

const PALETTE = [
  { r: 255, g: 255, b: 255, weight: 0.5 }, // white
  { r: 150, g: 190, b: 255, weight: 0.28 }, // soft blue
  { r: 255, g: 168, b: 104, weight: 0.22 }, // warm amber
];

const PALETTE_WEIGHTS = PALETTE.map((color) => color.weight);

// --- Cursor interaction tuning -------------------------------------------
// Radius of influence in CSS pixels. Deliberately local: the brief is that the
// cursor disturbs its neighbourhood, not that it drags the whole composition.
const CURSOR_RADIUS = 165;
// Outward acceleration at the very centre of the cursor, in px/s^2. Together
// with RETURN_SPRING this sets the resting displacement directly under the
// cursor (push/spring, ~24px here). Much above that and the field opens a
// hard-edged bubble around the pointer, which reads as a gimmick rather than
// as the composition reacting to being touched.
const CURSOR_PUSH = 1120;
// Spring constant pulling a displaced particle back to its true position, and
// the damping that stops it oscillating. Together these give the displacement
// inertia on the way out and a smooth, non-springy recovery.
const RETURN_SPRING = 46;
const RETURN_DAMPING = 4.6;
// Ceiling on displacement so a cursor held still never blows a hole in the
// field, and so a fast flick cannot fling particles off-screen.
const MAX_OFFSET = 30;
// How fast the smoothed pointer chases the real one. Lower than instant so the
// influence lags the cursor slightly, which is what makes it read as physical
// contact rather than as an effect pinned to the pointer.
const POINTER_FOLLOW = 14;

// Particle budget by viewport width. Mobile GPUs and low-power modes get a
// materially smaller field so the frame budget is never the bottleneck.
function particleBudget(width) {
  if (width < 640) return 1100;
  if (width < 1024) return 2000;
  if (width < 1600) return 4000;
  return 5400;
}

// On narrow viewports the composition sits directly behind the hero copy
// rather than beside it, so the field is dimmed to keep the type legible. The
// visual is still present and still animates; it just stops competing.
function fieldIntensity(width) {
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1;
}

function starBudget(width) {
  if (width < 640) return 90;
  if (width < 1024) return 150;
  return 260;
}

// A pre-rendered radial sprite per palette colour. Drawing a cached bitmap is
// an order of magnitude cheaper than a per-particle gradient fill.
function makeSprite(color) {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  const rgb = `${color.r}, ${color.g}, ${color.b}`;

  gradient.addColorStop(0, `rgba(${rgb}, 1)`);
  gradient.addColorStop(0.22, `rgba(${rgb}, 0.75)`);
  gradient.addColorStop(0.55, `rgba(${rgb}, 0.18)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return canvas;
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Coarse pointers (touch) get no cursor interaction at all: there is no
    // hover state to drive it, and the pointermove events a tap produces would
    // punch a hole in the field under the user's finger mid-scroll.
    const finePointer = window.matchMedia("(pointer: fine)");
    const sprites = PALETTE.map(makeSprite);

    let particles = [];
    let stars = [];
    let states = new Float32Array(0);
    // Screen-space displacement and velocity from cursor interaction, kept in
    // flat typed arrays so the per-frame integration stays allocation-free.
    let offsets = new Float32Array(0);
    let velocities = new Float32Array(0);

    let count = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Hero progress is smoothed towards its target so the dispersal glides
    // instead of snapping, and so a flick-scroll still reads as continuous.
    let heroSmoothed = 0;
    // Whole-document progress, used only for the starfield parallax.
    let pageProgress = 0;
    // Cached layout metrics. Reading these costs a forced reflow, so they are
    // measured on resize and refreshed on a slow cadence in the render loop
    // rather than on every scroll event.
    let heroHeight = 0;
    let scrollable = 1;
    let metricsAge = 0;

    let pointerX = 0;
    let pointerY = 0;
    let pointerRawX = 0;
    let pointerRawY = 0;
    let pointerActive = false;

    let frameId = null;
    let running = true;
    let lastTime = 0;

    // --- Intro animation state -----------------------------------------------
    // The entrance animation plays once on mount: particles start fully
    // dispersed and coalesce inward into the spiral galaxy, matching the
    // reference video. After the intro completes, scroll takes full control.
    const INTRO_DELAY = 0.8;        // seconds of black before particles appear
    const INTRO_DURATION = 4.5;     // seconds for dispersed → galaxy
    const INTRO_FADE_IN = 1.5;      // seconds for particles to fade from black
    let introStart = -1;            // set on first render frame
    let introProgress = 1.0;        // 1 = dispersed, 0 = galaxy (animates 1→0)
    let introAlpha = 0;             // 0 = invisible, 1 = fully visible
    let introDone = false;          // true once intro has finished

    const build = () => {
      const nextCount = reduceMotion.matches
        ? Math.round(particleBudget(window.innerWidth) * 0.5)
        : particleBudget(window.innerWidth);

      if (nextCount !== count) {
        count = nextCount;
        particles = createParticles(count, PALETTE_WEIGHTS);
        states = buildStates(particles);
        offsets = new Float32Array(count * 2);
        velocities = new Float32Array(count * 2);
      }

      const nextStars = starBudget(window.innerWidth);
      if (stars.length !== nextStars) {
        stars = createStarfield(nextStars, PALETTE.length);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      measureLayout();
      build();
    };

    // The dispersal is driven by the hero's own height, not the whole
    // document: the composition should have cleared the frame by the time the
    // first content section arrives, exactly as in the reference.
    const measureLayout = () => {
      const hero = document.getElementById("hero");
      heroHeight = hero
        ? Math.max(hero.getBoundingClientRect().height, window.innerHeight * 0.5)
        : window.innerHeight;

      scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      metricsAge = 0;
    };

    const handlePointerMove = (event) => {
      // pointerType is absent on some synthetic events; the media query is the
      // authority, this is a second guard for hybrid devices where a touch
      // arrives on a machine that also reports a fine pointer.
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        pointerActive = false;
        return;
      }

      pointerRawX = event.clientX;
      pointerRawY = event.clientY;

      if (!pointerActive) {
        // Entering the window: seat the smoothed pointer at the real position
        // so the field does not get raked by a sweep in from the last spot.
        pointerX = pointerRawX;
        pointerY = pointerRawY;
        pointerActive = true;
      }
    };

    const handlePointerLeave = () => {
      pointerActive = false;
    };

    const render = (time) => {
      frameId = window.requestAnimationFrame(render);
      if (!running) return;

      const seconds = time / 1000;
      // Delta-timed rather than per-frame: a fixed per-frame lerp settles in
      // ~1.2s at 60fps but takes many seconds on a 15fps device, leaving the
      // field permanently mid-transition. Clamped so a backgrounded tab's huge
      // delta doesn't snap everything on return.
      const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.05);
      lastTime = time;

      const still = reduceMotion.matches;

      // --- Intro animation tick ----------------------------------------------
      if (introStart < 0) introStart = seconds;
      const introElapsed = seconds - introStart;

      if (!introDone && !still) {
        // Phase 1: black delay — nothing visible
        if (introElapsed < INTRO_DELAY) {
          introAlpha = 0;
          introProgress = 1.0;
        }
        // Phase 2: particles fade in while coalescing
        else {
          const fadeElapsed = introElapsed - INTRO_DELAY;
          introAlpha = Math.min(fadeElapsed / INTRO_FADE_IN, 1);

          const coalT = Math.min(fadeElapsed / INTRO_DURATION, 1);
          // Ease-out cubic: (1-t)^3 — fast start, gentle settle into the galaxy
          introProgress = Math.pow(1 - coalT, 3);

          if (coalT >= 1) introDone = true;
        }
      } else if (still) {
        // Reduced-motion: skip intro entirely
        introDone = true;
        introAlpha = 1;
        introProgress = 0;
      }

      // Scroll is sampled here rather than in a scroll handler: one read per
      // frame, in the frame, instead of a forced reflow per scroll event.
      // Sections growing or collapsing change the page height, so the cached
      // metrics are refreshed roughly twice a second.
      metricsAge += delta;
      if (metricsAge > 0.5) measureLayout();

      const scrollY = window.scrollY;
      const heroTarget = heroHeight > 0 ? scrollY / heroHeight : 0;
      pageProgress = scrollY / scrollable;

      // Exponential follow: fast enough to track a drag, slow enough that the
      // transition reads as motion rather than as a jump.
      heroSmoothed +=
        (heroTarget - heroSmoothed) * (1 - Math.exp(-delta * 3.6));

      if (pointerActive) {
        const follow = 1 - Math.exp(-delta * POINTER_FOLLOW);
        pointerX += (pointerRawX - pointerX) * follow;
        pointerY += (pointerRawY - pointerY) * follow;
      }

      // During the intro the effective progress is the intro's own value;
      // once complete, scroll takes over. If the user scrolls during the
      // intro the larger value wins so scrolling away still works.
      const scrollRaw = Math.min(Math.max(heroSmoothed, 0), 1);
      const scrollProgress = scrollRaw * scrollRaw * (3 - 2 * scrollRaw);
      const raw = introDone ? scrollRaw : Math.max(introProgress, scrollRaw);
      // Smoothstep so the field eases out of the galaxy and into the dispersal
      // rather than travelling at constant speed and stopping dead.
      const progress = introDone ? scrollProgress : raw * raw * (3 - 2 * raw);

      const baseA = 0;
      const baseB = count * 3;

      // Scroll drives rotation directly; a slow constant spin keeps the field
      // alive while the page is still.
      const spin = progress * Math.PI * 0.9 + (still ? 0 : seconds * 0.038);
      const cos = Math.cos(spin);
      const sin = Math.sin(spin);

      // The composition lies in the XZ plane, so a tilt near 90 degrees shows
      // it face-on. The reference sits almost exactly face-on with only a
      // slight lean, and leans further as it is scrolled away.
      const tilt = 1.46 - progress * 0.42;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      // Sized so the galaxy resolves as a shape inside the viewport instead of
      // washing across it edge to edge.
      const scale = Math.min(width, height) * 0.5;
      const centerX = width * 0.5;
      // Drifts up slightly as it disperses, following the content.
      const centerY = height * (0.5 - progress * 0.08);
      const cameraDistance = 3.4;

      // The whole composition fades out over the back half of the dispersal so
      // it never competes with the content that replaces it. During the intro
      // the introAlpha multiplier fades everything in from black.
      const effectiveIntroAlpha = introDone ? 1 : introAlpha;
      const fieldAlpha =
        (1 - Math.max(progress - 0.45, 0) / 0.55) * fieldIntensity(width) * effectiveIntroAlpha;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      // --- Ambient starfield ------------------------------------------------
      // Always present, including once the galaxy has gone. Parallax offset is
      // driven by page progress, giving the page its background layer.
      const starCount = stars.length;
      for (let i = 0; i < starCount; i += 1) {
        const star = stars[i];

        const parallax = pageProgress * height * 0.35 * star.depth;
        // Wrap rather than clamp so stars keep filling the frame all the way
        // down the page instead of sliding off the top.
        let y = (star.y * height - parallax) % height;
        if (y < 0) y += height;
        const x = star.x * width;

        const twinkle = still
          ? 1
          : 0.72 + Math.sin(seconds * star.twinkleSpeed + star.twinklePhase) * 0.28;

        const size = star.size * 4.2;
        context.globalAlpha = Math.min(star.brightness * twinkle, 1) * effectiveIntroAlpha;
        context.drawImage(
          sprites[star.colorIndex],
          x - size * 0.5,
          y - size * 0.5,
          size,
          size
        );
      }

      // --- Core glow --------------------------------------------------------
      if (fieldAlpha > 0.02) {
        const glowRadius = Math.min(width, height) * (0.34 + progress * 0.3);
        const glowAlpha = 0.6 * fieldAlpha * (1 - progress * 0.5);

        if (glowAlpha > 0.01) {
          context.globalCompositeOperation = "source-over";
          const glow = context.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            glowRadius
          );
          glow.addColorStop(0, `rgba(226, 236, 255, ${glowAlpha * 0.5})`);
          glow.addColorStop(0.35, `rgba(150, 175, 255, ${glowAlpha * 0.14})`);
          glow.addColorStop(1, "rgba(120, 150, 255, 0)");
          context.fillStyle = glow;
          context.fillRect(0, 0, width, height);
          context.globalCompositeOperation = "lighter";
        }
      }

      // --- Galaxy -----------------------------------------------------------
      // Once fully dispersed and faded there is nothing to draw, so the whole
      // per-particle loop is skipped for the rest of the page.
      if (fieldAlpha > 0.01) {
        const cursorLive = pointerActive && !still;
        const radiusSquared = CURSOR_RADIUS * CURSOR_RADIUS;
        const damping = Math.exp(-RETURN_DAMPING * delta);

        for (let i = 0; i < count; i += 1) {
          const particle = particles[i];
          const offset = i * 3;

          const ax = states[baseA + offset];
          const ay = states[baseA + offset + 1];
          const az = states[baseA + offset + 2];

          let x = ax + (states[baseB + offset] - ax) * progress;
          let y = ay + (states[baseB + offset + 1] - ay) * progress;
          const z = az + (states[baseB + offset + 2] - az) * progress;

          // Per-particle drift keeps the field flowing even at rest.
          if (!still) {
            const drift = Math.sin(
              seconds * particle.driftSpeed + particle.driftPhase
            );
            x += drift * particle.driftAmount;
            y += drift * particle.driftAmount * 0.7;
          }

          // Spin about Y, then tilt about X.
          const rx = x * cos - z * sin;
          const rz = x * sin + z * cos;
          const ry = y * cosTilt - rz * sinTilt;
          const depth = y * sinTilt + rz * cosTilt;

          const perspective = cameraDistance / (cameraDistance + depth);
          if (perspective <= 0) continue;

          let screenX = centerX + rx * scale * perspective;
          let screenY = centerY + ry * scale * perspective;

          // --- Cursor interaction ------------------------------------------
          // Integrated in screen space: a displaced particle carries velocity,
          // is pulled back by a spring and settles under damping, so it has
          // inertia going out and recovers smoothly once the cursor leaves.
          const slot = i * 2;
          let ox = offsets[slot];
          let oy = offsets[slot + 1];
          let vx = velocities[slot];
          let vy = velocities[slot + 1];

          if (cursorLive || ox !== 0 || oy !== 0 || vx !== 0 || vy !== 0) {
            if (cursorLive) {
              const dx = screenX + ox - pointerX;
              const dy = screenY + oy - pointerY;
              const distanceSquared = dx * dx + dy * dy;

              if (distanceSquared < radiusSquared && distanceSquared > 0.5) {
                const distance = Math.sqrt(distanceSquared);
                // Quadratic falloff: firm right under the cursor, nothing at
                // the rim, so the disturbance has no visible hard edge.
                const falloff = 1 - distance / CURSOR_RADIUS;
                const accel = falloff * falloff * CURSOR_PUSH * delta;
                vx += (dx / distance) * accel;
                vy += (dy / distance) * accel;
              }
            }

            // Spring home, then damp.
            vx -= ox * RETURN_SPRING * delta;
            vy -= oy * RETURN_SPRING * delta;
            vx *= damping;
            vy *= damping;

            ox += vx * delta;
            oy += vy * delta;

            // Clamp displacement, shedding the velocity that overshot so the
            // particle does not press against the cap.
            const offsetLength = Math.hypot(ox, oy);
            if (offsetLength > MAX_OFFSET) {
              const clamp = MAX_OFFSET / offsetLength;
              ox *= clamp;
              oy *= clamp;
              vx *= clamp;
              vy *= clamp;
            }

            // Snap to rest below a threshold so idle particles fall out of the
            // integration entirely rather than jittering forever.
            if (Math.abs(ox) < 0.01 && Math.abs(oy) < 0.01 &&
                Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) {
              ox = 0; oy = 0; vx = 0; vy = 0;
            }

            offsets[slot] = ox;
            offsets[slot + 1] = oy;
            velocities[slot] = vx;
            velocities[slot + 1] = vy;

            screenX += ox;
            screenY += oy;
          }

          // Cheap cull: sprites well outside the viewport cost nothing. This is
          // what keeps the dispersed state, where most particles have flown far
          // off-screen, as cheap as it is.
          if (
            screenX < -40 ||
            screenX > width + 40 ||
            screenY < -40 ||
            screenY > height + 40
          ) {
            continue;
          }

          // Nearer particles are larger and brighter - the depth cue that makes
          // the field feel volumetric rather than flat.
          const spriteSize = particle.size * perspective * 4.6;
          let alpha =
            particle.brightness * perspective * perspective * 1.15 * fieldAlpha;

          // Local brightness lift near the cursor, so the disturbance reads as
          // the field responding to contact rather than only as displacement.
          if (cursorLive) {
            const gx = screenX - pointerX;
            const gy = screenY - pointerY;
            const glowDistanceSquared = gx * gx + gy * gy;
            if (glowDistanceSquared < radiusSquared) {
              alpha *= 1 + (1 - Math.sqrt(glowDistanceSquared) / CURSOR_RADIUS) * 0.3;
            }
          }

          context.globalAlpha = Math.min(alpha, 1);
          context.drawImage(
            sprites[particle.colorIndex],
            screenX - spriteSize * 0.5,
            screenY - spriteSize * 0.5,
            spriteSize,
            spriteSize
          );
        }
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const handleVisibility = () => {
      running = !document.hidden;
      // Reset the clock so the frame after a tab regains focus does not see a
      // multi-second delta.
      if (running) lastTime = 0;
    };

    const handleMotionChange = () => {
      build();
    };

    const handlePointerCapability = () => {
      if (!finePointer.matches) pointerActive = false;
    };

    resize();
    // Seat the smoothed progress at the real scroll position so a reload
    // partway down the page does not animate the dispersal from scratch.
    heroSmoothed = heroHeight > 0 ? window.scrollY / heroHeight : 0;

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    reduceMotion.addEventListener("change", handleMotionChange);
    finePointer.addEventListener("change", handlePointerCapability);

    if (finePointer.matches) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("blur", handlePointerLeave);
    }

    frameId = window.requestAnimationFrame(render);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reduceMotion.removeEventListener("change", handleMotionChange);
      finePointer.removeEventListener("change", handlePointerCapability);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="particle-field" />;
}

export default ParticleField;
