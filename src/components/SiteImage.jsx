import Image from "next/image";
import dimensions from "../data/image-sizes.json";
export default function SiteImage({
  src,
  alt,
  sizes = "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw",
  ...props
}) {
  const size = dimensions[src];
  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      sizes={sizes}
      {...props}
    />
  );
}
