import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function Home() {
  return (
    <main className={`${urbanist.className}`}>
      <h1>Scan-Lis</h1>
    </main>
  );
}
