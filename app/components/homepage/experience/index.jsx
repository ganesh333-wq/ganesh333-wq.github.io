import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import TimelineList from "../../helper/timeline-list";
import experience from '/public/lottie/code.json';

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <TimelineList>
              {
                experiences.map(experience => (
                  <div className="timeline-item" key={experience.id}>
                    <span className="timeline-node" aria-hidden="true"></span>
                    <GlowCard identifier={`experience-${experience.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex min-h-[140px] items-center gap-x-4 px-3 py-8 sm:gap-x-6 lg:min-h-[160px]">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          {
                            experience.logo ? (
                              <Image
                                src={experience.logo}
                                alt={`${experience.company} logo`}
                                width={180}
                                height={54}
                                className="h-12 w-36 shrink-0 object-contain sm:h-14 sm:w-44"
                              />
                            ) : (
                              <BsPersonWorkspace size={36} />
                            )
                          }
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-2 whitespace-nowrap text-[clamp(0.78rem,1.7vw,1.15rem)] font-medium uppercase leading-tight">
                            {experience.title}
                          </p>
                          <div className="flex items-center gap-x-2 whitespace-nowrap text-[clamp(0.72rem,1.45vw,1rem)]">
                            <p className="text-xs sm:text-sm text-[#16f2b3]">
                              {experience.duration}
                            </p>
                            <span className="text-[#16f2b3]">•</span>
                            <p>{experience.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </GlowCard>
                  </div>
                ))
              }
            </TimelineList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
