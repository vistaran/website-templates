"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const links = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/kitchen', name: 'Kitchen' },
    { path: '/plywood', name: 'plywood' },
    { path: '/hardware', name: 'hardware' },
    { path: '/timber', name: 'timber' },
    { path: '/sthapatya-architects', name: 'Sthapatya architects' },
    // {path: '/showcase' , name: 'showcase'},
    { path: '/contact', name: 'contact' },
]

type classType = {
    containerStyles: string,
    linkStyles: string,
    underLineStyle: string,
    onLinkClick?: () => void,
}
const Nav = ({ containerStyles, linkStyles, underLineStyle, onLinkClick }: classType) => {
    const path = usePathname()
    return (
        <ul className={`${containerStyles}`}>
            {
                links.map((link, index) => (
                    <li key={index} className='transition-all'>
                        <Link href={link.path} className={`${linkStyles}`} onClick={onLinkClick}>
                            {path === link.path && (
                                <motion.span
                                    initial={{ y: '-100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ type: 'tween' }}
                                    layoutId='underline'
                                    className={`${underLineStyle}`}
                                />
                            )}
                            {link.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default Nav;