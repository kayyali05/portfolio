import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectDetails = () => {
  const { slug } = useParams();

  const project = useMemo(
    () => portfolioData.projects.find((item) => item.slug === slug),
    [slug]
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  if (!project) {
    return (
      <main className="container mx-auto px-4 py-24 md:px-6">
        <div className="glass-panel mx-auto max-w-2xl p-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-foreground">
            Project not found
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            The project you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  const images = project.images?.length ? project.images : ["/placeholder.svg"];

  return (
    <main className="relative py-20 md:py-28">
      <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-10">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-5">
            <span className="mb-3 inline-block font-mono text-xs text-primary">
              Project
            </span>
            <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              {project.title}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>

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

            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </section>

          <section className="lg:col-span-7">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "center",
                loop: true,
                skipSnaps: false,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              className="relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {images.map((src, index) => (
                  <CarouselItem
                    key={`${src}-${index}`}
                    className="pl-2 md:pl-4"
                  >
                    <div
                      className={`overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                        index === selectedIndex
                          ? "scale-100 opacity-100"
                          : "scale-[0.97] opacity-70"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${project.title} screen ${index + 1}`}
                        className="h-[420px] w-full object-contain sm:h-[480px] lg:h-[520px]"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:left-0" />
              <CarouselNext className="right-0 md:right-0" />
            </Carousel>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
