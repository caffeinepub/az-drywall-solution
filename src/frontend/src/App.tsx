import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { visible, scrollY };
}

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Exterior Sheeting", href: "#exterior-sheeting" },
  { label: "Why Us", href: "#why-us" },
  { label: "Before & After", href: "#before-after" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const { visible, scrollY } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = scrollY > 60;

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-dark"
            : "bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              data-ocid="nav.link"
              className="flex items-center gap-2 group"
            >
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-lg md:text-xl text-primary tracking-tight">
                  AZ DRYWALL
                </span>
                <span className="font-display font-medium text-xs md:text-sm text-primary tracking-widest uppercase">
                  SOLUTION
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-display font-medium text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                data-ocid="nav.primary_button"
                onClick={() => handleNavClick("#contact")}
                className="bg-primary text-primary-foreground hover:bg-accent font-display font-bold tracking-wide shadow-blue"
              >
                Get a Quote
              </Button>
            </nav>

            {/* Hamburger */}
            <button
              type="button"
              data-ocid="nav.toggle"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="block w-6 h-[2px] bg-foreground group-hover:bg-primary transition-colors" />
              <span className="block w-6 h-[2px] bg-foreground group-hover:bg-primary transition-colors" />
              <span className="block w-6 h-[2px] bg-foreground group-hover:bg-primary transition-colors" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              data-ocid="nav.panel"
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 bg-card border-l border-border shadow-dark flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex flex-col leading-none">
                  <span className="font-display font-black text-lg text-primary">
                    AZ DRYWALL
                  </span>
                  <span className="font-display font-medium text-xs text-primary tracking-widest uppercase">
                    SOLUTION
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="nav.close_button"
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        data-ocid="nav.link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className="block font-display font-semibold text-lg text-foreground hover:text-primary py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-border">
                <Button
                  data-ocid="nav.primary_button"
                  onClick={() => handleNavClick("#contact")}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent font-display font-bold shadow-blue"
                >
                  Get a Free Quote
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const handleScroll = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-drywall-installation.dim_1600x900.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/50" />
      {/* Blue accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

      {/* Decorative vertical line */}
      <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-60" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-sm text-primary tracking-wide">
              Licensed & Insured · Arizona's #1 Drywall Specialists
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <span className="block">AZ DRYWALL</span>
            <span className="block text-gradient-blue">SOLUTION</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-xl md:text-2xl text-white/80 mb-4 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Drywall Installation Done Professionally
          </motion.p>

          <motion.p
            className="font-body text-base md:text-lg text-white/60 mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
          >
            Commercial & Residential · No Job Too Big or Too Small · Best
            Customer Experience in Arizona
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary text-primary-foreground hover:bg-accent font-display font-bold text-base px-8 py-6 shadow-blue-lg transition-all duration-300"
            >
              Get a Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              onClick={() =>
                document
                  .querySelector("#services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-white/30 text-white hover:bg-white/10 font-display font-semibold text-base px-8 py-6 backdrop-blur-sm"
            >
              Explore Our Services
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScroll}
        data-ocid="hero.button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          delay: 1.2,
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
        aria-label="Scroll down"
      >
        <span className="font-display text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "Drywall Installation",
    subtitle: "Done Professionally",
    description:
      "Expert drywall installation for commercial and residential projects. Our skilled team screws every panel precisely into metal studs, ensuring a flawless, durable finish that stands the test of time.",
    image: "/assets/generated/drywall-installation-service.dim_800x600.jpg",
    icon: "🔩",
  },
  {
    title: "Drywall Building",
    subtitle: "Wall & Texture",
    description:
      "From new construction to renovation, we deliver flawless drywall installation with expert texture matching. Our craftsmen ensure every surface is perfectly smooth, level, and built to last.",
    image: "/assets/generated/finished-wall-texture.dim_800x600.jpg",
    icon: "🏗️",
  },
  {
    title: "Metal Framing",
    subtitle: "Structural Excellence",
    description:
      "Precision metal stud framing for commercial and residential projects. Our team handles all gauges and configurations, ensuring structural integrity and perfect alignment every time.",
    image: "/assets/generated/metal-framing.dim_800x600.jpg",
    icon: "⚙️",
  },
  {
    title: "Painting Interior Walls",
    subtitle: "Flawless Finishes",
    description:
      "Professional interior painting that completes your vision. We prep, prime, and paint with meticulous care — delivering crisp lines, even coverage, and finishes that elevate any space.",
    image: "/assets/generated/interior-painting.dim_800x600.jpg",
    icon: "🎨",
  },
  {
    title: "Mud & Taping",
    subtitle: "Seamless Joints",
    description:
      "Expert mud and tape application for perfectly smooth drywall seams. Our skilled team ensures invisible joints, flawless finishes, and surfaces that are paint-ready to perfection.",
    image: "/assets/generated/mud-taping.dim_800x600.jpg",
    icon: "🔧",
  },
  {
    title: "Remodeling",
    subtitle: "Full Transformations",
    description:
      "Complete home and commercial remodeling services from start to finish. We handle everything from demolition and framing to drywall, texture, and final finishes — one team, one vision.",
    image: "/assets/generated/remodeling.dim_800x600.jpg",
    icon: "🏠",
  },
];

