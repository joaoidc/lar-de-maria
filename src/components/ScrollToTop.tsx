import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "../lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão quando estiver próximo ao footer
      const footer = document.querySelector("footer");
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsVisible(footerPosition < windowHeight);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-4 right-4 bg-[#10B5B5] hover:bg-[#10B5B5]/90 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50",
        "transform hover:scale-110 active:scale-95",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} />
    </button>
  );
}
