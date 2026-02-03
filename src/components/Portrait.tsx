import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface PortraitProps {
  src: string;
  alt?: string;
  badges?: string[];
  frameStyle?: "neon" | "scanner" | "holographic";
}

const Portrait = ({ 
  src, 
  alt = "Portrait", 
  badges = [],
  frameStyle = "neon" 
}: PortraitProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const glowOpacity = useSpring(0.5, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowOpacity.set(0.5);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Orbiting dots */}
      <div className="absolute h-[320px] w-[320px] md:h-[400px] md:w-[400px]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-primary"
            style={{
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <motion.div
              className="absolute h-2 w-2 rounded-full"
              style={{
                background: `hsl(${180 + i * 30} 100% 50%)`,
                boxShadow: `0 0 10px hsl(${180 + i * 30} 100% 50%)`,
                x: 120 + i * 10,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main portrait container */}
      <motion.div
        ref={containerRef}
        className="relative z-10"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glow effect behind */}
          <motion.div
            className="absolute -inset-4 rounded-2xl blur-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(180 100% 50% / 0.4), hsl(270 100% 65% / 0.4))",
              opacity: glowOpacity,
            }}
          />

          {/* Animated gradient border */}
          <div className="relative overflow-hidden rounded-2xl p-[3px]">
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, hsl(180 100% 50%), hsl(270 100% 65%), hsl(330 100% 65%), hsl(180 100% 50%))",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner container with glass effect */}
            <div className="relative overflow-hidden rounded-xl bg-card/90 p-2 backdrop-blur-sm">
              {/* Portrait image */}
              <div className="relative h-64 w-64 overflow-hidden rounded-lg md:h-80 md:w-80">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover object-[center_15%]"
                />

                {/* Scanner line effect */}
                {frameStyle === "scanner" && (
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{
                      top: ["-10%", "110%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Floating badges */}
          {badges.map((badge, index) => (
            <motion.div
              key={badge}
              className="absolute rounded-full border border-primary/30 bg-card/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
              style={{
                top: `${10 + index * 25}%`,
                right: index % 2 === 0 ? "-15%" : "auto",
                left: index % 2 !== 0 ? "-15%" : "auto",
              }}
              animate={{
                y: [0, -5, 0],
                x: [0, index % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portrait;
