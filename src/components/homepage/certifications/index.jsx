import { useState, useEffect, useCallback } from "react";
import { certifications } from "@/utils/data/certifications";
import SectionHeader from "../../helper/SectionHeader";
import Marquee from "react-fast-marquee";
import { FaFilePdf, FaChevronLeft, FaChevronRight, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

function Certifications() {
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  const openCertificate = (index) => {
    setSelectedCertIndex(index);
  };

  const closeCertificate = useCallback(() => {
    setSelectedCertIndex(null);
  }, []);

  const prevCertificate = useCallback(() => {
    setSelectedCertIndex((prev) =>
      prev === null ? 0 : prev > 0 ? prev - 1 : certifications.length - 1
    );
  }, []);

  const nextCertificate = useCallback(() => {
    setSelectedCertIndex((prev) =>
      prev === null ? 0 : prev < certifications.length - 1 ? prev + 1 : 0
    );
  }, []);

  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCertificate();
      else if (e.key === "ArrowLeft") prevCertificate();
      else if (e.key === "ArrowRight") nextCertificate();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCertIndex, closeCertificate, prevCertificate, nextCertificate]);

  const currentCert =
    selectedCertIndex !== null ? certifications[selectedCertIndex] : null;

  return (
    <section
      id="certifications"
      className="section-shell section-viewport relative z-50 overflow-x-hidden"
    >
      <SectionHeader
        title="Verified along the way."
        description="Programmes and credentials I've completed. Click any card to view the full certificate."
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
          pauseOnClick={false}
          delay={0}
          play={true}
          direction="left"
        >
          {certifications.map((certificate, idx) => (
            <div key={certificate.id} className="px-3 py-2 sm:px-4 lg:px-5">
              <div
                role="button"
                tabIndex={0}
                onClick={() => openCertificate(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCertificate(idx);
                  }
                }}
                className="group relative block h-[24rem] w-[260px] rounded-xl transition-all duration-500 hover:scale-[1.02] sm:h-[27rem] sm:w-[20rem] lg:h-[29rem] lg:w-[26rem] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#16f2b3]"
                aria-label={`View ${certificate.title} certificate`}
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
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
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
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#16f2b3] transition-colors duration-300">
                        View certificate
                      </span>
                      <HiMiniArrowTopRightOnSquare className="h-6 w-6 group-hover:text-orange-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>

      {/* ── Certificate Lightbox Modal ── */}
      <AnimatePresence>
        {currentCert && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCertificate}
              className="absolute inset-0 bg-[#070913]/90 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-white/15 bg-[#101426] shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16f2b3]/10 border border-[#16f2b3]/30 px-3 py-1 text-[0.65rem] font-semibold text-[#16f2b3] uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
                    Verified Certificate
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[260px] sm:max-w-md md:max-w-lg">
                    {currentCert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeCertificate}
                    className="rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    aria-label="Close modal"
                    title="Close (Esc)"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Preview */}
              <div className="relative flex-grow flex items-center justify-center p-4 sm:p-6 bg-[#090b16] overflow-hidden min-h-[300px]">
                <img
                  src={currentCert.image}
                  alt={currentCert.title}
                  className="max-h-[58vh] w-auto max-w-full object-contain rounded-lg border border-white/10 shadow-xl"
                />

                {/* Left / Right arrow navigation on image */}
                <button
                  type="button"
                  onClick={prevCertificate}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#101426]/80 backdrop-blur-sm p-3 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                  aria-label="Previous certificate"
                  title="Previous (Left Arrow)"
                >
                  <FaChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={nextCertificate}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#101426]/80 backdrop-blur-sm p-3 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                  aria-label="Next certificate"
                  title="Next (Right Arrow)"
                >
                  <FaChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0d1020] px-5 py-3 sm:px-6">
                {/* Counter indicator */}
                <span className="text-xs font-medium text-gray-400">
                  Certificate <strong className="text-white">{selectedCertIndex + 1}</strong> of{" "}
                  <strong className="text-white">{certifications.length}</strong>
                </span>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={currentCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white no-underline transition-transform active:scale-95 shadow-md"
                  >
                    <FaFilePdf className="h-3.5 w-3.5 text-pink-400" />
                    <span>View / Download PDF</span>
                    <FaExternalLinkAlt className="h-2.5 w-2.5 opacity-80" />
                  </a>

                  <button
                    type="button"
                    onClick={closeCertificate}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certifications;
