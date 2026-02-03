import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {portfolioData.socials.map((social) => {
              const Icon = iconMap[social.icon] || Mail;
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-background p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.platform}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 fill-destructive text-destructive" />
              </motion.span>{" "}
              by{" "}
              <span className="font-medium text-foreground">
                {portfolioData.personal.name}
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 rounded-full border border-border bg-background px-6 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
