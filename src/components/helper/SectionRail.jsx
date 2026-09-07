import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_PREMIUM } from "@/utils/motion";

// Mirrors the Navbar's section list and its 80px offset so both indicators
// agree on where a section starts. The Navbar keeps its own logic untouched.
const RAIL_ITEMS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "Who I Am" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const NAVBAR_OFFSET = 80;

function SectionRail() {
  const [activeId, setActiveId] = useState("hero");
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

    const activationPoint =
      window.scrollY +
      NAVBAR_OFFSET +
      Math.min((window.innerHeight - NAVBAR_OFFSET) * 0.35, 240);

    let current = RAIL_ITEMS[0].id;

    RAIL_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;

      const top = section.getBoundingClientRect().top + window.scrollY;
      if (activationPoint >= top) current = item.id;
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = RAIL_ITEMS[RAIL_ITEMS.length - 1].id;
    }

    setActiveId(current);
  }, []);

  useEffect(() => {
    let frame = null;

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        sync();
      });
    };

    sync();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [sync]);

  const goTo = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(top - NAVBAR_OFFSET, 0), behavior: "smooth" });
  };

  const activeIndex = Math.max(
    RAIL_ITEMS.findIndex((item) => item.id === activeId),
    0
  );

  return (
    <>
      {/* Desktop: vertical rail on the left edge. */}
      <motion.nav
        aria-label="Section navigation"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE_PREMIUM }}
        className="section-rail"
      >
        <div className="section-rail__track" aria-hidden="true">
          <span
            className="section-rail__progress"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>

        <ul className="section-rail__list">
          {RAIL_ITEMS.map((item, index) => {
            const isActive = item.id === activeId;
            const isPassed = index < activeIndex;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`section-rail__item ${isActive ? "is-active" : ""} ${
                    isPassed ? "is-passed" : ""
                  }`}
                >
                  <span className="section-rail__dot" />
                  <span className="section-rail__label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Mobile / tablet: compact horizontal indicator pinned to the bottom. */}
      <nav aria-label="Section progress" className="section-rail-mobile">
        <span className="section-rail-mobile__label">
          {RAIL_ITEMS[activeIndex].label}
        </span>
        <span className="section-rail-mobile__dots" aria-hidden="true">
          {RAIL_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              tabIndex={-1}
              aria-label={item.label}
              onClick={() => goTo(item.id)}
              className={`section-rail-mobile__dot ${
                index === activeIndex ? "is-active" : ""
              }`}
            />
          ))}
        </span>
      </nav>
    </>
  );
}

export default SectionRail;
