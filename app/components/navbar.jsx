"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.history.pushState(null, "", `/#${id}`);
    window.scrollTo({
      top: sectionTop - NAVBAR_OFFSET,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[100] bg-[#0d1224]/75 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <div className="flex items-center justify-between py-5">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className=" text-[#16f2b3] text-3xl font-bold">
                Ganesh Pratap Barade
              </Link>
            </div>

            <ul className="relative mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default" ref={navListRef}>
              {NAV_LINK_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    className="block px-4 py-2 no-underline outline-none hover:no-underline"
                    href={`/#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    ref={(element) => {
                      linkRefs.current[item.id] = element;
                    }}
                  >
                    <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{item.label}</div>
                  </Link>
                </li>
              ))}
              <span
                className="pointer-events-none absolute bottom-0 hidden h-[2px] rounded-full bg-[#16f2b3] transition-all duration-300 ease-out md:block"
                style={{
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                  opacity: underlineStyle.width ? 1 : 0,
                }}
              />
            </ul>
            <Link
              className="ml-4 hidden rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white no-underline outline-none shadow-[0_0_18px_rgba(168,85,247,0.35)] transition-all duration-300 hover:from-pink-400 hover:to-violet-500 hover:text-white hover:no-underline hover:shadow-[0_0_24px_rgba(168,85,247,0.5)] md:block"
              href="/#contact"
              onClick={(event) => handleNavClick(event, "contact")}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </nav>
      <div aria-hidden="true" className="h-20" />
    </>
  );
};

export default Navbar;
