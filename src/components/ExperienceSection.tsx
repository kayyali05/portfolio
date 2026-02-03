import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            04. Experience
          </span>
          <h2 className="section-heading mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Professional experience and education that shaped my career
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent md:left-1/2 md:block md:-translate-x-1/2" />

          {portfolioData.experience.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon = item.type === "work" ? Briefcase : GraduationCap;

            return (
              <motion.div
                key={item.title + item.organization}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className={`relative mb-12 md:w-1/2 ${
                  isLeft ? "md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                  className={`absolute top-0 hidden h-4 w-4 rounded-full border-2 border-primary bg-background md:block ${
                    isLeft ? "right-0 translate-x-1/2 md:-right-2" : "left-0 -translate-x-1/2 md:-left-2"
                  }`}
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                </motion.div>

                {/* Card */}
                <div className="glass-panel card-hover overflow-hidden">
                  {/* Top accent */}
                  <div
                    className={`h-1 ${
                      item.type === "work"
                        ? "bg-gradient-to-r from-primary to-accent"
                        : "bg-gradient-to-r from-accent to-neon-green"
                    }`}
                  />

                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start gap-4">
                      <div
                        className={`rounded-lg p-2 ${
                          item.type === "work"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
