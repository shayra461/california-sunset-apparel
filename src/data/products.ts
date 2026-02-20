import prodTshirtBlue from "@/assets/prod-tshirt-blue.jpg";
import prodTshirtBlack from "@/assets/prod-tshirt-black.jpg";
import prodTshirtCream from "@/assets/prod-tshirt-cream.jpg";
import prodTshirtCream2 from "@/assets/prod-tshirt-cream2.jpg";
import prodCapOrangeBlue from "@/assets/prod-cap-orange-blue.jpg";
import prodCapGreen from "@/assets/prod-cap-green.png";
import prodCapRoyalBlue from "@/assets/prod-cap-royal-blue.png";
import prodCapGreenLifestyle from "@/assets/prod-cap-green-lifestyle.png";
import prodCapOrangeLifestyle from "@/assets/prod-cap-orange-lifestyle.jpg";
import prodCapBlueLifestyle from "@/assets/prod-cap-blue-lifestyle.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productPolo from "@/assets/product-polo.jpg";
import productJersey from "@/assets/product-jersey.jpg";

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
    id: "tshirt-ml-blue",
    name: "Michael Lenny Signature Tee — Sky Blue",
    category: "T-Shirts",
    price: 45,
    image: prodTshirtBlue,
    description: "Premium cotton tee with the iconic Michael Lenny script and ML monogram. Soft sky blue colorway. Designed & printed in California.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "tshirt-discipline",
    name: "Discipline Tee — Black",
    category: "T-Shirts",
    price: 48,
    image: prodTshirtBlack,
    description: "Bold statement tee with 'Discipline Separates You From The Pack' varsity print. Heavy cotton, oversized fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "tshirt-cream-blue",
    name: "ML Clothing Co. Tee — Cream / Blue",
    category: "T-Shirts",
    price: 45,
    image: prodTshirtCream,
    description: "Vintage-wash cream tee with 'Michael Lenny Clothing Company — Authentic Casual Wear Since 1962' script. Classic script lettering.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "tshirt-cream-black",
    name: "ML Clothing Co. Tee — Cream / Black",
    category: "T-Shirts",
    price: 45,
    image: prodTshirtCream2,
    description: "Vintage-wash cream tee with bold black script branding. Relaxed fit, premium combed cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "cap-orange-blue",
    name: "ML Snapback — Orange & Blue",
    category: "Caps",
    price: 42,
    image: prodCapOrangeBlue,
    description: "Structured snapback with 3D embroidered ML monogram. Premium wool-blend orange body with royal blue brim. One size fits most.",
    sizes: ["One Size"],
  },
  {
    id: "cap-green",
    name: "Michael Lenny Snapback — Kelly Green",
    category: "Caps",
    price: 42,
    image: prodCapGreen,
    description: "Kelly green snapback with embroidered 'Michael Lenny' script in white. Clean, premium finish.",
    sizes: ["One Size"],
  },
  {
    id: "cap-royal-blue",
    name: "ML Snapback — Royal Blue & White",
    category: "Caps",
    price: 42,
    image: prodCapRoyalBlue,
    description: "Royal blue structured snapback with white brim and 3D embroidered ML monogram. A California classic.",
    sizes: ["One Size"],
  },
  {
    id: "cap-green-lifestyle",
    name: "ML Green Cap — Street Edition",
    category: "Caps",
    price: 44,
    image: prodCapGreenLifestyle,
    description: "The iconic Michael Lenny green cap, styled for the streets. Same premium build, worn by real people.",
    sizes: ["One Size"],
  },
  {
    id: "cap-orange-lifestyle",
    name: "ML Orange Cap — Street Edition",
    category: "Caps",
    price: 44,
    image: prodCapOrangeLifestyle,
    description: "The Orange & Blue ML snapback worn in the streets of New York. Premium 3D embroidery, structured fit.",
    sizes: ["One Size"],
  },
  {
    id: "cap-blue-lifestyle",
    name: "ML Blue Cap — Street Edition",
    category: "Caps",
    price: 44,
    image: prodCapBlueLifestyle,
    description: "Royal Blue ML cap styled for everyday wear. Bold street presence with premium construction.",
    sizes: ["One Size"],
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
