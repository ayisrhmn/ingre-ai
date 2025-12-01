import { Hero } from "@/components/sections/hero";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  );
}
