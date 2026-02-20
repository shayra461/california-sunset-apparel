import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 15, y: y * -10 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!heroRef.current) return;
    const touch = e.touches[0];
    const rect = heroRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (touch.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 15, y: y * -10 });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-dark"
      >
        {/* Sunset glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[120px] animate-glow-pulse"
          style={{ background: "radial-gradient(ellipse, hsl(20 76% 60%), hsl(30 80% 55%), transparent)" }}
        />

        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          {/* Cap with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-8"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <img
              src={heroCap}
              alt="ML Signature Snapback"
              className="w-64 sm:w-80 md:w-96 h-auto hero-shadow animate-float"
            />
            {/* Shadow beneath */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 bg-foreground/5 rounded-full blur-xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4"
          >
            PREMIUM CUSTOM
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              APPAREL
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-body text-muted-foreground text-sm sm:text-base tracking-[0.2em] uppercase mb-10"
          >
            Designed & Printed in California
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 gradient-sunset text-primary-foreground font-semibold text-sm tracking-wider uppercase rounded-sm glow-button"
            >
              Shop Collection
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Shop by Category
            </h2>
            <p className="text-body text-muted-foreground text-center mb-16 max-w-md mx-auto">
              Premium custom apparel for every occasion
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 100}>
                <Link to="/shop" className="group block">
                  <div className="card-3d relative overflow-hidden rounded-sm bg-card aspect-[3/4]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-display text-xl font-semibold text-foreground">
                        {cat.name}
                      </h3>
                      <span className="text-body text-xs tracking-wider uppercase text-primary mt-1 inline-flex items-center gap-1">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-display text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
              Featured Pieces
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 80}>
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="product-card-hover rounded-sm overflow-hidden bg-secondary">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-body font-medium text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-body text-primary font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground text-sm tracking-wider uppercase hover:border-primary hover:text-primary transition-all duration-300"
              >
                View All Products
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 gradient-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(ellipse, hsl(20 76% 60%), transparent)" }}
        />
        <ScrollReveal>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-display text-3xl md:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
              Crafted with Purpose,
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Worn with Pride
              </span>
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
              Every piece from Michael Lenny Apparel Group is custom designed and printed
              in California. We believe in quality over quantity — premium fabrics,
              meticulous craftsmanship, and designs that make a statement.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary text-sm tracking-wider uppercase hover:gap-3 transition-all duration-300"
            >
              Our Story <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default Index;
