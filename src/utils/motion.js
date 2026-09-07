// Shared motion constants for a consistent, premium reveal feel across sections.
export const EASE_PREMIUM = [0.16, 1, 0.3, 1];

// Reveals replay when a section is re-entered (once: false) so the motion is
// visible on every pass, and fire at 25% visibility rather than at the very
// bottom edge — otherwise the animation finishes in peripheral vision before
// the content reaches a comfortable reading position.
export const REVEAL_VIEWPORT = { once: false, amount: 0.25 };

export const REVEAL_DURATION = 1.05;
