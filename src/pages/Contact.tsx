import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "sonner";
import { Send, Mail, MessageSquare, Users } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", bulk: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "", bulk: false });
  };

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
              Get in Touch
            </h1>
            <p className="text-body text-muted-foreground">
              Questions, bulk orders, or custom requests — we'd love to hear from you
            </p>
          </motion.div>

          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {[
                { icon: Mail, label: "Email Us", detail: "hello@michaellenny.com" },
                { icon: MessageSquare, label: "Quick Response", detail: "Within 24 hours" },
                { icon: Users, label: "Bulk Orders", detail: "Custom pricing" },
              ].map((item) => (
                <div key={item.label} className="text-center p-6 glass-surface rounded-sm">
                  <item.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <p className="text-body text-sm font-medium text-foreground mb-1">{item.label}</p>
                  <p className="text-body text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-body text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="bulk"
                  checked={form.bulk}
                  onChange={(e) => setForm({ ...form, bulk: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="bulk" className="text-body text-sm text-muted-foreground">
                  This is a bulk order inquiry
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 gradient-sunset text-primary-foreground font-semibold text-sm tracking-wider uppercase rounded-sm glow-button"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
