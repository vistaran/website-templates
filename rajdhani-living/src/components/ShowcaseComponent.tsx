'use client'

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function ShowcaseComponent() {

    const whatsappNumber = '919909032740';

    const items = [
        {
            src: '/images/r-kitchen-image-1.png',
            title: 'Kitchen',
            description:
                'Explore our modern and stylish kitchen designs, crafted for functionality and elegance. From sleek cabinets to innovative storage solutions, our kitchens are designed to enhance your culinary experience.',
        },
        {
            src: '/images/rajdhani-plywood-image-4.jpg',
            title: 'Plywood',
            description:
                'Browse our extensive hardware collection, featuring top-of-the-line fittings and accessories. From door handles to drawer slides, we provide everything you need to complete your interiors with precision and finesse.',
        },
        {
            src: '/images/rajdhani-hardware-image-1.jpeg',
            title: 'Hardware',
            description: 'Bedroom with a clean and comfortable design for your family. Charming with a modern design.',
        }

    ];

    return (
        <div>
            <div className="bg-[url('/images/backgroundproject.jpg')] bg-cover bg-center">
                <h1 className="md:text-5xl text-5xl text-orange-500 text-center font-semibold tracking-wider container lg:py-48 py-32 xl:px-28">
                    Rajdhani Showcase
                </h1>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 container xl:px-28 py-14">
                {items.map((item, index) => (
                    <div key={index} className="relative group overflow-hidden">
                        <Image src={item.src} alt={item.title} width={480} height={380} className="rounded-lg w-full" />
                        <div className="md:p-12 p-4 absolute bg-white dark:bg-black dark:bg-opacity-60 w-3/4 bg-opacity-80 right-0 translate-y-0 group-hover:-translate-y-full transition-all">
                            <h1 className="font-semibold pb-2 md:text-xl">{item.title}</h1>
                            <p>{item.description}</p>
                            <div className="mt-3 w-full flex left-11 justify-center text-center">
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    className="flex items-center justify-center bg-green-500 text-white px-6 py-1 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaWhatsapp className="mr-2 text-center text-xl" />
                                    WhatsApp Us: {whatsappNumber}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
