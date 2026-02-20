import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="pt-28 pb-24 min-h-screen">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h1 className="text-display text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
              Shop Collection
            </h1>
            <p className="text-body text-muted-foreground text-center mb-12">
              Premium custom apparel, designed & printed in California
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs tracking-wider uppercase rounded-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? "gradient-sunset text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 60}>
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="product-card-hover rounded-sm overflow-hidden bg-card">
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
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
