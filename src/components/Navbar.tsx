import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const buttonStyles =
    "bg-[#10B5B5] hover:bg-[#10B5B5]/90 text-white rounded-full px-6 py-2 transition-colors duration-300 whitespace-nowrap";

  const links = [
    { to: "/", label: "Início" },
    {
      label: "Quem somos",
      submenu: [
        { to: "/quem-somos", label: "Sobre nós" },
        { to: "/transparencia", label: "Portal de Transparência" },
      ],
    },
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
              "fixed inset-0 bg-white/95 backdrop-blur-sm lg:bg-transparent lg:static transition-all duration-300 ease-in-out z-40 w-full overflow-y-auto lg:overflow-visible",
              isOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible lg:opacity-100 lg:visible"
            )}
          >
            <ul
              className={cn(
                "min-h-screen lg:min-h-0 flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-6 px-4 lg:px-0",
                isOpen ? "flex" : "hidden lg:flex"
              )}
            >
              {links.map((item) => {
                if (item.submenu) {
                  return (
                    <li
                      key={item.label}
                      className="relative group w-full lg:w-auto text-center"
                    >
                      <div className="hidden lg:block relative">
                        <NavigationMenu>
                          <NavigationMenuList className="space-x-0">
                            <NavigationMenuItem className="relative">
                              <NavigationMenuTrigger
                                className={cn(
                                  "text-gray-800 hover:text-[#10a3b4] transition-colors duration-300 font-normal",
                                  "bg-transparent hover:bg-transparent",
                                  "data-[state=open]:bg-transparent",
                                  "data-[active]:bg-transparent",
                                  "h-auto px-0 py-0",
                                  "text-base",
                                  (location.pathname === "/quem-somos" ||
                                    location.pathname === "/transparencia") &&
                                    "text-[#10a3b4] font-medium"
                                )}
                              >
                                {item.label}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <div className="absolute left-0 top-2 w-[200px] bg-white rounded-md shadow-lg p-2">
                                  {item.submenu.map((subItem) => (
                                    <NavigationMenuLink
                                      key={subItem.to}
                                      asChild
                                      className="block"
                                    >
                                      <Link
                                        to={subItem.to}
                                        className={cn(
                                          "block w-full select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors text-gray-800 hover:text-[#10a3b4] hover:bg-gray-50",
                                          location.pathname === subItem.to &&
                                            "text-[#10a3b4] font-medium bg-gray-50"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {subItem.label}
                                      </Link>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>
                      </div>

                      {/* Mobile version */}
                      <div className="lg:hidden w-full">
                        <button
                          onClick={() =>
                            setOpenSubmenu(
                              openSubmenu === item.label ? null : item.label
                            )
                          }
                          className={cn(
                            "text-gray-800 hover:text-[#10a3b4] transition-colors duration-300 flex items-center justify-center w-full",
                            (location.pathname === "/quem-somos" ||
                              location.pathname === "/transparencia") &&
                              "text-[#10a3b4] font-medium"
                          )}
                        >
                          {item.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={cn(
                              "w-4 h-4 ml-1 transition-transform",
                              openSubmenu === item.label ? "rotate-180" : ""
                            )}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </button>
                        {openSubmenu === item.label && (
                          <ul className="mt-2 space-y-2 w-full">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.to} className="w-full">
                                <Link
                                  to={subItem.to}
                                  className={cn(
                                    "block w-full px-4 py-2 text-sm text-gray-800 hover:text-[#10a3b4] transition-colors duration-300 text-center",
                                    location.pathname === subItem.to &&
                                      "text-[#10a3b4] font-medium"
                                  )}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setOpenSubmenu(null);
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                }

                const isActive =
                  location.pathname === item.to ||
                  (location.pathname === "/" && item.to === "/") ||
                  (location.pathname !== "/" &&
                    item.to !== "/" &&
                    location.pathname.startsWith(item.to));

                return (
                  <li
                    key={item.to}
                    className="relative group w-full lg:w-auto text-center"
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "text-gray-800 hover:text-[#10a3b4] transition-colors duration-300 block w-full",
                        isActive && "text-[#10a3b4] font-medium"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[#10a3b4] transition-all duration-300 hidden lg:block",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    ></span>
                  </li>
                );
              })}
              <li className="block lg:hidden w-full text-center">
                <Link
                  to="/doaragora"
                  className={cn(buttonStyles, "inline-block w-auto")}
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
