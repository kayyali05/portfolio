import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import Portrait from "@/components/Portrait";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Instagram, Mail } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Radial fade overlay */}
        <div className="absolute inset-0 radial-fade" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-4 py-20 md:px-6"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-first flex justify-center lg:order-first lg:justify-start"
          >
            <Portrait
              src={portfolioData.personal.portrait}
              alt={portfolioData.personal.name}
              badges={portfolioData.personal.badges}
              frameStyle="neon"
            />
          </motion.div>

          {/* Text content - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-last space-y-6 text-center lg:order-last lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Hi, I'm{" "}
              <span className="gradient-text text-glow">
                {portfolioData.personal.name}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-display text-xl text-muted-foreground md:text-2xl"
            >
              {portfolioData.personal.title}{" "}
              <span className="text-foreground">/</span>{" "}
              <span className="text-primary">{portfolioData.personal.subtitle}</span>
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="max-w-lg text-lg text-muted-foreground lg:mx-0 mx-auto"
            >
              {portfolioData.personal.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => handleScrollToSection("#projects")}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleScrollToSection("#contact")}
                className="border-primary/50 hover:bg-primary/10"
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center gap-4 pt-4 lg:justify-start"
            >
              {portfolioData.socials.slice(0, 2).map((social) => {
                const Icon = iconMap[social.icon] || Mail;
                return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-card/50 p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.platform}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => handleScrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
