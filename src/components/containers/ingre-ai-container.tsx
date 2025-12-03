"use client";

import { INGREDIENT_DETECTION_PROMPT, RECIPE_GENERATION_PROMPT } from "@/lib/constants";
import { useState } from "react";
import { CameraScreen } from "../screens/camera-screen";
import { ConfirmationScreen } from "../screens/confirmation-screen";
import { LoadingScreen } from "../screens/loading-screen";
import { RecipeScreen } from "../screens/recipe-screen";
import { WelcomeScreen } from "../screens/welcome-screen";
import { ThemeToggle } from "../ui/theme-toggle";

type Screen = "welcome" | "camera" | "confirmation" | "loading" | "recipe";

interface DetectedItem {
  id: string;
  name: string;
  confidence: number;
  selected: boolean;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  matchPercentage: number;
}

export function IngreAIContainer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Helper function to handle API responses
  const handleApiResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 429) {
        throw new Error("Rate limit exceeded (429). Please wait before trying again.");
      }

      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    return response;
  };

  // Navigation handlers
  const handleStartScanning = () => {
    setCurrentScreen("camera");
  };

  const handleCameraCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    setCurrentScreen("loading");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: INGREDIENT_DETECTION_PROMPT,
          image: imageData,
        }),
      });

      await handleApiResponse(response);

      // Read the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value, { stream: true });
        }
      }

      // Parse the JSON response
      const cleanedResult = result
        .trim()
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");
      const detectedIngredients = JSON.parse(cleanedResult);

      // Convert to DetectedItem format
      const items: DetectedItem[] = detectedIngredients.map(
        (item: { name: string; confidence: number }, idx: number) => ({
          id: `item-${idx}`,
          name: item.name,
          confidence: item.confidence,
          selected: true,
        }),
      );

      setDetectedItems(items);
      setCurrentScreen("confirmation");
    } catch (error: any) {
      console.error("Error detecting ingredients:", error);

      // Check if it's a rate limit error
      if (error.message && error.message.includes("429")) {
        alert("Too many requests. Please wait a moment before trying again.");
      } else {
        alert("Failed to detect ingredients. Please try again.");
      }

      setCurrentScreen("camera");
    }
  };

  const handleConfirmIngredients = async (items: DetectedItem[]) => {
    const ingredients = items.map((item) => item.name);
    setSelectedIngredients(ingredients);
    setCurrentScreen("loading");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: RECIPE_GENERATION_PROMPT(ingredients),
        }),
      });

      await handleApiResponse(response);

      // Read the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value, { stream: true });
        }
      }

      // Parse the JSON response
      const cleanedResult = result
        .trim()
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");
      const generatedRecipes = JSON.parse(cleanedResult);

      // Add IDs to recipes
      const recipesWithIds: Recipe[] = generatedRecipes.map(
        (recipe: Omit<Recipe, "id">, idx: number) => ({
          ...recipe,
          id: `recipe-${idx}`,
        }),
      );

      setRecipes(recipesWithIds);
      setCurrentScreen("recipe");
    } catch (error: any) {
      console.error("Error generating recipes:", error);

      // Check if it's a rate limit error
      if (error.message && error.message.includes("429")) {
        alert("Too many requests. Please wait a moment before trying again.");
      } else {
        alert("Failed to generate recipes. Please try again.");
      }

      setCurrentScreen("confirmation");
    }
  };

  const handleRetake = () => {
    setCurrentScreen("camera");
  };

  const handleStartOver = () => {
    setCapturedImage("");
    setDetectedItems([]);
    setSelectedIngredients([]);
    setRecipes([]);
    setCurrentScreen("welcome");
  };

  const handleBackFromCamera = () => {
    setCurrentScreen("welcome");
  };

  const handleBackFromRecipe = () => {
    setCurrentScreen("confirmation");
  };

  return (
    <main className="relative w-full min-h-screen">
      {/* Screen Router */}
      {currentScreen === "welcome" && (
        <>
          {/* Theme Toggle - Always visible */}
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>
          <WelcomeScreen onStart={handleStartScanning} />
        </>
      )}

      {currentScreen === "camera" && (
        <CameraScreen onCapture={handleCameraCapture} onBack={handleBackFromCamera} />
      )}

      {currentScreen === "confirmation" && (
        <ConfirmationScreen
          imageData={capturedImage}
          detectedItems={detectedItems}
          onConfirm={handleConfirmIngredients}
          onRetake={handleRetake}
        />
      )}

      {currentScreen === "loading" && <LoadingScreen ingredients={selectedIngredients} />}

      {currentScreen === "recipe" && (
        <RecipeScreen
          recipes={recipes}
          usedIngredients={selectedIngredients}
          onStartOver={handleStartOver}
          onBack={handleBackFromRecipe}
        />
      )}
    </main>
  );
}
