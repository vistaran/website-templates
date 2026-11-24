'use client'
import React from 'react'
import Budge from './Budge'
import {titleVariants, desVariants, tagVariants } from '@/utils/animations'
import { motion } from 'framer-motion'

const CompanySection = () => {
    return (
        <div className='bg-orange-200 dark:bg-tertiary py-24 text-lg'>
            <dl className='mx-auto text-zinc-600 dark:text-white px-6 lg:px-12 grid grid-col-1 gap-x-6 gap-y-16 text-center lg:grid-cols-3'>
                <motion.div 
                    initial="initial"
                    whileInView={"animate"}
                    variants={titleVariants}
                    className='flex flex-col gap-y-4'>
                    <dt className='leading-7'>
                        Years Of Experience In The Retail Business
                    </dt>
                    <dd className='order-first font-semibold text-3xl tracking-tight sm:text-6xl lime'>
                        <Budge endCountNum={33} endCountText=' +' containerStyle=''/>
                    </dd>
                </motion.div>
                <motion.div 
                    initial="initial"
                    whileInView={"animate"}
                    variants={desVariants}
                    className='flex flex-col gap-y-4'>
                    <dt className='leading-7'>
                        Years Of Experience In Modular Kitchens Field
                    </dt>
                    <dd className='order-first font-semibold text-3xl tracking-tight sm:text-6xl lime'>
                        <Budge endCountNum={7} endCountText=' +' containerStyle=''/>
                    </dd>
                </motion.div>
                <motion.div 
                    initial="initial"
                    whileInView={"animate"}
                    variants={tagVariants}
                    className='flex flex-col gap-y-4'>
                    <dt className='leading-7'>
                        Happy Retail Customers
                    </dt>
                    <dd className='order-first font-semibold text-3xl tracking-tight sm:text-6xl lime'>
                        <Budge endCountNum={1000} endCountText=' + ' containerStyle=''/>
                    </dd>
                </motion.div>
            </dl>
        </div>
    )
}

export default CompanySection