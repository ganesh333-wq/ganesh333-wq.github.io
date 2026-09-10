import { experiences } from "@/utils/data/experience";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/AnimationLottie";
import GlowCard from "../../helper/GlowCard";
import TimelineList from "../../helper/TimelineList";
import SectionHeader from "../../helper/SectionHeader";
import experienceLottie from '/public/lottie/code.json';
import { motion } from "framer-motion";

function Experience() {
  return (
    <section
      id="experience"
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
        title="Where I build."
        description="Roles where I've shipped generative-AI systems — from RAG pipelines and agents to production-ready applications."
      />

      <div className="section-body section-split section-split--media-first">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="section-media lg:mx-0">
            <AnimationLottie animationPath={experienceLottie} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full min-w-0"
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
                      alt=""
                      aria-hidden="true"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-40 mix-blend-screen w-full"
                    />
                    <div className="flex min-h-[140px] items-center gap-x-4 px-3 py-6 sm:gap-x-6 sm:px-5 lg:min-h-[160px] lg:py-8">
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
                        <p className="mb-2 text-[clamp(0.78rem,1.7vw,1.15rem)] font-medium uppercase leading-tight text-white">
                          {experience.title}
                        </p>
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {experience.duration}
                        </p>
                        <p className="mt-1 text-lg sm:text-xl text-gray-300">{experience.company}</p>
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
    </section>
  );
}

export default Experience;
