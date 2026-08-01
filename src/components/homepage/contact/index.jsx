import { personalData } from '@/utils/data/personal-data';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import ContactForm from './ContactForm';
import { motion } from "framer-motion";

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] border border-white/10 w-fit text-gray-300 rotate-90 p-2 px-5 text-xl rounded-md shadow-glass">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-transparent via-violet-500 to-transparent opacity-30 mt-8"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ContactForm />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-3/4 "
        >
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                className="bg-[#8b98a5]/10 p-2 rounded-full border border-white/10 hover:border-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)] transition-all duration-300 text-[#8b98a5] hover:text-[#16f2b3] cursor-pointer"
                size={36}
              />
              <span className="text-gray-300">{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <IoMdCall
                className="bg-[#8b98a5]/10 p-2 rounded-full border border-white/10 hover:border-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)] transition-all duration-300 text-[#8b98a5] hover:text-[#16f2b3] cursor-pointer"
                size={36}
              />
              <span className="text-gray-300">
                {personalData.phone}
              </span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <CiLocationOn
                className="bg-[#8b98a5]/10 p-2 rounded-full border border-white/10 hover:border-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)] transition-all duration-300 text-[#8b98a5] hover:text-[#16f2b3] cursor-pointer"
                size={36}
              />
              <span className="text-gray-300">
                {personalData.address}
              </span>
            </p>
          </div>
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <a target="_blank" rel="noopener noreferrer" href={personalData.github}>
              <IoLogoGithub
                className="bg-[#8b98a5]/10 p-3 rounded-full border border-white/10 hover:border-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)] transition-all duration-300 text-[#8b98a5] hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="bg-[#8b98a5]/10 p-3 rounded-full border border-white/10 hover:border-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)] transition-all duration-300 text-[#8b98a5] hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.instagram}>
              <AiOutlineInstagram
                className="bg-[#8b98a5]/10 p-3 rounded-full border border-white/10 hover:border-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)] transition-all duration-300 text-[#8b98a5] hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactSection;
