import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import capGreenMl from "@/assets/cap-green-ml.png";
import capOrangeBlue from "@/assets/cap-orange-blue.png";
import capRoyalBlue from "@/assets/cap-royal-blue.png";
import productTshirt from "@/assets/product-tshirt.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productCap from "@/assets/product-cap.jpg";
import productJersey from "@/assets/product-jersey.jpg";
import { products } from "@/data/products";

const categoryCards = [
  { name: "T-Shirts", image: productTshirt },
  { name: "Hoodies", image: productHoodie },
  { name: "Caps", image: productCap },
  { name: "Jerseys", image: productJersey },
];

const caps = [
  { src: capRoyalBlue,  label: "Royal Blue Snapback",    color: "#1e4fc2", imgScale: 1.38 },
  { src: capGreenMl,    label: "Kelly Green Snapback",   color: "#1a9e40", imgScale: 1 },
  { src: capOrangeBlue, label: "Orange & Blue Snapback", color: "#c94a0a", imgScale: 1.38 },
];

const CARD_COUNT = caps.length;

// Returns position slot: 0 = center, -1 = left, +1 = right (wrapping)
const getSlot = (i: number, active: number, total: number) => {
  let diff = i - active;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;
  return diff; // -1, 0, or 1 for a 3-cap deck
};

