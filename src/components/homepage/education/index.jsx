import { educations } from "@/utils/data/educations";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/AnimationLottie";
import GlowCard from "../../helper/GlowCard";
import TimelineList from "../../helper/TimelineList";
import SectionHeader from "../../helper/SectionHeader";
import lottieFile from '/public/lottie/study.json';
import { motion } from "framer-motion";

function Education() {
  return (
    <section
      id="education"
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
        title="Where I learned it."
        description="A computer-science foundation in artificial intelligence and analytics, backed by coursework in machine learning, deep learning and data engineering."
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
            <AnimationLottie animationPath={lottieFile} />
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
              educations.map(education => (
                <div className="timeline-item" key={education.id}>
                  <span className="timeline-node" aria-hidden="true"></span>
                  <GlowCard identifier={`education-${education.id}`}>
                  <div className="p-3 relative text-white glass-card rounded-xl">
                    <img
                      src="/blur-23.svg"
                      alt=""
                      aria-hidden="true"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-40 mix-blend-screen w-full"
                    />
                    <div className="flex min-h-[140px] items-center gap-x-4 px-3 py-6 sm:gap-x-6 sm:px-5 lg:min-h-[160px] lg:py-8">
                      <div className="flex-shrink-0 text-violet-500 transition-all duration-300 hover:scale-125">
                        {education.logo ? (
                          <img
                            src={education.logo}
                            alt={education.institution}
                            className="h-20 w-20 object-contain rounded sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                          />
                        ) : (
                          <BsPersonWorkspace size={36} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mb-2 text-sm font-medium uppercase leading-tight text-white sm:text-base">
                          {education.title}
                        </p>
                        <p className="text-sm sm:text-base text-pink-500">{education.institution}</p>
                        <p className="mt-1 text-xs sm:text-sm text-[#16f2b3]">
                          {education.duration}
                        </p>
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

export default Education;
