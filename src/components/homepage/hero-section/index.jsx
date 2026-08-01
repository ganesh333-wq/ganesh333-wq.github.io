import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative flex flex-col items-center justify-between py-4 lg:py-12"
    >
      <div className="absolute inset-0 bg-dot-pattern -z-10 opacity-30"></div>
      <img
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-30 mix-blend-screen"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 w-full">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            My name is{" "}
            <span className="text-pink-500">{personalData.name}</span>
            {". "}
            <br />
            {"I specialize in "}
            <span className="text-[#16f2b3]">
              Data Analytics, Generative AI, and Full-Stack Software Development
            </span>.
          </h1>

          <div className="my-12 flex items-center gap-5">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
            >
              <BsGithub size={30} />
            </a>
            <a
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
            >
              <BsLinkedin size={30} />
            </a>
            <a
              href={personalData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
            >
              <BsInstagram size={30} />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="bg-gradient-to-r from-pink-500 to-violet-600 p-[1px] rounded-full transition-all duration-300 hover:shadow-glow-secondary group"
            >
              <button className="px-4 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-300 ease-out md:font-semibold flex items-center gap-2 group-hover:bg-transparent">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </a>

            <a
              className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 md:px-8 py-[13px] md:py-[17px] text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold hover:shadow-glow-secondary"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </a>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="order-1 lg:order-2 from-[#0d1224] border-white/10 relative rounded-xl border bg-gradient-to-r to-[#0a0d37] shadow-glass"
        >
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600 opacity-50"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent opacity-50"></div>
          </div>
          <div className="px-4 lg:px-8 py-4 bg-white/5 border-b border-white/5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-200/80"></div>
            </div>
          </div>
          <div className="overflow-hidden px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{"{"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Ganesh Pratap Barade</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2 mt-1">
                <span className=" text-white">skills:</span>
                <span className="text-gray-400">{`[`}</span><br />
                <span><span className="text-pink-500">&apos;Programming:</span><span className="text-amber-300"> Python (OOP), SQL (Joins, Window Functions), HTML, CSS&apos;</span>,</span><br />
                <span><span className="text-pink-500">&apos;Tools:</span><span className="text-amber-300"> Excel, Power BI (DAX, Power Query), MySQL, Git, GitHub Copilot, Claude&apos;</span>,</span><br />
                <span><span className="text-pink-500">&apos;Concepts:</span><span className="text-amber-300"> Data Cleaning, EDA, Data Visualization, KPI Analysis, Data Modeling, Machine Learning, Deep Learning, Object-Oriented Programming (OOP), Software Development Life Cycle (SDLC), Generative AI&apos;</span></span><br />
                <span className="text-gray-400">{`]`}</span>
              </div>
              <div className="mt-1">
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  hardWorker:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  quickLearner:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  problemSolver:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="mt-1">
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">
                  hireable:
                </span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{"() {"}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">
                  return
                </span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span>
              </div>
              <div>
                <span className="text-gray-400">{`};`}</span>
              </div>
            </code>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
