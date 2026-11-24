"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from './ui/button'

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <Button onClick={() => { theme === 'dark' ? setTheme('light') : setTheme('dark') }} className="w-10 h-10 rounded-full">
                <SunIcon className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
        </div>
    )
}
