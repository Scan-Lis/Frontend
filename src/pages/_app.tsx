import SessionAuthProvider from "@/context/SessionAuthProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Urbanist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${urbanist.className} w-full h-full`}>
        <SessionAuthProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </SessionAuthProvider>
      </main>
    </QueryClientProvider>
  );
}
