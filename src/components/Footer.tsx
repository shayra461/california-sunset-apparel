import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <img src={logo} alt="ML" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium custom apparel designed & printed in California.
            </p>
          </div>

          <div>
            <h4 className="text-body text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-foreground">
              Shop
            </h4>
            <ul className="space-y-2">
              {["T-Shirts", "Hoodies", "Caps", "Polo Shirts", "Jerseys"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-foreground">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "FAQ", to: "/faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2025 Michael Lenny Apparel Group, LLC. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Based in California
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
