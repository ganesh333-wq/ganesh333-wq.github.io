import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { EASE_PREMIUM } from "@/utils/motion";

// The hero is a stage for the particle galaxy drawn by <ParticleField />, a
// fixed full-viewport canvas mounted once in App behind the page. Nothing in
// here draws the galaxy — the layout's only job is to leave it room.
//
// Composition: a tracked role label pinned to the top, a deliberately empty
// middle band where the galaxy's core sits, and the title block anchored low,
// with a scroll cue at the very bottom.

const SOCIAL_LINKS = [
  { href: personalData.github, Icon: BsGithub, label: "GitHub" },
  { href: personalData.linkedIn, Icon: BsLinkedin, label: "LinkedIn" },
  { href: personalData.instagram, Icon: BsInstagram, label: "Instagram" },
];

// One shared parent so the label, title, tagline and actions arrive as a
// single considered movement rather than several independent animations.
const BLOCK = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 4.0 } },
};

const RISE = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_PREMIUM },
  },
};

function HeroSection() {
  return (
    <motion.section
      id="hero"
      variants={BLOCK}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center justify-between text-center section-viewport-height py-8 lg:py-12"
    >


      {/* Empty band: the galaxy core sits at the viewport's vertical centre,
          and keeping this clear is the whole point of the layout. */}
      <div aria-hidden="true" className="flex-1" />

      <div className="w-full">
        <motion.h1
          variants={RISE}
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight text-white"
        >
          {personalData.name}
        </motion.h1>

        <motion.p
          variants={RISE}
          className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-400 uppercase tracking-[0.35em]"
        >
          {personalData.designation}
        </motion.p>

        <motion.div
          variants={RISE}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="hero-action group"
          >
            <span>CONTACT ME</span>
            <RiContactsFill size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action group"
          >
            <span>GET RESUME</span>
            <MdDownload size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </motion.div>

        <motion.div
          variants={RISE}
          className="mt-8 flex items-center justify-center gap-6"
        >
          {SOCIAL_LINKS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-500 transition-all duration-300 hover:text-[#16f2b3] hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(22,242,179,0.5)]"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={RISE}
        /* Hidden on small screens, where the fixed section-rail pill already
           occupies the bottom edge. */
        className="mt-10 hidden sm:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gray-600">
          Scroll
        </span>
        <span className="hero-scroll-line" />
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
