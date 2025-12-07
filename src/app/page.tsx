import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { CardSlider } from "@/app/components/CardSlider";

export default function Home() {
  return (
    <main className="bg-sand text-ink">
      <Navbar />
      <Hero />
      <CardSlider />
    </main>
  );
}
