import { experiences } from "@/utils/data/experience";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/AnimationLottie";
import GlowCard from "../../helper/GlowCard";
import TimelineList from "../../helper/TimelineList";
import experienceLottie from '/public/lottie/code.json';
import { motion } from "framer-motion";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-white/5">
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
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-violet-500/50"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-start"
          >
            <div className="w-full h-full">
              <AnimationLottie animationPath={experienceLottie} />
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
                experiences.map(experience => (
                  <div className="timeline-item" key={experience.id}>
                    <span className="timeline-node" aria-hidden="true"></span>
                    <GlowCard identifier={`experience-${experience.id}`}>
                    <div className="p-3 relative glass-card rounded-xl">
                      <img
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-40 mix-blend-screen"
                      />
                      <div className="flex min-h-[140px] items-center gap-x-4 px-3 py-8 sm:gap-x-6 lg:min-h-[160px]">
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                          {
                            experience.logo ? (
                              <img
                                src={experience.logo}
                                alt={`${experience.company} logo`}
                                width={180}
                                height={54}
                                className="h-10 w-28 shrink-0 object-contain sm:h-12 sm:w-36 lg:h-14 lg:w-44"
                              />
                            ) : (
                              <BsPersonWorkspace size={36} />
                            )
                          }
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-2 whitespace-nowrap text-[clamp(0.78rem,1.7vw,1.15rem)] font-medium uppercase leading-tight text-white">
                            {experience.title}
                          </p>
                          <div className="flex items-center gap-x-2 whitespace-nowrap text-[clamp(0.72rem,1.45vw,1rem)]">
                            <p className="text-xs sm:text-sm text-[#16f2b3]">
                              {experience.duration}
                            </p>
                            <span className="text-[#16f2b3]">•</span>
                            <p className="text-gray-300">{experience.company}</p>
                          </div>
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

export default Experience;
