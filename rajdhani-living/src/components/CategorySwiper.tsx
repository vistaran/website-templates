'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { TbArrowUpRight } from 'react-icons/tb'
import { titleVariants, desVariants, tagVariants } from '@/utils/animations'
import { motion } from 'framer-motion'
import Image from "next/image"
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const imgURLs = [
    {
        id: 1,
        url: '/images/swiper1.jpg'
    },
    {
        id: 2,
        url: '/images/swiper2.jpg'
    },
    {
        id: 3,
        url: '/images/swiper3.jpg'
    },
    {
        id: 4,
        url: '/images/swiper4.jpg'
    },
    {
        id: 5,
        url: '/images/swiper5.jpg'
    },
    {
        id: 6,
        url: '/images/swiper6.jpg'
    },
]

export default function CategorySwiper() {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <div className='py-8 bg-white dark:bg-tertiary'>
            <div className='container mx-auto px-4 md:px-8 xl:px-28 pb-20 pt-16 relative z-10'>
                {/* Global Background text (Desktop only) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:flex items-center justify-center opacity-[0.02] dark:opacity-[0.03] select-none">
                    <h1 className="text-[20rem] font-bold text-foreground uppercase whitespace-nowrap tracking-widest">Decor</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
                    <div className="lg:col-span-7 relative z-10">
                        {/* Decorative accent */}
                        <div className="absolute -left-8 -top-8 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl hidden md:block"></div>
                        
                        <motion.p  
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className='uppercase font-semibold tracking-[0.3em] mb-6 ml-2 text-xs md:text-sm text-primary font-sans'>
                            Luxury Collection
                        </motion.p>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className='text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-[1.05] tracking-tighter'>
                            Modern <br/>
                            <span className="flex items-center gap-4 md:gap-6 mt-2">
                                <span className="italic font-light text-muted-foreground/50">&amp;</span>
                                Classic
                            </span>
                            <span className="block text-primary mt-2">Decor</span>
                        </motion.h1>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-end pt-8 lg:pt-0 lg:border-l lg:border-border/50 lg:pl-12 relative z-10">
                        
                        <div className="relative p-6 lg:p-0 rounded-[1.5rem] bg-card/30 dark:bg-card/10 lg:bg-transparent lg:dark:bg-transparent border border-border/50 lg:border-none backdrop-blur-sm lg:backdrop-blur-none overflow-hidden lg:overflow-visible shadow-lg lg:shadow-none">
                            
                            {/* Watermark constrained inside the paragraph card (Mobile only) */}
                            <div className="absolute inset-0 flex lg:hidden items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none overflow-hidden">
                                <h2 className="text-[5rem] md:text-[6rem] font-bold text-foreground uppercase whitespace-nowrap tracking-widest">Decor</h2>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className='mb-12 relative z-10'>
                                <svg className="w-10 h-10 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
                                    With our passion for design and decor, we have created a collection of furniture and accessories that will help you create a comfortable and stylish home. With our passion for design and decor, we have created a collection of furniture and accessories that will help you create a comfortable and stylish home. Checkout some photos down below.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="relative z-10"
                            >
                                <Link href='/kitchen' className="group inline-flex items-center gap-5 cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-primary/30 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                        <TbArrowUpRight className="text-2xl relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase tracking-[0.2em] font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                                            Explore Showcase
                                        </span>
                                        <span className="text-xs text-muted-foreground mt-1">View the full collection</span>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Swiper section */}

            <Swiper
                slidesPerView={1}
                breakpoints={{
                    620:{
                        spaceBetween: 20,
                        slidesPerView: 2,
                    },
                    1024:{
                        spaceBetween: 50,
                        slidesPerView: 3,
                    }
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
                >
                {
                    imgURLs.map((image, index) => (
                        <SwiperSlide key={image.id}>
                            <div className="overflow-hidden rounded-2xl shadow-md border border-border/50 bg-card group">
                                <Image src={image.url} alt='swiper' width={520} height={320} className='w-full h-80 object-cover rounded-2xl cursor-pointer transform group-hover:scale-110 transition-transform duration-700 ease-out' onClick={() => { setPhotoIndex(index); setIsOpen(true); }}/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* Lightbox for image preview */}
            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                index={photoIndex}
                slides={imgURLs.map(image => ({ src: image.url }))}
                on={{
                    view: ({ index }) => setPhotoIndex(index)
                }}
            />
        </div>
    )
}
