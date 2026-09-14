import { useState } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './ProjectCard';
import SectionHeader from '../../helper/SectionHeader';
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id='projects' className="section-shell section-viewport relative z-50">
      <div className="pointer-events-none absolute -top-3 left-0 h-[80px] w-[80px] translate-x-1/2 rounded-full bg-violet-100 opacity-20 blur-3xl"></div>

      <SectionHeader
        title="Selected work."
        description="End-to-end builds — LLM-powered products, machine-learning models and analytics dashboards — shipped from first prototype to working release."
      />

      <div className="section-body">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {projectsData.slice(0, showAll ? projectsData.length : 3).map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                key={project.id}
                className="group h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {projectsData.length > 3 && (
          <div className="mt-10 flex justify-center w-full">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1224]/80 px-6 py-2.5 text-sm font-semibold text-[#16f2b3] transition-all duration-300 hover:border-[#16f2b3]/30 hover:bg-[#16f2b3]/10 hover:shadow-[0_0_20px_rgba(22,242,179,0.15)] cursor-pointer active:scale-95"
            >
              {showAll ? (
                <>
                  Show Less Projects <FaChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  Explore All Projects <FaChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
