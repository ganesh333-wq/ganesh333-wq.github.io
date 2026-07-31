import AboutSection from "../components/homepage/about";
import Certifications from "../components/homepage/certifications";
import ContactSection from "../components/homepage/contact";
import Education from "../components/homepage/education";
import Experience from "../components/homepage/experience";
import HeroSection from "../components/homepage/hero-section";
import Projects from "../components/homepage/projects";
import Skills from "../components/homepage/skills";

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <ContactSection />
    </>
  );
}

export default HomePage;
