import { useState, useRef } from "react";
import { servicesData } from "@/utils/data/services-data";
import SectionHeader from "../../helper/SectionHeader";
import GlowCard from "../../helper/GlowCard";
import ServicesExpanded from "./ServicesExpanded";
import { motion } from "framer-motion";

function Services() {
  const d = servicesData;
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(top - 80, 0), behavior: "smooth" });
  };

  const handleExplore = () => {
    setIsExpanded(true);
    // Wait for the animation to start, then scroll into view
    setTimeout(() => {
      const el = document.getElementById("services-expanded");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    // Scroll back to the services section top
    setTimeout(() => {
      scrollTo("services");
    }, 100);
  };

  return (
    <section
      id="services"
      className="section-shell section-viewport relative z-50 overflow-x-hidden"
    >
      <img
        src="/section.svg"
        alt=""
        aria-hidden="true"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-30 mix-blend-screen"
      />

      <SectionHeader
        title="What I deliver."
        description={d.description}
      />

      <div className="section-body section-split">
        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 w-full"
        >
          {/* Tagline pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2a2e5a] bg-[#101123]/60 px-4 py-1.5">
            <span className="text-lg">⚡</span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16f2b3]">
              {d.tagline}
            </span>
          </div>

          {/* Headline */}
          <h3 className="mb-4 max-w-[18ch] text-[clamp(1.85rem,4.4vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {d.headline.split("AI & Web").map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="bg-gradient-to-r from-[#16f2b3] to-[#3b82f6] bg-clip-text text-transparent">
                    AI & Web
                  </span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h3>

          {/* Description */}
          <p className="mb-8 max-w-[52ch] text-sm leading-relaxed text-gray-400 lg:text-[0.95rem] lg:leading-[1.85]">
            {d.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-shine inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              {d.cta.primary.label}
              <span>{d.cta.primary.icon}</span>
            </button>

            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-full border border-[#2a2e5a] bg-transparent px-6 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
            >
              {d.cta.secondary.label}
              <span className="text-lg">⬡</span>
            </button>

            <button
              onClick={handleExplore}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                isExpanded
                  ? "border-[#16f2b3]/60 bg-[#16f2b3]/15 text-[#16f2b3] shadow-[0_0_24px_rgba(22,242,179,0.2)]"
                  : "border-[#16f2b3]/30 bg-[#16f2b3]/5 text-[#16f2b3] hover:border-[#16f2b3]/60 hover:bg-[#16f2b3]/10 hover:shadow-[0_0_20px_rgba(22,242,179,0.15)]"
              }`}
            >
              {isExpanded ? "Services Expanded ↑" : `${d.cta.explore.label} ${d.cta.explore.icon}`}
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            {d.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center rounded-xl border border-[#2a2e5a] bg-[#101123]/50 px-5 py-3 min-w-[120px]"
              >
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.14em] text-gray-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right column: Solution Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="services-solution-card order-1 lg:order-2 w-full"
        >
          <GlowCard identifier="services-solutions">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#16f2b3]/20 to-[#3b82f6]/20 text-xl">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">
                      {d.solutionCard.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {d.solutionCard.subtitle}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-[#16f2b3]/30 bg-[#16f2b3]/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#16f2b3]">
                  {d.solutionCard.badge}
                </span>
              </div>

              {/* Service grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {d.solutionCard.services.map((svc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="group rounded-xl border border-[#2a2e5a] bg-[#0d1224]/60 p-4 transition-all duration-300 hover:border-white/10 hover:bg-[#101123]/80"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-base"
                        style={{
                          backgroundColor: `${svc.color}18`,
                        }}
                      >
                        {svc.icon}
                      </span>
                      <h5 className="text-sm font-semibold text-white">
                        {svc.title}
                      </h5>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">
                      {svc.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between rounded-lg border border-[#2a2e5a]/50 bg-[#0d1224]/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#16f2b3] animate-pulse" />
                  <span className="text-xs text-gray-300 italic">
                    {d.solutionCard.footer}
                  </span>
                </div>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-gray-400 transition-colors duration-300 hover:text-[#16f2b3]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* ── Expanded Services Panel (same tab, inline) ── */}
      <div ref={expandedRef}>
        <ServicesExpanded isOpen={isExpanded} onClose={handleCollapse} />
      </div>
    </section>
  );
}

export default Services;
