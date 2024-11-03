import "@/styles/globals.css";
import { AppProps } from "next/app.js";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
