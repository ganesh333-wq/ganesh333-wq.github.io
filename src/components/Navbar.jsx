import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

const NAV_LINK_ITEMS = NAV_ITEMS.filter((item) => item.id !== "contact");
const NAVBAR_OFFSET = 80;

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navListRef = useRef(null);
  const linkRefs = useRef({});

  const updateUnderline = useCallback(() => {
    const navList = navListRef.current;
    const activeLink = linkRefs.current[activeSection];

    if (!navList || !activeLink) {
      setUnderlineStyle({ left: 0, width: 0 });
      return;
    }

    const listRect = navList.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setUnderlineStyle({
      left: linkRect.left - listRect.left + 16,
      width: Math.max(linkRect.width - 32, 0),
    });
  }, [activeSection]);

  const getCurrentSection = useCallback(() => {
    const sections = NAV_ITEMS
      .map((item) => {
        const section = document.getElementById(item.id);
        if (!section) return null;

        return {
          id: item.id,
          top: section.getBoundingClientRect().top + window.scrollY,
        };
      })
      .filter(Boolean)
      .sort((first, second) => first.top - second.top);

    if (!sections.length) return "";

    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = window.innerHeight + window.scrollY >= documentHeight - 2;

    if (isAtBottom) {
      return sections[sections.length - 1].id;
    }

    const activationPoint = window.scrollY + NAVBAR_OFFSET + Math.min((window.innerHeight - NAVBAR_OFFSET) * 0.35, 240);
    let currentSection = sections[0].id;

    sections.forEach((section) => {
      if (activationPoint >= section.top) {
        currentSection = section.id;
      }
    });

    return currentSection;
  }, []);

  const updateActiveSection = useCallback(() => {
    const currentSection = getCurrentSection();

    if (currentSection) {
      setActiveSection((previousSection) => previousSection === currentSection ? previousSection : currentSection);
    }
  }, [getCurrentSection]);

  useEffect(() => {
    let animationFrameId = null;

    const requestUpdate = () => {
      if (animationFrameId) return;

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateActiveSection();
      });
    };

    const syncHashSection = () => {
      const hashSectionId = window.location.hash.replace("#", "");
      const hashSection = NAV_ITEMS.find((item) => item.id === hashSectionId);

      if (!hashSection) {
        updateActiveSection();
        return;
      }

      setActiveSection(hashSection.id);

      const section = document.getElementById(hashSection.id);
      if (section) {
        window.setTimeout(() => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: sectionTop - NAVBAR_OFFSET, behavior: "auto" });
        }, 0);
      }
    };

    syncHashSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", syncHashSection);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", syncHashSection);
    };
  }, [updateActiveSection]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);

    return () => {
      window.removeEventListener("resize", updateUnderline);
    };
  }, [updateUnderline]);

  const handleNavClick = (event, id) => {
    const section = document.getElementById(id);

    if (!section) return;

    event.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false); // Close menu on click

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.history.pushState(null, "", `/#${id}`);
    window.scrollTo({
      top: sectionTop - NAVBAR_OFFSET,
      behavior: "smooth",
    });
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-[100] bg-[#0d1224]/70 backdrop-blur-xl border-b border-white/5 transition-colors duration-300"
      >
        <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center min-w-0">
              <a
                href="/"
                className="text-[#16f2b3] text-lg sm:text-2xl md:text-3xl font-bold tracking-tight truncate">
                Ganesh Pratap Barade
              </a>
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-[#16f2b3] focus:outline-none transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>

            <ul 
              className={`absolute top-full left-0 right-0 bg-[#0d1224]/95 backdrop-blur-xl border-b border-white/5 md:border-none md:bg-transparent md:backdrop-blur-none md:relative md:flex md:flex-row md:items-center md:h-auto md:w-auto md:space-x-1 md:opacity-100 transition-all duration-300 ease-in-out origin-top flex-col ${isMobileMenuOpen ? 'flex max-h-screen opacity-100 py-4' : 'hidden md:flex max-h-0 opacity-0 md:max-h-screen'} overflow-hidden md:overflow-visible`} 
              id="navbar-default" 
              ref={navListRef}
            >
              {NAV_LINK_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    className="block px-4 py-2 no-underline outline-none hover:no-underline"
                    href={`/#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    ref={(element) => {
                      linkRefs.current[item.id] = element;
                    }}
                  >
                    <div className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-pink-500">{item.label}</div>
                  </a>
                </li>
              ))}
              <span
                className="pointer-events-none absolute bottom-0 hidden h-[2px] rounded-full bg-pink-500 transition-all duration-300 ease-out md:block shadow-glow-secondary"
                style={{
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                  opacity: underlineStyle.width ? 1 : 0,
                }}
              />
              <li className="md:hidden mt-2 px-4 w-full">
                <a
                  className="block w-full text-center rounded-full bg-[#1a1443] border border-violet-600/30 px-5 py-2 text-sm font-medium text-white no-underline outline-none shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:bg-violet-600 hover:border-transparent"
                  href="/#contact"
                  onClick={(event) => handleNavClick(event, "contact")}
                >
                  CONTACT
                </a>
              </li>
            </ul>
            <a
              className="ml-4 hidden rounded-full bg-[#1a1443] border border-violet-600/30 px-5 py-2 text-sm font-medium text-white no-underline outline-none shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:bg-violet-600 hover:border-transparent hover:text-white md:block"
              href="/#contact"
              onClick={(event) => handleNavClick(event, "contact")}
            >
              CONTACT
            </a>
          </div>
        </div>
      </motion.nav>
      <div aria-hidden="true" className="h-20" />
    </>
  );
}

export default Navbar;
