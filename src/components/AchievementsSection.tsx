import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Trophy, Award, Medal, Star } from "lucide-react";

const icons = [Trophy, Award, Medal, Star];

const AchievementsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="relative py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="absolute left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            05. Achievements
          </span>
          <h2 className="section-heading mb-4">
            Awards & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Recognition and milestones along my journey
          </p>
        </motion.div>

        {/* Achievements grid */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {portfolioData.achievements.map((achievement, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="glass-panel card-hover group relative overflow-hidden p-6"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    className="rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-3 text-primary"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {achievement.title}
                      </h3>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
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

export default AchievementsSection;
