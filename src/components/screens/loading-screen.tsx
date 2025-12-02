"use client";

import { ChefHat, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  ingredients: string[];
}

export function LoadingScreen({ ingredients }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing ingredients...",
    "Searching recipe database...",
    "Matching flavor profiles...",
    "Generating recommendations...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-linear-to-b from-background via-muted/20 to-background">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative">
            <ChefHat className="w-24 h-24 text-primary animate-bounce" />
            <Sparkles className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-spin" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">Creating Magic...</h2>
          <p className="text-muted-foreground">Our AI is crafting perfect recipes for you</p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 py-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 transition-all duration-500 ${
                index <= currentStep ? "opacity-100 translate-x-0" : "opacity-30 translate-x-4"
              }`}
            >
              {index <= currentStep ? (
                index === currentStep ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
              )}
              <p
                className={`text-left ${
                  index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Ingredients Tag */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
            <span className="text-muted-foreground">Using:</span>
            <span className="font-medium">{ingredients.join(", ")}</span>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="pt-8 text-sm text-muted-foreground italic">
          💡 Pro tip: Fresh ingredients make the best dishes!
        </div>
      </div>
    </div>
  );
}
