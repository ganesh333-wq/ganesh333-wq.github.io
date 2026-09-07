import AboutSection from "../components/homepage/about";
import Certifications from "../components/homepage/certifications";
import ContactSection from "../components/homepage/contact";
import Education from "../components/homepage/education";
import Experience from "../components/homepage/experience";
import HeroSection from "../components/homepage/hero-section";
import Projects from "../components/homepage/projects";
import Skills from "../components/homepage/skills";
import SectionRail from "../components/helper/SectionRail";
import IntroVideo from "../components/homepage/hero-section/IntroVideo";

function HomePage() {
  return (
    <>
      <SectionRail />
      <HeroSection />
      {/* The hero's own composition follows the reference and has no video, so
          the intro video keeps its autoplay / audio / crossfade behaviour in
          its own band directly beneath it. */}
      <div className="relative z-50 mx-auto w-full max-w-3xl pb-12 lg:pb-24">
        <IntroVideo />
      </div>
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
