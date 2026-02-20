import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const faqSections = [
  {
    title: "Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days within the US. Custom orders may take an additional 3-5 business days for production.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we ship within the United States. International shipping will be available soon.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package in real-time.",
      },
    ],
  },
  {
    title: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery for non-custom items in original condition. Custom-printed items are final sale.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact us at hello@michaellenny.com with your order number and reason for return. We'll provide a return shipping label.",
      },
    ],
  },
  {
    title: "Bulk Orders",
    items: [
      {
        q: "Do you offer bulk pricing?",
        a: "Yes! We offer competitive bulk pricing for orders of 24+ units. Contact us through our bulk order form for a custom quote.",
      },
      {
        q: "What's the minimum for bulk orders?",
        a: "Our minimum bulk order is 24 pieces per design. We can accommodate mixed sizes within the same design.",
      },
      {
        q: "Can I customize designs for bulk orders?",
        a: "Absolutely. We specialize in custom designs. Send us your artwork or work with our design team to create something unique.",
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-body text-sm font-medium text-foreground pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-body text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <Layout>
      <section className="pt-28 pb-24 min-h-screen">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              FAQ & Shipping
            </h1>
            <p className="text-body text-muted-foreground">
              Everything you need to know
            </p>
          </motion.div>

          {faqSections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 100}>
              <div className="mb-12">
                <h2 className="text-display text-xl font-bold text-foreground mb-6">
                  {section.title}
                </h2>
                <div>
                  {section.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
