import { certifications } from "@/utils/data/certifications";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { FaFilePdf } from "react-icons/fa";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { motion } from "framer-motion";

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-white/5 pt-12">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-violet-500/50"></span>
          <span className="bg-[#1a1443] border border-white/10 w-fit text-gray-300 p-2 px-5 text-xl rounded-md shadow-glass tracking-widest uppercase text-sm font-medium">
            Certifications
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
          speed={70}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {certifications.map((certificate) => (
            <div key={certificate.id} className="px-6 py-2 sm:px-10">
              <Link
                to={`/certifications/${certificate.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-[25rem] w-80 rounded-xl group relative hover:scale-[1.03] transition-all duration-500 sm:h-[30rem] sm:w-[32rem]"
                aria-label={`Open ${certificate.title} certificate`}
              >
                <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 glass-panel group-hover:border-violet-500 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <div className="flex -translate-y-[1px] justify-center">
                    <div className="w-3/4">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="relative h-52 shrink-0 overflow-hidden border-b border-white/5 bg-white/5 sm:h-72">
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} preview`}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                    <div className="flex items-start gap-4">
                      <FaFilePdf className="mt-1 h-8 w-8 shrink-0 text-pink-500" />
                      <p className="text-sm sm:text-base font-medium leading-6 text-gray-300 group-hover:text-white transition-colors duration-300">
                        {certificate.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-end text-[#16f2b3]">
                      <HiMiniArrowTopRightOnSquare className="h-6 w-6 group-hover:text-orange-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}

export default Certifications;
