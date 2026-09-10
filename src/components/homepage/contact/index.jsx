import { personalData } from '@/utils/data/personal-data';
import { BiLogoLinkedin } from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import ContactForm from './ContactForm';
import { motion } from "framer-motion";

// Palette is limited to colours already used elsewhere in the portfolio:
// #16f2b3 (accent), #0d1224 (panel ink), #8b98a5 / gray-300-400 (muted text).
const CONTACT_DETAILS = [
  { Icon: FiMail, value: personalData.email, href: `mailto:${personalData.email}` },
  { Icon: FiPhone, value: personalData.phone, href: `tel:${personalData.phone}` },
  { Icon: FiMapPin, value: personalData.address, href: null },
];

const SOCIAL_LINKS = [
  { Icon: IoLogoGithub, href: personalData.github, label: "GitHub" },
  { Icon: BiLogoLinkedin, href: personalData.linkedIn, label: "LinkedIn" },
  { Icon: AiOutlineInstagram, href: personalData.instagram, label: "Instagram" },
];

function ContactSection() {
  return (
    <section
      id="contact"
      className="section-shell section-viewport relative z-50 text-white overflow-x-hidden"
    >
      <div className="section-body grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Left: the message — eyebrow, headline, supporting copy, details. */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-header__rule" aria-hidden="true" />

          <p className="text-lg font-bold uppercase tracking-[0.06em] text-[#8b98a5] sm:text-xl">
            Contact with me
          </p>

          <h3 className="mt-5 max-w-[14ch] text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-white">
            Let&rsquo;s start a conversation.
          </h3>

          <p className="mt-8 max-w-[46ch] text-base leading-[2] text-gray-400 sm:text-lg">
            {
              "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."
            }
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {CONTACT_DETAILS.map(({ Icon, value, href }) => {
              const row = (
                <>
                  <Icon
                    size={22}
                    className="shrink-0 text-[#16f2b3] transition-colors duration-300"
                  />
                  <span className="text-base text-gray-300 transition-colors duration-300 group-hover:text-white sm:text-lg">
                    {value}
                  </span>
                </>
              );

              return href ? (
                <a
                  key={value}
                  href={href}
                  className="group flex items-center gap-4"
                >
                  {row}
                </a>
              ) : (
                <p key={value} className="group flex items-center gap-4">
                  {row}
                </p>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-5">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                target="_blank"
                rel="noopener noreferrer"
                href={href}
                aria-label={label}
              >
                <Icon
                  className="cursor-pointer rounded-full border border-white/10 bg-[#8b98a5]/10 p-3 text-[#8b98a5] transition-all duration-300 hover:border-[#16f2b3] hover:text-[#16f2b3] hover:shadow-[0_0_20px_rgba(22,242,179,0.3)]"
                  size={44}
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: the form. */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
