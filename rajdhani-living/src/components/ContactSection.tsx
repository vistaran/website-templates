'use client'

import React from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'
import {titleVariants, desVariants, tagVariants } from '@/utils/animations'

const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description: 'It is a fantastic theme with tons of design and loyal options, and the customer service is simply outstanding. they respond immediately and solve any inconvenience, no matter how small.',
        date: 'Mar 16, 2024',
        datetime: '2024-03-16',
        category: {title: '4.7', href:'#'},
        author: {
            name: 'Natasha',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl: '/images/profile1.jpg'
        },
    },
    {
        id: 2,
        title: 'Boost your conversion rate',
        href: '#',
        description: 'It is a fantastic theme with tons of design and loyal options, and the customer service is simply outstanding. they respond immediately and solve any inconvenience, no matter how small.',
        date: 'Oct 14, 2024',
        datetime: '2024-10-14',
        category: {title: '4.9', href:'#'},
        author: {
            name: 'Michael Chris',
            role: 'Co-Founder / CEO',
            href: '#',
            imageUrl: '/images/profile2.jpg'
        },
    },
    {
        id: 3,
        title: 'Boost your conversion rate',
        href: '#',
        description: 'Well, I had to choose a main reason for rating your great theme. Everything in this them is customizable, easy to use and it has a very high quality styling.',
        date: 'Nov 19, 2020',
        datetime: '2020-11-19',
        category: {title: '4.7', href:'#'},
        author: {
            name: 'Samuel',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl: '/images/profile3.jpg'
        },
    }
]

export default function ContactSection() {
    return (
        <div className='container h-auto xl:px-28 mx-auto'>
            <div>
                <div className='pb-14'>
                    <motion.h2 
                        initial="initial"
                        whileInView={"animate"}
                        variants={titleVariants}
                        className='font-bold text-3xl sm:text-4xl'>
                        Customer Reviews
                    </motion.h2>
                    <motion.p 
                        initial="initial"
                        whileInView={"animate"}
                        variants={desVariants}
                        className='text-muted-foreground text-lg'>
                        Learn how to grow your business with our expert advice.
                    </motion.p>
                </div>
                <motion.div 
                initial="initial"
                whileInView={"animate"}
                variants={tagVariants}
                className='grid lg:grid-cols-3 grid-cols-1 gap-x-8 gap-y-14 py-14 border-b-2 border-t-2 '>
                    {
                        posts.map((post)=>(
                            <div key={post.id} className='max-w-xl'>
                                <div className='flex gap-3'>
                                    <Image src='/images/star.svg' alt='stars' width={80} height={5}/>
                                    <span className='bg-primary px-3 py-1.5 rounded-2xl text-white text-xs hover:bg-gray-100 cursor-pointer hover:text-black transition-all'>{post.category.title}</span>
                                </div>
                                <div className='group'>
                                    <p className='font-bold my-3 text-lg group-hover:text-gray-600 transition-all'>{post.title}</p>
                                    <p className='text-sm line-clamp-3 leading-6 text-muted-foreground'>{post.description}</p>
                                </div>
                                <div className='flex gap-4 items-center mt-8 '>
                                    <Image src={post.author.imageUrl} alt='profile pic' width={40} height={40} className='rounded-full bg-gray-500'/>
                                    <div className='text-sm font-semibold'>
                                        <p>{post.author.name}</p>
                                        <p className='text-muted-foreground'>{post.author.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    )
}
