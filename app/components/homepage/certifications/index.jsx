import { certifications } from "@/utils/data/certifications";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FaFilePdf } from "react-icons/fa";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certifications
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="w-full my-12">
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
              <a
                href={`/certifications/${certificate.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-[25rem] w-80 rounded-lg group relative hover:scale-105 transition-all duration-500 sm:h-[30rem] sm:w-[32rem]"
                aria-label={`Open ${certificate.title} certificate`}
              >
                <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-[#1f223c] bg-[#11152c] group-hover:border-violet-500 transition-all duration-500">
                  <div className="flex -translate-y-[1px] justify-center">
                    <div className="w-3/4">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                    </div>
                  </div>
                  <div className="relative h-52 shrink-0 overflow-hidden border-b border-[#1f223c] bg-white sm:h-72">
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} preview`}
                      fill
                      sizes="(max-width: 640px) 320px, 512px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                    <div className="flex items-start gap-4">
                      <FaFilePdf className="mt-1 h-8 w-8 shrink-0 text-pink-500" />
                      <p className="text-sm sm:text-base font-medium leading-6 text-white">
                        {certificate.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-end text-[#16f2b3]">
                      <HiMiniArrowTopRightOnSquare className="h-6 w-6 group-hover:text-orange-400" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Certifications;
