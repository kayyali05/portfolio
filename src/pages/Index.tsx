import { Helmet } from "react-helmet-async";
import { portfolioData } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{portfolioData.seo.title}</title>
        <meta name="description" content={portfolioData.seo.description} />
        <meta name="keywords" content={portfolioData.seo.keywords.join(", ")} />
        <meta property="og:title" content={portfolioData.seo.title} />
        <meta property="og:description" content={portfolioData.seo.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={portfolioData.seo.title} />
        <meta name="twitter:description" content={portfolioData.seo.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
