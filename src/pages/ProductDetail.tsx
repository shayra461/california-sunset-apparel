import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import Layout from "@/components/Layout";
import { products } from "@/data/products";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="pt-28 pb-24 text-center min-h-screen flex items-center justify-center">
          <div>
            <h1 className="text-display text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Link to="/shop" className="text-primary text-sm tracking-wider uppercase">
              Back to Shop
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      toast.error("Please select a size");
      return;
    }
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <section className="pt-28 pb-24 min-h-screen">
        <div className="container mx-auto px-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="product-card-hover rounded-sm overflow-hidden bg-card"
            >
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <p className="text-body text-xs text-primary uppercase tracking-[0.2em] mb-3">
                {product.category}
              </p>
              <h1 className="text-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-display text-2xl text-primary font-semibold mb-6">
                ${product.price}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size selector */}
              {product.sizes.length > 1 && (
                <div className="mb-8">
                  <p className="text-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs tracking-wider border rounded-sm transition-all duration-300 ${
                          selectedSize === size
                            ? "border-primary text-primary bg-primary/10"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-sm hover:border-foreground transition-colors text-foreground"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-body text-foreground w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-sm hover:border-foreground transition-colors text-foreground"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 gradient-sunset text-primary-foreground font-semibold text-sm tracking-wider uppercase rounded-sm glow-button"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-surface z-40">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 gradient-sunset text-primary-foreground font-semibold text-sm tracking-wider uppercase rounded-sm"
        >
          <ShoppingBag size={18} />
          Add to Cart — ${product.price}
        </button>
      </div>
    </Layout>
  );
};

export default ProductDetail;
