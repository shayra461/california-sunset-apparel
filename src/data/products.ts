import productTshirt from "@/assets/product-tshirt.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productCap from "@/assets/product-cap.jpg";
import productPolo from "@/assets/product-polo.jpg";
import productJersey from "@/assets/product-jersey.jpg";
import heroCap from "@/assets/hero-cap.png";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
};

export const categories = ["All", "T-Shirts", "Hoodies", "Caps", "Polo Shirts", "Jerseys"];

export const products: Product[] = [
  {
    id: "tshirt-classic-1",
    name: "Classic Logo Tee",
    category: "T-Shirts",
    price: 45,
    image: productTshirt,
    description: "Premium heavyweight cotton tee with custom ML monogram print. Oversized fit, ribbed collar, and drop shoulder construction. Designed & printed in California.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "tshirt-essential-2",
    name: "Essential Crew Tee",
    category: "T-Shirts",
    price: 40,
    image: productTshirt,
    description: "Everyday essential tee crafted from premium combed cotton. Clean silhouette with subtle branding detail.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "hoodie-heritage-1",
    name: "Heritage Pullover Hoodie",
    category: "Hoodies",
    price: 95,
    image: productHoodie,
    description: "Heavyweight fleece pullover hoodie with kangaroo pocket and embroidered ML monogram. Premium construction with reinforced seams.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "hoodie-zip-2",
    name: "Sunset Zip Hoodie",
    category: "Hoodies",
    price: 105,
    image: productHoodie,
    description: "Full-zip hoodie with California sunset gradient lining. Premium heavyweight fleece construction.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "cap-snapback-1",
    name: "ML Signature Snapback",
    category: "Caps",
    price: 38,
    image: heroCap,
    description: "Premium structured snapback with 3D embroidered ML monogram. Adjustable snap closure. One size fits most.",
    sizes: ["One Size"],
  },
  {
    id: "cap-dad-2",
    name: "California Dad Cap",
    category: "Caps",
    price: 32,
    image: productCap,
    description: "Relaxed fit dad cap with embroidered California script. Adjustable buckle closure.",
    sizes: ["One Size"],
  },
  {
    id: "polo-classic-1",
    name: "Performance Polo",
    category: "Polo Shirts",
    price: 65,
    image: productPolo,
    description: "Moisture-wicking performance polo with embroidered ML logo. Perfect for business casual or weekend wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "jersey-team-1",
    name: "Team Custom Jersey",
    category: "Jerseys",
    price: 75,
    image: productJersey,
    description: "Full sublimation custom jersey. Breathable athletic mesh fabric. Perfect for teams and events.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "jersey-premium-2",
    name: "Premium Athletic Jersey",
    category: "Jerseys",
    price: 85,
    image: productJersey,
    description: "Premium athletic jersey with custom print capability. Pro-grade moisture management fabric.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];