function Services() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Craftsmanship <br />
            <span className="text-gradient-blue">You Can See</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              data-ocid={
                `services.card.${i + 1}` as
                  | "services.card.1"
                  | "services.card.2"
                  | "services.card.3"
                  | "services.card.4"
                  | "services.card.5"
                  | "services.card.6"
              }
              className="group relative rounded-2xl overflow-hidden bg-card border border-border card-hover shadow-dark"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="font-display font-semibold text-primary text-xs tracking-widest uppercase mb-1">
                  {service.subtitle}
                </p>
                <h3 className="font-display font-black text-xl md:text-2xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover blue border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    desc: "Fully licensed and insured for your peace of mind",
  },
  {
    icon: Building2,
    title: "Commercial & Residential",
    desc: "Expert solutions for every type of project",
  },
  {
    icon: Home,
    title: "No Job Too Big or Too Small",
    desc: "From single rooms to full-scale commercial builds",
  },
  {
    icon: Star,
    title: "Best Customer Experience",
    desc: "Arizona's most trusted drywall specialists",
  },
];

function WhyUs() {
  return (
    <section
      id="why-us"
      data-ocid="why-us.section"
      className="py-24 md:py-32 bg-card relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main statement */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-6">
              Why Choose Us
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-8">
              We Don't Just Build Walls —<br />
              <span className="text-gradient-blue">
                We Build Arizona's Future.
              </span>
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unmatched craftsmanship, relentless attention to detail, and a
              commitment to excellence that turns every project into a
              masterpiece. When you hire AZ Drywall Solution, you're not just
              getting a contractor — you're getting Arizona's most dedicated
              building partner.
            </p>
          </motion.div>

          {/* Highlights row */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
              hidden: {},
            }}
          >
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  data-ocid="why-us.card"
                  className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group shadow-dark card-hover"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-black text-base md:text-lg text-foreground mb-2 leading-tight">
                    {badge.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {badge.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "10+", label: "Years in Arizona" },
              { value: "100%", label: "Professional Results" },
              { value: "✦", label: "Integrity Driven" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display font-black text-4xl md:text-5xl text-gradient-blue">
                  {stat.value}
                </span>
                <span className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Before & After ───────────────────────────────────────────────────────────

function BeforeAfter() {
  return (
    <section
      id="before-after"
      data-ocid="before-after.section"
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-3">
            The Transformation
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            See the <span className="text-gradient-blue">Difference</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Our work speaks for itself. Every project is a complete
            transformation from raw construction to a stunning finished space.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            data-ocid="before-after.panel"
            className="relative rounded-2xl overflow-hidden group shadow-dark"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/generated/before-drywall.dim_800x600.jpg"
              alt="Before — Raw drywall construction"
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Label */}
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-sm">
              <span className="font-display font-black text-sm text-white tracking-widest uppercase">
                Before
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display font-bold text-white text-lg">
                Raw Construction
              </p>
              <p className="font-body text-white/70 text-sm mt-1">
                Unfinished drywall, visible seams & tape
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            data-ocid="before-after.panel"
            className="relative rounded-2xl overflow-hidden group shadow-dark"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <img
              src="/assets/generated/after-drywall.dim_800x600.jpg"
              alt="After — Beautiful finished drywall"
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            {/* Label */}
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-primary/80 border border-primary backdrop-blur-sm">
              <span className="font-display font-black text-sm text-primary-foreground tracking-widest uppercase">
                After
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display font-bold text-white text-lg">
                Flawless Finish
              </p>
              <p className="font-body text-white/70 text-sm mt-1">
                Smooth, painted, professionally completed
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider with checkmarks */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            "Expert Finishing",
            "Perfect Texture",
            "Premium Paint",
            "Clean & On-Time",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-display font-semibold text-sm text-foreground">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

const GALLERY_ITEMS = [
  {
    src: "/assets/generated/gallery-ceiling-work.dim_800x600.jpg",
    alt: "Hispanic worker applying joint compound to ceiling drywall",
    label: "Ceiling Work",
    span: "md:col-span-2",
  },
  {
    src: "/assets/generated/gallery-commercial-framing.dim_800x600.jpg",
    alt: "Commercial metal stud framing in a large Arizona building",
    label: "Commercial Framing",
    span: "",
  },
  {
    src: "/assets/generated/gallery-living-room-finish.dim_800x600.jpg",
    alt: "Modern Arizona living room with smooth finished drywall walls",
    label: "Residential Finish",
    span: "",
  },
  {
    src: "/assets/generated/gallery-texture-detail.dim_800x600.jpg",
    alt: "Close-up of professional orange peel texture finish",
    label: "Texture Detail",
    span: "md:col-span-2",
  },
  {
    src: "/assets/generated/gallery-bathroom-remodel.dim_800x600.jpg",
    alt: "Bathroom remodel showing before and after drywall finishing",
    label: "Remodel Project",
    span: "",
  },
];

function Gallery() {
  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-24 md:py-32 bg-card relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Our Finished <span className="text-gradient-blue">Work</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Every project we complete is a testament to our commitment to
            excellence and precision craftsmanship.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.src}
              data-ocid={
                `gallery.item.${i + 1}` as
                  | "gallery.item.1"
                  | "gallery.item.2"
                  | "gallery.item.3"
                  | "gallery.item.4"
                  | "gallery.item.5"
              }
              className={`relative rounded-xl overflow-hidden group shadow-dark ${item.span}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-display font-bold text-white text-sm tracking-wide">
                  {item.label}
                </span>
              </div>
              {/* Always-visible label chip */}
              <div className="absolute top-3 left-3">
                <span className="font-display font-semibold text-xs text-primary-foreground bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Worker Spotlight ─────────────────────────────────────────────────────────

function WorkerSpotlight() {
  return (
    <section
      data-ocid="worker-spotlight.section"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-4">
              Our Craftsmen
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Built By Skilled <br />
              <span className="text-gradient-blue">Hands & Heart</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Every wall we build is a reflection of the dedication and
              expertise our team brings to each job site. From framing to
              finishing, our craftsmen take pride in every detail — delivering
              results that stand the test of time.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Meticulous attention to detail",
                "Experienced on commercial & residential sites",
                "Professional, clean, and on-time",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-body text-foreground text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-dark group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img
              src="/assets/generated/caucasian-drywall-worker.dim_1200x800.jpg"
              alt="Craftsman installing drywall panels"
              className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-display font-bold text-white text-lg">
                Precision Installation
              </span>
              <p className="font-body text-white/70 text-sm mt-1">
                Every panel placed with care and expertise
              </p>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Exterior Sheeting ────────────────────────────────────────────────────────

function ExteriorSheeting() {
  return (
    <section
      id="exterior-sheeting"
      data-ocid="exterior-sheeting.section"
      className="py-24 md:py-32 bg-card relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-dark group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/generated/exterior-sheeting-installation.dim_1200x800.jpg"
              alt="Caucasian workers installing exterior drywall sheeting on a building"
              className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-display font-bold text-white text-lg">
                Exterior Sheeting Installation
              </span>
              <p className="font-body text-white/70 text-sm mt-1">
                Professional exterior panel application with precision
              </p>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-4">
              Exterior Services
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Exterior Sheeting &<br />
              <span className="text-gradient-blue">Drywall Installation</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Our crew specializes in exterior sheathing and drywall
              installation for both commercial and residential structures. We
              deliver weatherproof, code-compliant installs that protect your
              building and provide a flawless base for any finish.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Commercial & residential exterior panels",
                "Code-compliant weatherproof installation",
                "Precise alignment and secure fastening",
                "Efficient crew, minimal disruption on-site",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-body text-foreground text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-primary/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <motion.p
            className="font-display font-semibold text-primary text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Ready to Start Your{" "}
            <span className="text-gradient-blue">Project?</span>
          </motion.h2>

          <motion.p
            className="font-body text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Call us today for a free estimate. Licensed & Insured · Commercial &
            Residential · No Job Too Big or Too Small
          </motion.p>

          {/* Phone CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10"
          >
            <p className="font-display font-bold text-muted-foreground text-lg mb-3 tracking-wide uppercase">
              Antonio Zambrano
            </p>
            <a
              href="tel:6029213870"
              data-ocid="contact.primary_button"
              className="inline-flex items-center gap-4 bg-primary hover:bg-accent text-primary-foreground font-display font-black text-3xl md:text-4xl lg:text-5xl px-10 py-6 rounded-2xl shadow-blue-lg transition-all duration-300 hover:scale-105 hover:shadow-blue"
            >
              <Phone className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
              (602) 921-3870
            </a>
          </motion.div>

          {/* Service area */}
          <motion.div
            className="flex items-center justify-center gap-2 text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="font-display font-semibold text-sm tracking-wide">
              Serving All of Arizona
            </span>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {[
              "Licensed & Insured",
              "Commercial",
              "Residential",
              "Free Estimates",
            ].map((badge) => (
              <span
                key={badge}
                className="font-display font-semibold text-xs text-primary border border-primary/40 bg-primary/10 px-4 py-2 rounded-full"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="font-display font-black text-2xl text-primary tracking-tight">
                AZ DRYWALL
              </span>
              <span className="font-display font-medium text-sm text-primary tracking-widest uppercase">
                SOLUTION
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Arizona's premier drywall and construction specialists. We build
              excellence into every wall.
            </p>
            <p className="font-display font-semibold text-xs text-primary mt-4 tracking-wide">
              Licensed & Insured · Commercial & Residential
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-widest mb-5">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    data-ocid="footer.link"
                    onClick={() => scrollToSection(link.href)}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-widest mb-5">
              Our Services
            </h4>
            <ul className="space-y-2">
              {[
                "Drywall Building & Texture",
                "Metal Framing",
                "Interior Painting",
                "Mud & Taping",
                "Remodeling",
                "Exterior Sheeting",
                "Commercial Projects",
                "Residential Projects",
              ].map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-muted-foreground">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground text-center md:text-left">
            © {year} AZ Drywall Solution. All rights reserved. Licensed &
            Insured | Commercial & Residential
          </p>
          <p className="font-body text-xs text-muted-foreground text-center md:text-right">
            No Job Too Big or Too Small · Serving All of Arizona
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <BeforeAfter />
        <Gallery />
        <WorkerSpotlight />
        <ExteriorSheeting />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
