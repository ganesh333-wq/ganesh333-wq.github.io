import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './ProjectCard';
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24 border-t border-white/5 pt-12">
      <div className="sticky top-10 z-[100]">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-20"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] border border-white/10 absolute left-0 w-fit text-gray-300 px-5 py-3 text-xl rounded-md shadow-glass tracking-widest uppercase text-sm font-medium">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-gradient-to-r from-[#1a1443] to-transparent"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className="flex flex-col gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full mx-auto max-w-2xl sticky group"
            >
              <div className="box-border flex items-center justify-center rounded-xl shadow-glass transition-all duration-[0.5s] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
