"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonStyles =
    "bg-[#10B5B5] hover:bg-[#10B5B5]/90 text-white rounded-full px-6 py-2 transition-colors duration-300";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1366px] items-center justify-between px-4">
        <Link href="/" className="flex items-center z-10">
          <Image
            src="https://res.cloudinary.com/dggewyuon/image/upload/v1739205706/lardemaria-logo_dpio1d.png"
            alt="Lar de Maria"
            width={106}
            height={57}
            className="w-[106.14px] h-[57px]"
          />
        </Link>

        <button
          className="z-50 block lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-6 h-0.5 bg-gray-600 transition-all duration-300",
              isOpen && "rotate-45 translate-y-1.5"
            )}
          ></span>
          <span
            className={cn(
              "block w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300",
              isOpen && "opacity-0"
            )}
          ></span>
          <span
            className={cn(
              "block w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300",
              isOpen && "-rotate-45 -translate-y-1.5"
            )}
          ></span>
        </button>

        <nav
          className={cn(
            "fixed inset-0 bg-white lg:bg-transparent lg:static transition-all duration-300 ease-in-out z-40",
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible lg:opacity-100 lg:visible"
          )}
        >
          <ul
            className={cn(
              "flex flex-col items-center justify-center h-full space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8",
              isOpen ? "flex" : "hidden lg:flex"
            )}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/quem-somos", label: "Quem somos" },
              { href: "/projetos-sociais", label: "Projetos sociais" },
              {
                href: "/atividades-doutrinárias",
                label: "Atividades doutrinárias",
              },
              { href: "/contato", label: "Contato" },
              { href: "/seja-um-apoiador", label: "Seja um apoiador" },
            ].map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-[#10a3b4] transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#10a3b4] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
            <li className="block lg:hidden">
              <Link
                href="/quero-ajudar"
                className={buttonStyles}
                onClick={() => setIsOpen(false)}
              >
                Quero Ajudar
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop-only button */}
        <div className="hidden lg:block">
          <Link href="/quero-ajudar" className={buttonStyles}>
            Quero Ajudar
          </Link>
        </div>
      </div>
    </header>
  );
}
