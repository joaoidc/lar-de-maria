import { Image } from "./ui/Image";

export function Banner() {
  return (
    <section className="relative w-full h-screen md:h-[500px] overflow-hidden">
      <Image
        src="https://res.cloudinary.com/dggewyuon/image/upload/v1740509131/1_tfgz02.png"
        alt="banner"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20">
        <div className="container h-full mx-auto flex items-center">
          <div className="w-full flex justify-center md:justify-end px-4">
            <h1 className="font-['Open_Sans'] text-white text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-[56px] leading-tight [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000,_3px_3px_5px_rgba(0,0,0,0.5)] font-extrabold w-full max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[750px] text-center md:text-right">
              Há 77 anos trabalhando pela promoção humana de crianças, jovens,
              idosos e suas famílias.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
