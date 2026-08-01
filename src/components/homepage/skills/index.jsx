import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-white/5">
      <div className="w-[100px] h-[100px] bg-violet-500 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50 w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-violet-500/50"></span>
          <span className="bg-[#1a1443] border border-white/10 w-fit text-gray-300 p-2 px-5 text-xl rounded-md shadow-glass tracking-widest uppercase text-sm font-medium">
            Skills
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-violet-500/50"></span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full my-12"
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
            <div className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
              key={id}>
              <div className="h-full w-full rounded-lg border border-white/10 glass-panel shadow-none group-hover:border-violet-500 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <div className="h-8 sm:h-10">
                    <img
                      src={skillsImage(skill)}
                      alt={skill}
                      width={40}
                      height={40}
                      className="h-full w-auto rounded-lg group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-500"
                    />
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-500 text-sm sm:text-lg font-medium">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}

export default Skills;
