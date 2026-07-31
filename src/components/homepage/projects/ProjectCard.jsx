import * as React from "react";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";

const formatProjectDescription = (description) =>
  description.replace(/\s*•/g, "\n•").trim();

function ProjectCard({ project }) {
  const hasProjectLink = project.name !== "8+ Admin Panel" && project.demo;

  return (
    <div className="relative rounded-xl border border-white/10 glass-card w-full group-hover:border-pink-500 transition-colors duration-500">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative flex justify-between items-center gap-4 bg-white/5 border-b border-white/5">
        <div className="flex flex-row space-x-1 lg:space-x-2 flex-shrink-0">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
        </div>
        <div className="flex-1 min-w-0">
          {hasProjectLink ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 block text-center text-[#16f2b3] font-medium text-base lg:text-xl hover:text-white transition-colors duration-300 truncate"
            >
              {project.name}
            </a>
          ) : (
            <p className="text-center text-[#16f2b3] font-medium text-base lg:text-xl truncate">
              {project.name}
            </p>
          )}
        </div>
        {hasProjectLink && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} on GitHub`}
            className="relative z-20 shrink-0 p-2"
          >
            <HiMiniArrowTopRightOnSquare className="h-7 w-7 text-gray-400 hover:text-orange-400 transition-colors duration-300" />
          </a>
        )}
      </div>
      <div className="overflow-hidden px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{"{"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2 mt-1">
            <span className=" text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {project.tools.length - 1 !== i && (
                  <span className="text-gray-400">{`', '`}</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-gray-400">{`"],`}</span>
          </div>
          <div className="mt-1">
            <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
            <span className="text-orange-400">{project.role}</span>
            <span className="text-gray-400">,</span>
          </div>
          {project.name !== "8+ Admin Panel" && (
            <div className="ml-4 lg:ml-8 mr-2 mt-1">
              <span className="text-white">Description:</span>
              <span className="block whitespace-pre-line text-cyan-400">
                {formatProjectDescription(project.description)}
              </span>
              <span className="text-gray-400">,</span>
            </div>
          )}
          <div>
            <span className="text-gray-400">{`};`}</span>
          </div>
        </code>
      </div>
    </div>
  );
}

export default ProjectCard;
