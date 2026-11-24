"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CatalogueSectionV3() {
  const router = useRouter();

  const items = [
    {
      id: "01",
      category: "KITCHEN SETUP",
      title: "Best Modular Kitchen Design",
      image: "/images/kitchen1.jpg",
      description:
        "Create a neat and clean kitchen with a modern and stylish setup, perfect for enhancing your cooking experience.",
      link: "/kitchen",
    },
    {
      id: "02",
      category: "PLYWOOD SETUP",
      title: "Best Plywood Design",
      image: "/images/imageplywood.jpg",
      description:
        "Upgrade your space with high quality plywood, best quality of laminates and with unique type of veneers. Offering durability and unique designs for your interiors solutions",
      link: "/plywood",
    },
    {
      id: "03",
      category: "HARDWARE SETUP",
      title: "Best Hardware Inventory",
      image: "/images/hardware1bg.jpg",
      description:
        "Discover top-notch hardware solutions that combine functionality and style to meet all your setup needs.",
      link: "/hardware",
    },
    {
      id: "04",
      category: "TIMBER",
      title: "Best Timber Quality",
      image: "/images/rajdhani-timber-image-6.jpeg",
      description:
        "Discover the finest Timber, wood logs for your interior furniture and explore the wide range of premium woods with rajdhani timber.",
      link: "/timber",
    },
    {
      id: "05",
      category: "STHAPATYA ARCHITECTS",
      title: "Sthapatya Architects Expertise",
      image: "/images/sa-1.JPG",
      description:
        "Experience the brilliance of modern and sustainable architecture with Sthapatya Architects. Explore our portfolio of innovative designs.",
      link: "/sthapatya-architects",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Collections</p>
          <h2 className="text-4xl md:text-5xl font-bold">Catalogue</h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Explore our premium selection of interior solutions, from top-tier modular kitchens and durable plywood to high-quality timber and innovative architectural designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.link)}
              className="group relative h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                <div className="self-end bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                  <span className="text-xs font-semibold tracking-wider text-white uppercase">View Details</span>
                </div>
                
                <div className="transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">{item.category}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
