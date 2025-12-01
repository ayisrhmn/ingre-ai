import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl w-full">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">IngreAI</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-pretty">
            Under Development!
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" asChild>
              <a href="#">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
