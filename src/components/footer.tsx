import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

export function Footer() {
  return (
    <footer>
      {/* Conteúdo Principal */}
      <div className="bg-[#F8F9FA] text-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-start justify-between">
            {/* Coluna 1: Logo e Descrição */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 max-w-xs mx-auto md:mx-0 w-full">
              <Link to="/" className="flex-shrink-0">
                <img
                  src="https://res.cloudinary.com/dggewyuon/image/upload/v1739215911/lardemaria-logo_uiyipm.png"
                  alt="Lar de Maria"
                  className="h-16 md:h-20 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed text-center md:text-left">
                <span className="text-[#10B5B5] font-medium">Desde 1948</span>{" "}
                dedicamos nossa missão à promoção do amor e cuidado,
                transformando vidas através do acolhimento de crianças, jovens,
                idosos e suas famílias.
              </p>
            </div>

            {/* Coluna 2: Informações de Contato */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full max-w-xs mx-auto md:mx-0">
              <h3 className="text-gray-900 font-semibold text-base md:text-lg">
                Contato
              </h3>
              <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
                <div className="flex items-start gap-2 md:gap-3 text-gray-800 group">
                  <MapPin
                    size={18}
                    className="text-[#10B5B5] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">
                      Av. Alm. Barroso, 33 - São Brás
                    </p>
                    <p className="text-gray-600">Belém - PA, 66093-020</p>
                  </div>
                </div>
                <a
                  href="tel:+559132262953"
                  className="flex items-center gap-3 text-gray-800 hover:text-[#10B5B5] transition-colors group"
                >
                  <Phone
                    size={20}
                    className="text-[#10B5B5] flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <p className="font-medium">(91) 3226-2953</p>
                </a>
                <a
                  href="mailto:contato@lardemaria.org.br"
                  className="flex items-center gap-3 text-gray-800 hover:text-[#10B5B5] transition-colors group"
                >
                  <Mail
                    size={20}
                    className="text-[#10B5B5] flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <p className="font-medium">contato@lardemaria.org.br</p>
                </a>
                <a
                  href="https://wa.me/5591322629530"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-800 hover:text-[#25D366] transition-colors group"
                >
                  <MessageCircle
                    size={20}
                    className="text-[#25D366] flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium">Fale conosco no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Coluna 3: Redes Sociais */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full max-w-xs mx-auto md:mx-0">
              <h3 className="text-gray-900 font-semibold text-base md:text-lg">
                Redes Sociais
              </h3>
              {/* Layout diferente para mobile e desktop */}
              <div className="flex md:flex-col items-center md:items-start gap-6 md:gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:gap-3 text-gray-800 hover:text-[#1877F2] transition-colors group"
                >
                  <Facebook
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="hidden md:inline">Facebook</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:gap-3 text-gray-800 hover:text-[#0A66C2] transition-colors group"
                >
                  <Linkedin
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="hidden md:inline">LinkedIn</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:gap-3 text-gray-800 hover:text-[#E4405F] transition-colors group"
                >
                  <Instagram
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="hidden md:inline">Instagram</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center md:gap-3 text-gray-800 hover:text-[#FF0000] transition-colors group"
                >
                  <Youtube
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="hidden md:inline">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright mais compacto no mobile */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex flex-col items-center gap-1">
            <p className="text-center text-xs md:text-sm">
              © 2025 - Todos os direitos reservados
            </p>
            <p className="text-[10px] md:text-xs text-gray-400">
              Desenvolvido por{" "}
              <a
                href="https://www.landeev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#10B5B5] transition-colors"
              >
                Lanna
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
