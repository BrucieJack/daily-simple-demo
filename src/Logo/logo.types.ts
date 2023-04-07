import { ImageProps } from "next/image";

export interface LogoProps extends ImageProps {
  className?: string;
  href?: string;
}
