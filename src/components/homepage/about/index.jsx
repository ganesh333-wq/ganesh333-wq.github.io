import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] border border-white/10 w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md shadow-glass">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-transparent via-violet-500 to-transparent opacity-30 mt-8"></span>
      </div>

      <div className="flex justify-center my-5 lg:hidden">
        <div className="flex items-center">
          <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-violet-500/50"></span>
          <span className="bg-[#1a1443] border border-white/10 w-fit text-white p-2 px-5 text-xl rounded-md shadow-glass tracking-widest uppercase text-sm font-medium">
            About Me
          </span>
          <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-violet-500/50"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 glass-card p-8 lg:p-12 rounded-2xl"
        >
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase tracking-widest">
            Who I am
          </p>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed">
            {personalData.description}
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center order-1 lg:order-2"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={personalData.profile}
              width={280}
              height={280}
              alt="Ganesh Pratap Barade"
              className="relative rounded-lg transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-[1.02] cursor-pointer object-cover max-w-full h-auto w-[240px] sm:w-[280px]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutSection;
