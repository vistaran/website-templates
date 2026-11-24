"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function CatalogueSection() {
  const router = useRouter(); // Initialize the router

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
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 lg:gap-0 divide-gray-300 lg:divide-x">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group overflow-hidden cursor-pointer" // Add cursor-pointer for clickable feel
          onClick={() => router.push(item.link)} // OnClick event to navigate to the page
        >
          <div>
            <Image
              src={item.image}
              alt={item.title}
              width={380}
              height={100}
              className="w-full h-80"
            />
          </div>
          <div className="rounded absolute top-0 p-7 bg-zinc-900 bg-opacity-60 text-white backdrop-blur m-6 border border-gray-500">
            <div className="flex justify-between pb-4">
              <p className="text-sm">{item.category}</p>
              <span className="text-sm">{item.id}</span>
            </div>
            <p className="font-semibold text-xl">{item.title}</p>
            <div>
              <p className="py-4">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
