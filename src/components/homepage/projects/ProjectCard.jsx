import { useState } from "react";
import { FaGithub, FaChevronDown, FaChevronUp } from "react-icons/fa";

function ProjectCard({ project }) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const defaultLimit = project.maxVisibleTech || 5;
  const visibleTech = showAllSkills ? project.tools : project.tools.slice(0, defaultLimit);
  const extraCount = project.tools.length - defaultLimit;

  // Map categories to colors
  const categoryColors = {
    "AI Projects": { bg: "#3b82f620", text: "#3b82f6", border: "#3b82f640" },
    "ML / Deep Learning": { bg: "#8b5cf620", text: "#8b5cf6", border: "#8b5cf640" },
    "Data Analytics": { bg: "#f59e0b20", text: "#f59e0b", border: "#f59e0b40" },
    "NLP / Analytics": { bg: "#06b6d420", text: "#06b6d4", border: "#06b6d440" },
  };

  const statusColors = {
    "Production Ready": { bg: "#16f2b315", text: "#16f2b3", border: "#16f2b340" },
    "Completed": { bg: "#3b82f615", text: "#3b82f6", border: "#3b82f640" },
  };

  const catStyle = categoryColors[project.category] || categoryColors["AI Projects"];
  const statStyle = statusColors[project.status] || statusColors["Completed"];

  return (
    <div className="relative rounded-2xl border border-[#2a2e5a] bg-[#101123] overflow-hidden transition-all duration-500 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] group h-full flex flex-col">
      {/* ── Thumbnail Image ── */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101123] via-transparent to-transparent opacity-60" />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-grow p-5 pt-4">
        {/* Tags row */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
            style={{
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: catStyle.text }}
            />
            {project.category}
          </span>

          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
            style={{
              backgroundColor: statStyle.bg,
              color: statStyle.text,
              border: `1px solid ${statStyle.border}`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: statStyle.text }}
            />
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-base font-bold text-white leading-snug line-clamp-2">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mb-4 text-xs leading-relaxed text-gray-400 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mb-5 flex flex-wrap gap-1.5 items-center">
          {visibleTech.map((t, i) => (
            <span
              key={i}
              className="rounded-md border border-[#2a2e5a] bg-[#0d1224]/70 px-2.5 py-1 text-[0.6rem] font-medium text-gray-400 transition-colors duration-300 hover:border-white/15 hover:text-gray-300"
            >
              {t}
            </span>
          ))}
          {extraCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowAllSkills(!showAllSkills);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-[#3b82f6]/40 bg-[#3b82f6]/15 px-2.5 py-1 text-[0.6rem] font-semibold text-[#60a5fa] transition-all duration-300 hover:bg-[#3b82f6]/25 hover:border-[#3b82f6]/70 hover:text-white cursor-pointer active:scale-95"
              aria-label={showAllSkills ? "Show fewer skills" : `Show ${extraCount} more skills`}
            >
              {showAllSkills ? (
                <>
                  <span>Show less</span>
                  <FaChevronUp className="h-2 w-2" />
                </>
              ) : (
                <>
                  <span>+{extraCount} more</span>
                  <FaChevronDown className="h-2 w-2" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Footer: View Case Study + Code */}
        <div className="mt-auto flex items-center justify-between border-t border-[#2a2e5a]/50 pt-4">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[#16f2b3] transition-all duration-300 hover:gap-3 no-underline"
          >
            View Case Study
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a2e5a] bg-[#0d1224]/60 px-3 py-1.5 text-[0.65rem] font-medium text-gray-400 transition-all duration-300 hover:border-white/15 hover:bg-white/5 hover:text-white no-underline"
          >
            <FaGithub className="h-3.5 w-3.5" />
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
