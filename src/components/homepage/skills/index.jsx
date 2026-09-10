import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import SectionHeader from "../../helper/SectionHeader";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function Skills() {
  return (
    <section
      id="skills"
      className="section-shell section-viewport relative z-50 overflow-x-hidden"
    >
      <div className="pointer-events-none absolute top-6 left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full bg-violet-500 opacity-20 blur-3xl"></div>

      <SectionHeader
        title="The stack I work in."
        description="Languages, frameworks and platforms I use to take AI systems from prototype to production."
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="section-body w-full"
      >
        <Marquee
          gradient={false}
          speed={80}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div className="group relative m-2 flex h-fit w-32 min-w-fit cursor-pointer flex-col items-center justify-center rounded-lg transition-all duration-500 hover:scale-[1.12] sm:m-3 sm:w-36"
              key={id}>
              <div className="h-full w-full rounded-lg border border-white/10 glass-panel shadow-none group-hover:border-violet-500 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 px-4 py-6 sm:px-6">
                  <div className="h-8 sm:h-10">
                    <img
                      src={skillsImage(skill)}
                      alt={skill}
                      width={40}
                      height={40}
                      className="h-full w-auto rounded-lg group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-500"
                    />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-300 transition-colors duration-500 group-hover:text-white sm:text-base">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}

export default Skills;
