import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const buttonStyles =
    "bg-[#10B5B5] hover:bg-[#10B5B5]/90 text-white rounded-full px-6 py-2 transition-colors duration-300";

  const links = [
    { to: "/", label: "Início" },
    { to: "/quem-somos", label: "Quem somos" },
    { to: "/projetos-sociais", label: "Projetos sociais" },
    { to: "/atividades-doutrinarias", label: "Atividades doutrinárias" },
    { to: "/galeria", label: "Galeria" },
    { to: "/contato", label: "Contato" },
    { to: "/doacoes", label: "Doações" },
  ];

  return (
    <header className="bg-white w-full z-50 shadow-sm">
      <div className="mx-auto flex h-20 max-w-[1366px] items-center px-4 relative">
        <Link to="/" className="flex items-center z-10">
          <img
            src="https://res.cloudinary.com/dggewyuon/image/upload/v1739215911/lardemaria-logo_uiyipm.png"
            alt="Lar de Maria"
            className="w-[106.14px] h-[57px]"
          />
        </Link>

        <div className="flex-grow"></div>

        <div className="flex items-center gap-8">
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
              "fixed inset-0 bg-white/95 backdrop-blur-sm lg:bg-transparent lg:static transition-all duration-300 ease-in-out z-40",
              isOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible lg:opacity-100 lg:visible"
            )}
          >
            <ul
              className={cn(
                "flex flex-col items-center justify-center h-full space-y-8 lg:flex-row lg:space-y-0 lg:space-x-6",
                isOpen ? "flex" : "hidden lg:flex"
              )}
            >
              {links.map((item) => {
                const isActive =
                  location.pathname === item.to ||
                  (location.pathname === "/" && item.to === "/") ||
                  (location.pathname !== "/" &&
                    item.to !== "/" &&
                    location.pathname.startsWith(item.to));

                return (
                  <li key={item.to} className="relative group">
                    <Link
                      to={item.to}
                      className={cn(
                        "text-gray-800 hover:text-[#10a3b4] transition-colors duration-300",
                        isActive && "text-[#10a3b4] font-medium"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[#10a3b4] transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    ></span>
                  </li>
                );
              })}
              <li className="block lg:hidden">
                <Link
                  to="/doacoes"
                  className={buttonStyles}
                  onClick={() => setIsOpen(false)}
                >
                  Quero Ajudar
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Link to="/doaragora" className={buttonStyles}>
              Quero Ajudar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
