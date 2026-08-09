import { educations } from "@/utils/data/educations";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/AnimationLottie";
import GlowCard from "../../helper/GlowCard";
import TimelineList from "../../helper/TimelineList";
import lottieFile from '/public/lottie/study.json';
import { motion } from "framer-motion";

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 border-white/5 pt-12">
      <img
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-30 mix-blend-screen"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-violet-500/50"></span>
          <span className="bg-[#1a1443] border border-white/10 w-fit text-gray-300 p-2 px-5 text-xl rounded-md shadow-glass tracking-widest uppercase text-sm font-medium">
            Educations
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-violet-500/50"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-start"
          >
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TimelineList>
              {
                educations.map(education => (
                  <div className="timeline-item" key={education.id}>
                    <span className="timeline-node" aria-hidden="true"></span>
                    <GlowCard identifier={`education-${education.id}`}>
                    <div className="p-3 relative text-white glass-card rounded-xl">
                      <img
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-40 mix-blend-screen"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {education.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-4 sm:gap-x-8 px-3 py-5">
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase text-white">
                            {education.title}
                          </p>
                          <p className="text-sm sm:text-base text-gray-300">{education.institution}</p>
                        </div>
                      </div>
                    </div>
                    </GlowCard>
                  </div>
                ))
              }
            </TimelineList>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Education;
