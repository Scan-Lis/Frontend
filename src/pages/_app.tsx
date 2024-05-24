import SessionAuthProvider from "@/context/SessionAuthProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Urbanist } from "next/font/google";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${urbanist.className} w-full h-full`}>
      <SessionAuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionAuthProvider>
    </main>
  );
}
