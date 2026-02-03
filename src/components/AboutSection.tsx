import { motion, useInView, Easing } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { MapPin, GraduationCap, Target, Heart } from "lucide-react";

const icons: Record<string, React.ElementType> = {
  Location: MapPin,
  Education: GraduationCap,
  Focus: Target,
  Interests: Heart,
};

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as Easing,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-4xl"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <span className="mb-4 inline-block font-mono text-sm text-primary">
              01. About Me
            </span>
            <h2 className="section-heading mb-4">
              Who I <span className="gradient-text">Am</span>
            </h2>
            <p className="section-subheading mx-auto max-w-2xl">
              A passionate developer driven by curiosity and creativity
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Bio text */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 lg:col-span-3"
            >
              <div className="glass-panel p-6 md:p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {portfolioData.about.bio}
                </p>
              </div>

              {/* Strengths */}
              <div className="flex flex-wrap gap-3">
                {portfolioData.about.strengths.map((strength) => (
                  <motion.span
                    key={strength}
                    variants={itemVariants}
                    className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {strength}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 lg:col-span-2"
            >
              {portfolioData.about.facts.map((fact) => {
                const Icon = icons[fact.label] || MapPin;
                return (
                  <motion.div
                    key={fact.label}
                    variants={itemVariants}
                    className="glass-panel group p-4 transition-all duration-300 hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {fact.label}
                        </p>
                        <p className="mt-1 font-medium text-foreground">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
