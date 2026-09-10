import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './ProjectCard';
import SectionHeader from '../../helper/SectionHeader';
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section id='projects' className="section-shell section-viewport relative z-50">
      <div className="pointer-events-none absolute -top-3 left-0 h-[80px] w-[80px] translate-x-1/2 rounded-full bg-violet-100 opacity-20 blur-3xl"></div>

      <SectionHeader
        title="Selected work."
        description="End-to-end builds — LLM-powered products, machine-learning models and analytics dashboards — shipped from first prototype to working release."
      />

      <div className="section-body">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 lg:max-w-4xl">
          {projectsData.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full sticky group"
            >
              <div className="box-border flex items-center justify-center rounded-xl shadow-glass transition-all duration-[0.5s] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
