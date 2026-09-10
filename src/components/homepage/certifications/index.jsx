import { certifications } from "@/utils/data/certifications";
import { Link } from "react-router-dom";
import SectionHeader from "../../helper/SectionHeader";
import Marquee from "react-fast-marquee";
import { FaFilePdf } from "react-icons/fa";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { motion } from "framer-motion";

function Certifications() {
  return (
    <section
      id="certifications"
      className="section-shell section-viewport relative z-50 overflow-x-hidden"
    >
      <SectionHeader
        title="Verified along the way."
        description="Programmes and credentials I've completed. Open any card to view the full certificate."
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
          speed={70}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {certifications.map((certificate) => (
            <div key={certificate.id} className="px-3 py-2 sm:px-4 lg:px-5">
              <Link
                to={`/certifications/${certificate.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-[24rem] w-[260px] rounded-xl transition-all duration-500 hover:scale-[1.02] sm:h-[27rem] sm:w-[20rem] lg:h-[29rem] lg:w-[26rem]"
                aria-label={`Open ${certificate.title} certificate`}
              >
                <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 glass-panel group-hover:border-violet-500 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <div className="flex -translate-y-[1px] justify-center">
                    <div className="w-3/4">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="relative h-48 shrink-0 overflow-hidden border-b border-white/5 bg-white/5 sm:h-60 lg:h-64">
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} preview`}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <FaFilePdf className="mt-1 h-7 w-7 shrink-0 text-pink-500" />
                      <p className="text-sm font-medium leading-6 text-gray-300 transition-colors duration-300 group-hover:text-white sm:text-base">
                        {certificate.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[#16f2b3]">
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500">
                        View certificate
                      </span>
                      <HiMiniArrowTopRightOnSquare className="h-6 w-6 group-hover:text-orange-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}

export default Certifications;
