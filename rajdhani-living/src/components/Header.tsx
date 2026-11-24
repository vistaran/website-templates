"use client";
import React, { useState, useEffect } from "react";

import ThemeToggler from "./ThemeToggler";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import MobileNavigation from "../components/MobileNavigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const [yScroll, setYScroll] = useState(0);
  const [currentPath, setCurrentPath] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setYScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        yScroll > 50
          ? "shadow-lg py-3 bg-background/80 backdrop-blur-lg border-b border-border/50 text-foreground"
          : "py-5 bg-transparent"
      } ${
        currentPath !== "/" && yScroll <= 50 ? "text-foreground" : yScroll <= 50 ? "text-white" : ""
      }`}
    >
      <div className="container mx-auto xl:px-20">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-x-8 items-center">
            <Nav
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="text-sm font-medium uppercase relative tracking-widest hover:text-primary transition-colors duration-300"
              underLineStyle="absolute left-0 h-[2px] top-[120%] w-full bg-primary"
            />
            <ThemeToggler />
            <div className="xl:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
