import Image from "next/image";
import Link from "next/link";
import { LogoProps } from "./logo.types";

const Logo = ({ className, href = "", width, height, src, alt }: LogoProps) => {
  return (
    <div className={className}>
      <Link href={href}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </Link>
    </div>
  );
};

export default Logo;
