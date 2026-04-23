import Scrollytelling from "@/components/Scrollytelling";
import Showreel from "@/components/Showreel";
import Capabilities from "@/components/Capabilities";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#541D40]">
      <Scrollytelling />
      <Capabilities />
      <Showreel />
    </main>
  );
}