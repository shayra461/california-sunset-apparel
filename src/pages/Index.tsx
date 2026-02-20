import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import heroCap from "@/assets/hero-cap.png";
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

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const capControls = useAnimationControls();

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  useEffect(() => {
    // Entrance animation sequence
    capControls.start({
      opacity: 1,
      scale: 1,
      y: 0,
      rotateZ: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    });
  }, [capControls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    rotateY.set(x * 25);
    rotateX.set(y * -15);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!heroRef.current) return;
    const touch = e.touches[0];
    const rect = heroRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (touch.clientY - rect.top - rect.height / 2) / rect.height;
    rotateY.set(x * 25);
    rotateX.set(y * -15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Layout>
      {/* Hero Section — Full viewport, immersive */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen flex items-center justify-center overflow-hidden gradient-dark"
      >
        {/* Animated light rings */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-primary/10"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: parallaxY }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] rounded-full border border-accent/5"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: parallaxY }}
        />

        {/* Big sunset glow */}
        <div
          className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full opacity-25 blur-[150px] animate-glow-pulse pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(20 76% 60%), hsl(30 80% 55%), hsl(15 70% 45%), transparent)" }}
        />

        {/* Top spotlight */}
        <div
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(0 0% 100%), transparent)" }}
        />

        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="container mx-auto px-6 flex flex-col items-center text-center relative z-10"
        >
          {/* Giant 3D Cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, rotateZ: -10 }}
            animate={capControls}
            className="relative mb-6 md:mb-10 cursor-grab active:cursor-grabbing"
            style={{
              perspective: 1200,
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Glow behind cap */}
            <motion.div
              className="absolute inset-0 -inset-x-20 -inset-y-10 rounded-full blur-[80px] opacity-30 pointer-events-none"
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "radial-gradient(ellipse, hsl(20 76% 60% / 0.5), transparent)" }}
            />

            <motion.img
              src={heroCap}
              alt="ML Signature Snapback"
              className="w-80 sm:w-[420px] md:w-[520px] lg:w-[600px] h-auto drop-shadow-[0_60px_80px_rgba(0,0,0,0.7)]"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Reflection shadow */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 md:w-80 h-8 rounded-full blur-2xl"
              style={{ background: "radial-gradient(ellipse, hsl(20 76% 60% / 0.15), transparent)" }}
              animate={{ scaleX: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Huge headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-3 leading-[0.9]"
          >
            PREMIUM
            <br />
            <motion.span
              className="bg-gradient-to-r from-primary via-accent to-sunset-deep bg-clip-text text-transparent bg-[length:200%_100%]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              CUSTOM APPAREL
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-body text-muted-foreground text-base sm:text-lg tracking-[0.3em] uppercase mb-12"
          >
            Designed & Printed in California
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-3 px-10 py-5 gradient-sunset text-primary-foreground font-bold text-base tracking-wider uppercase rounded-sm overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Shop Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-9 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
            >
              <motion.div
                animate={{ opacity: [1, 0], y: [0, 12] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-primary"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at bottom, hsl(20 76% 60% / 0.1), transparent)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-display text-2xl font-bold text-foreground mb-1">
                        {cat.name}
                      </h3>
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

      {/* Featured Products */}
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
                      <p className="text-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-body text-lg font-medium text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-body text-primary font-bold text-lg">
                        ${product.price}
                      </p>
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

      {/* Brand Statement */}
      <section className="py-36 gradient-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(ellipse, hsl(20 76% 60%), transparent)" }}
        />
        <ScrollReveal>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-display text-4xl md:text-6xl font-bold text-foreground mb-8 max-w-4xl mx-auto leading-tight">
              Crafted with Purpose,
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Worn with Pride
              </span>
            </h2>
            <p className="text-body text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12">
              Every piece from Michael Lenny Apparel Group is custom designed and printed
              in California. We believe in quality over quantity — premium fabrics,
              meticulous craftsmanship, and designs that make a statement.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-primary text-base tracking-wider uppercase hover:gap-3 transition-all duration-300"
            >
              Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default Index;
