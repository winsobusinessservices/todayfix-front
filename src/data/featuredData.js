import React from "react";
import JMM_LOGO from "../assets/jmm_logo.png";
import JMM_BG from "../assets/jmm_bg.jpeg";
import KTT_LOGO from "../assets/ktt_logo.png";
import KTT_BG from "../assets/ktt_bg.avif";
import DK_LOGO from "../assets/dkk_logo.png";
import DK_BG from "../assets/dk_bg.avif";

export const featuredData = [
  {
    id: 1,
    name: "Jai Maa Modular Interiors",
    category: "Home & Decor",
    service: "Interior Design",
    location: "Bangalore",
    rating: "4.9",
    reviews: "245",
    description:
      "Transforming 2BHK and 3BHK homes with bespoke modular kitchens, living spaces, and wardrobes.",
    bgGradient: "from-zinc-900 to-black",
    bg: JMM_BG,
    logo: JMM_LOGO,
  },
  {
    id: 2,
    name: "Kalavathi Tours & Travels",
    category: "Tours & Travels",
    service: "Corporate Travels",
    location: "Bangalore",
    rating: "4.8",
    reviews: "189",
    description:
      "Reliable Airport Transfers, Corporate Transportation, Executive Travel, Employee Transportation and Event Travel Services.",
    bgGradient: "from-zinc-100 to-white",
    bg: KTT_BG,
    logo: KTT_LOGO,
  },
  {
    id: 3,
    name: "DK Relocation",
    category: "Logistics",
    service: "Packers & Movers",
    location: "Bangalore",
    rating: "5.0",
    reviews: "94",
    description:
      "Professional packing, secure transport & on-time delivery — door to door, anywhere in India. Trusted by 50,000+ families & businesses.",
    bgGradient: "from-zinc-100 to-white",
    bg: DK_BG,
    logo: DK_LOGO,
  },
];
