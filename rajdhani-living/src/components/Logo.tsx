import * as React from "react"
import Link from 'next/link';
import Image from 'next/image'
import logo from '../../public/images/logo.png'

const Logo = () => {
    return(
        <Link href='/'>
            <h2 className=" font-bold text-xl">Rajdhani Group</h2>
        </Link>
    )
}

export default Logo;