import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  src: string;
}

export function Image({
  fill,
  priority,
  sizes,
  className,
  src,
  ...props
}: ImageProps) {
  // Otimização básica: usar srcset para diferentes tamanhos
  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet={`${src}?w=1920&format=webp`}
      />
      <source media="(min-width: 768px)" srcSet={`${src}?w=1280&format=webp`} />
      <img
        {...props}
        src={`${src}?w=640&format=webp`}
        className={`${className} ${
          fill ? "absolute inset-0 w-full h-full" : ""
        }`}
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
