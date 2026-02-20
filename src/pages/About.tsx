import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  return (
    <Layout>
      <section className="pt-28 pb-24 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              The journey behind Michael Lenny Apparel Group
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <ScrollReveal>
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-card card-3d">
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <p className="text-body text-muted-foreground text-sm">Photo of Lenard</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <h2 className="text-display text-2xl font-bold text-foreground mb-6">
                  Founded by{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Lenard
                  </span>
                </h2>
                <div className="space-y-4 text-body text-muted-foreground leading-relaxed">
                  <p>
                    Michael Lenny Apparel Group, LLC. was born from a passion for 
                    self-expression through custom apparel. Based in California, we started 
                    with a simple mission: to create premium, custom-printed clothing that 
                    people are proud to wear.
                  </p>
                  <p>
                    Every piece we create is designed with intention and printed with precision. 
                    We work with the finest fabrics and use cutting-edge printing technology to 
                    ensure every detail meets our standard of excellence.
                  </p>
                  <p>
                    From custom team jerseys to limited-edition streetwear drops, we bring 
                    visions to life. Our commitment to quality, authenticity, and personal service 
                    is what sets us apart.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { stat: "100%", label: "Made in California" },
                { stat: "Premium", label: "Quality Materials" },
                { stat: "Custom", label: "Every Order" },
              ].map((item) => (
                <div key={item.label} className="p-8 glass-surface rounded-sm">
                  <p className="text-display text-2xl font-bold text-primary mb-2">
                    {item.stat}
                  </p>
                  <p className="text-body text-muted-foreground text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
