import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "./globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
