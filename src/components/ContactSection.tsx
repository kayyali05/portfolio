import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Twitter, Instagram, Mail, Copy, Check, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

const ContactSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;

      await emailjs.sendForm(
        "service_xj4yxvg",
        "template_5z84dcj",
        form,
        "1CAbsdhWcfEfK2Cel"
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-24 md:py-32"
    >
      {/* Background accents */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            06. Contact
          </span>
          <h2 className="section-heading mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-6 md:p-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="border-border bg-secondary/50 focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="border-border bg-secondary/50 focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                  className="border-border bg-secondary/50 focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group w-full gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Email card */}
            <div className="glass-panel p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">
                Email me directly
              </h3>
              <div className="flex items-center gap-3">
                <code className="flex-1 rounded-lg bg-secondary px-4 py-3 text-sm text-foreground">
                  {portfolioData.personal.email}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyEmail}
                  className="shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-neon-green" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-panel p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">
                Find me online
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {portfolioData.socials.map((social) => {
                  const Icon = iconMap[social.icon] || Mail;
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-4 text-muted-foreground transition-all hover:border-primary hover:text-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {social.platform}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="glass-panel p-6">
              <h3 className="mb-2 font-display text-lg font-semibold">
                Based in
              </h3>
              <p className="text-muted-foreground">
                {portfolioData.personal.location}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Open to remote opportunities worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
