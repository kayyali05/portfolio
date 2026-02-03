import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: (typeof portfolioData.projects)[0];
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/30"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute right-4 top-4 z-10">
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Title */}
          {project.slug ? (
            <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2">
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <ArrowUpRight className="mb-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ) : (
            <h3 className="mb-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          )}

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.slug && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Link to={`/projects/${project.slug}`} aria-label={`View ${project.title} details`}>
                  <ArrowUpRight className="h-4 w-4" />
                  Details
                </Link>
              </Button>
            )}
            {project.github && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-24 md:py-32"
    >
      {/* Background accents */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            03. Projects
          </span>
          <h2 className="section-heading mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Some of my recent projects that showcase my skills and passion
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
