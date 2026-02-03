import { motion, useInView, Easing } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Code, Layers, Wrench, Brain } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  layers: Layers,
  tool: Wrench,
  brain: Brain,
};

const SkillsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
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
      id="skills"
      className="relative py-24 md:py-32"
    >
      {/* Background accents */}
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            02. Skills
          </span>
          <h2 className="section-heading mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {portfolioData.skills.categories.map((category, categoryIndex) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <motion.div
                key={category.name}
                variants={cardVariants}
                className="glass-panel card-hover p-6 md:p-8"
              >
                {/* Category header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    {category.name}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-4">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
