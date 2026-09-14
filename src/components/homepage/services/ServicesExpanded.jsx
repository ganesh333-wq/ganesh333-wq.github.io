import { servicesData } from "@/utils/data/services-data";
import GlowCard from "../../helper/GlowCard";
import { motion, AnimatePresence } from "framer-motion";

/**
 * The fully-expanded services panel: 6 detailed service cards in a 3-column
 * grid, a 4-step development lifecycle row, and a gradient CTA banner.
 * Rendered inline (same tab) when the user clicks "Explore All Services".
 */
function ServicesExpanded({ isOpen, onClose }) {
  const { detailedServices, lifecycle, ctaBanner } = servicesData;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(top - 80, 0), behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="services-expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-16 pb-4">
            {/* ─── SECTION 1: Core Offerings ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              {/* Tag pill */}
              <div className="mb-5 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2e5a] bg-[#101123]/60 px-4 py-1.5">
                  <span className="text-base">⚡</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16f2b3]">
                    Core Offerings
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-center text-[clamp(1.5rem,3.6vw,2.5rem)] font-bold leading-[1.15] text-white">
                Services I Provide
              </h3>
              <p className="mx-auto mb-12 max-w-[60ch] text-center text-sm leading-relaxed text-gray-400 lg:text-[0.95rem]">
                High-impact digital services designed to turn ambitious concepts
                into performant, production-ready software.
              </p>

              {/* 6 Service Cards – 3 columns on lg */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {detailedServices.map((svc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  >
                    <GlowCard identifier={`svc-detail-${i}`}>
                      <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                        {/* Icon + Tag row */}
                        <div className="mb-5 flex items-center justify-between">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                            style={{ backgroundColor: `${svc.tagColor}14` }}
                          >
                            {svc.icon}
                          </div>
                          <span
                            className="rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em]"
                            style={{
                              color: svc.tagColor,
                              border: `1px solid ${svc.tagColor}40`,
                              backgroundColor: `${svc.tagColor}10`,
                            }}
                          >
                            {svc.tag}
                          </span>
                        </div>

                        {/* Title + desc */}
                        <h4 className="mb-2 text-base font-bold text-white leading-snug">
                          {svc.title}
                        </h4>
                        <p className="mb-5 text-xs leading-relaxed text-gray-400 flex-grow">
                          {svc.description}
                        </p>

                        {/* Feature list */}
                        <ul className="mb-5 space-y-2">
                          {svc.features.map((f, fi) => (
                            <li
                              key={fi}
                              className="flex items-center gap-2 text-xs text-gray-300"
                            >
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: svc.tagColor }}
                              />
                              <span className="font-medium">{f}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="mb-5 flex flex-wrap gap-1.5">
                          {svc.tech.map((t, ti) => (
                            <span
                              key={ti}
                              className="rounded-md border border-[#2a2e5a] bg-[#0d1224]/60 px-2.5 py-1 text-[0.6rem] font-medium text-gray-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Discuss link */}
                        <button
                          onClick={() => scrollTo("contact")}
                          className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#16f2b3] transition-all duration-300 hover:gap-3 group"
                        >
                          Discuss This Service
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ─── SECTION 2: Development Lifecycle ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              {/* Tag pill */}
              <div className="mb-5 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2e5a] bg-[#101123]/60 px-4 py-1.5">
                  <span className="text-base">▶</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16f2b3]">
                    {lifecycle.tagline}
                  </span>
                </div>
              </div>

              <h3 className="mb-3 text-center text-[clamp(1.5rem,3.6vw,2.5rem)] font-bold leading-[1.15] text-white">
                {lifecycle.title}
              </h3>
              <p className="mx-auto mb-12 max-w-[56ch] text-center text-sm leading-relaxed text-gray-400 lg:text-[0.95rem]">
                {lifecycle.description}
              </p>

              {/* 4 lifecycle steps */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {lifecycle.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                    className="h-full"
                  >
                    <GlowCard identifier={`lifecycle-${i}`}>
                      <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                        {/* Icon + step number */}
                        <div className="mb-4 flex items-center justify-between">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                            style={{ backgroundColor: `${step.color}18` }}
                          >
                            {step.icon}
                          </div>
                          <span
                            className="text-2xl font-bold"
                            style={{ color: `${step.color}60` }}
                          >
                            {step.number}
                          </span>
                        </div>

                        <h4 className="mb-2 text-sm font-bold text-white">
                          {step.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-gray-400">
                          {step.description}
                        </p>

                        {/* Arrow connector (except last) */}
                        {i < lifecycle.steps.length - 1 && (
                          <div className="mt-4 hidden lg:flex justify-end text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ─── SECTION 3: CTA Banner ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8"
            >
              <div className="relative overflow-hidden rounded-2xl p-10 sm:p-14 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 40%, #8b5cf6 70%, #a855f7 100%)",
                }}
              >
                {/* Decorative overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  }}
                />

                <h3 className="relative mb-3 text-[clamp(1.4rem,3.2vw,2.2rem)] font-bold text-white leading-tight">
                  {ctaBanner.title}
                </h3>
                <p className="relative mx-auto mb-8 max-w-[52ch] text-sm leading-relaxed text-white/80 lg:text-[0.95rem]">
                  {ctaBanner.description}
                </p>

                <div className="relative flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#3b82f6] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
                  >
                    {ctaBanner.primaryButton}
                  </button>
                  <button
                    onClick={() => scrollTo("projects")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  >
                    {ctaBanner.secondaryButton}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ─── Collapse button ─── */}
            <div className="flex justify-center pt-4">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full border border-[#2a2e5a] bg-[#101123]/60 px-6 py-3 text-sm font-medium text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Collapse Services
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServicesExpanded;
