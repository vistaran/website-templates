"use client"
import React from 'react'
import useScrollProcess from '../hooks/useScrollProcess'
import {motion} from 'framer-motion'

const variant = {
    hidden:{opacity: 0},
    visible:{opacity: 1},
}
const Template = ({children}: {children: React.ReactNode}) => {
    const ScrollProcess = useScrollProcess() 
    return (
        <>
            <motion.main
                variants ={variant}
                initial ='hidden'
                animate ='visible'
                transition={{type: 'linear', delay: 0.2, duration: 0.4 }}
            >
                {children}
            </motion.main>
            <div className={`fixed z-[100] right-0 top-0 bottom-0 w-1 bg-primary transition-all duration-700`} style={{height: `${ScrollProcess}%`}}></div>
        </>
    )
}

export default Template;