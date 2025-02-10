import Image from "next/image";

export function Banner() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lar_de_Maria-kPAAuJPpvkDdQXdZK8f8wf9K8uu96I.png"
        alt="person banner"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="max-w-[750px] px-4 mr-4">
          <h1 className="font-playfair text-right text-[#10a3b4] text-4xl md:text-5xl lg:text-[56px] leading-tight">
            Há 76 anos trabalhando pela promoção humana de crianças, jovens,
            idosos e suas famílias.
          </h1>
        </div>
      </div>
    </section>
  );
}
