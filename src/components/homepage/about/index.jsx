import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import GlowCard from "../../helper/GlowCard";
import SectionHeader from "../../helper/SectionHeader";

function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell section-shell--flush section-viewport relative z-50 overflow-x-hidden"
    >
      <SectionHeader
        title="A quick introduction."
      />

      <div className="section-body section-split">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 w-full"
        >
          <GlowCard identifier="about-me-card">
            <div className="glass-card w-full rounded-2xl p-6 sm:p-8 lg:p-10">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#16f2b3]">
                Who I am
              </p>
              <p className="max-w-[62ch] text-sm leading-relaxed text-gray-300 lg:text-lg lg:leading-[1.85]">
                {personalData.description}
              </p>
            </div>
          </GlowCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={personalData.profile}
              width={280}
              height={280}
              alt="Ganesh Pratap Barade"
              className="relative rounded-lg transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-[1.02] cursor-pointer object-cover max-w-full h-auto w-[240px] sm:w-[280px] lg:w-[300px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