const CapSlider = () => {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 100, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 100, damping: 20 });

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % CARD_COUNT);
    }, 3500);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    startInterval(); // reset timer on manual nav
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    tiltY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 18);
    tiltX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -12);
  };
  const handleMouseLeave = () => { tiltX.set(0); tiltY.set(0); };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!heroRef.current) return;
    const t = e.touches[0];
    const rect = heroRef.current.getBoundingClientRect();
    tiltY.set(((t.clientX - rect.left - rect.width / 2) / rect.width) * 18);
    tiltX.set(((t.clientY - rect.top - rect.height / 2) / rect.height) * -12);
  };

  const springCfg = { type: "spring" as const, stiffness: 200, damping: 32, mass: 1 };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      className="relative w-full flex items-center justify-center"
      style={{ height: "58vh", minHeight: 360 }}
    >
      {/* Ambient glow — color-keyed to active cap */}
      <motion.div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse, ${caps[active].color}66, transparent)`,
          scale: [0.9, 1.08, 0.9],
          opacity: [0.28, 0.42, 0.28],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 560, height: 440 }}
      />

      {/* All caps — always mounted, position driven by slot */}
      {caps.map((cap, i) => {
        const slot = getSlot(i, active, CARD_COUNT); // -1 | 0 | 1
        const isActive = slot === 0;

        const xOffset  = slot * 220;
        const scale    = isActive ? 1 : 0.62;
        const rotY     = isActive ? 0 : slot * 28;
        const rotZ     = isActive ? 0 : slot * 4;
        const opacity  = isActive ? 1 : 0.48;
        const zIndex   = isActive ? 10 : 2;

        return (
          <motion.div
            key={i}
            className="absolute select-none"
            style={{
              cursor: isActive ? "default" : "pointer",
              zIndex,
              // tilt only on active cap
              rotateX: isActive ? smoothTiltX : 0,
              rotateY: isActive ? smoothTiltY : 0,
              perspective: 1000,
            }}
            animate={{
              x: xOffset,
              scale,
              rotateY: rotY,
              rotateZ: rotZ,
              opacity,
            }}
            transition={springCfg}
            onClick={() => !isActive && goTo(i)}
          >
            {/* Glow ring behind active cap */}
            {isActive && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.28, 0.12] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: `radial-gradient(ellipse, ${cap.color}55, transparent)`,
                  filter: "blur(36px)",
                }}
              />
            )}

            <motion.img
              src={cap.src}
              alt={cap.label}
              className="w-64 sm:w-80 md:w-[420px] lg:w-[500px] h-auto"
              style={{
                scale: cap.imgScale,
                filter: isActive
                  ? "drop-shadow(0 60px 80px rgba(0,0,0,0.8))"
                  : "drop-shadow(0 30px 40px rgba(0,0,0,0.5))",
              }}
              animate={isActive ? { y: [0, -12, 0] } : { y: 0 }}
              transition={
                isActive
                  ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4 }
              }
            />

            {/* Ground shadow under active cap */}
            {isActive && (
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-52 md:w-72 h-4 rounded-full blur-2xl"
                style={{ background: `radial-gradient(ellipse, ${cap.color}55, transparent)` }}
                animate={{ scaleX: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Dot navigation */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {caps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Scroll-reveal word-by-word text
const ScrollRiseText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.3"],
  });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <WordReveal
              key={i}
              word={word}
              progress={scrollYProgress}
              start={start}
              end={end}
              delay={delay + i * 0.03}
            />
          );
        })}
      </div>
    </div>
  );
};

const WordReveal = ({
  word,
  progress,
  start,
  end,
  delay,
}: {
  word: string;
  progress: any;
  start: number;
  end: number;
  delay: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [40, 0]);
  const smoothOp = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.span
      style={{ opacity: smoothOp, y: smoothY, display: "inline-block" }}
    >
      {word}
    </motion.span>
  );
};

const Index = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 0.96]);
  const parallaxY = useTransform(heroScroll, [0, 1], [0, -80]);

  const { scrollYProgress: textScroll } = useScroll({
    target: textBlockRef,
    offset: ["start 0.9", "start 0.3"],
  });
  const textY = useTransform(textScroll, [0, 1], [80, 0]);
  const smoothTextY = useSpring(textY, { stiffness: 80, damping: 20 });

  return (
    <Layout>
      {/* ── HERO ── */}
      <section
        ref={heroSectionRef}
        className="relative h-screen flex flex-col items-center justify-start overflow-hidden gradient-dark"
      >
        {/* Animated rings */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-primary/8 pointer-events-none"
          style={{ y: parallaxY }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.04, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] rounded-full border border-accent/5 pointer-events-none"
          style={{ y: parallaxY }}
          animate={{ scale: [1.08, 1, 1.08], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Big sunset floor glow */}
        <div
          className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] rounded-full opacity-22 blur-[160px] animate-glow-pulse pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(20 76% 60%), hsl(30 80% 55%), hsl(15 65% 40%), transparent)" }}
        />
        {/* Top soft spotlight */}
        <div
          className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-8 blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(0 0% 100%), transparent)" }}
        />

        <motion.div
          style={{ scale: heroScale }}
          className="w-full flex flex-col items-center z-10"
        >
          {/* ── GAP below navbar then cap ── */}
          <div className="h-20 sm:h-24" /> {/* Gap between nav and cap */}

          {/* 3D Cap Shuffle Slider */}
          <div className="w-full">
            <CapSlider />
          </div>

          {/* Text block — rises up as user scrolls hero */}
          <motion.div
            ref={textBlockRef}
            style={{ y: smoothTextY }}
            className="text-center px-4 mt-4"
          >
            <h1 className="text-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-foreground leading-[0.88] mb-4">
              PREMIUM
              <br />
              <motion.span
                className="bg-gradient-to-r from-primary via-accent to-sunset-deep bg-clip-text text-transparent bg-[length:200%_100%]"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                CUSTOM APPAREL
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="text-body text-muted-foreground text-sm sm:text-base tracking-[0.3em] uppercase mb-8"
            >
              Designed & Printed in California
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
            >
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-3 px-10 py-4 gradient-sunset text-primary-foreground font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Shop Collection
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

      </section>

      {/* ── Brand statement with scroll-reveal words ── */}
      <section className="py-32 gradient-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-8 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(20 76% 60%), transparent)" }}
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollRiseText
            text="Crafted with Purpose, Worn with Pride"
            className="text-display text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight"
          />
          <ScrollReveal delay={200}>
            <p className="text-body text-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Every piece from Michael Lenny Apparel Group is custom designed and printed
              in California. Premium fabrics, meticulous craftsmanship, designs that make a statement.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-primary text-base tracking-wider uppercase"
            >
              Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-display text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
              Shop by Category
            </h2>
            <p className="text-body text-muted-foreground text-center mb-20 max-w-md mx-auto">
              Premium custom apparel for every occasion
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryCards.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 120}>
                <Link to="/shop" className="group block">
                  <motion.div
                    whileHover={{ scale: 1.03, rotateY: -5, rotateX: 3, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative overflow-hidden rounded-lg bg-card aspect-[3/4]"
                    style={{ perspective: 800, transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at bottom, hsl(20 76% 60% / 0.1), transparent)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-display text-2xl font-bold text-foreground mb-1">{cat.name}</h3>
                      <span className="text-body text-xs tracking-wider uppercase text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-display text-4xl md:text-5xl font-bold text-center mb-20 text-foreground">
              Featured Pieces
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 80}>
                <Link to={`/product/${product.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -8, rotateY: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="rounded-lg overflow-hidden bg-secondary"
                    style={{ perspective: 800 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-body text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="text-body text-lg font-medium text-foreground mb-2">{product.name}</h3>
                      <p className="text-body text-primary font-bold text-lg">${product.price}</p>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 px-10 py-4 border border-border text-foreground text-sm tracking-wider uppercase hover:border-primary hover:text-primary transition-all duration-300"
              >
                View All Products
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
