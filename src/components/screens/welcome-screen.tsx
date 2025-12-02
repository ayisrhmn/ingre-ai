"use client";

import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-linear-to-b from-background to-muted/20">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <ChefHat className="w-24 h-24 text-primary relative animate-bounce-in" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            IngreAI
          </h1>
          <p className="text-lg text-muted-foreground">Ingredients Intelligence</p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-xl text-foreground/90 font-medium">
            Scan your ingredients and get smart recipe suggestions instantly
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            onClick={onStart}
            className="w-full max-w-xs text-lg h-14 shadow-lg hover:shadow-xl transition-all"
          >
            Start Scanning
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-8 text-sm text-muted-foreground">
          <div className="space-y-1">
            <div className="text-2xl">📸</div>
            <div>Scan</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">🤖</div>
            <div>AI Detect</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">🍳</div>
            <div>Get Recipes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
