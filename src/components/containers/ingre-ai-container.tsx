"use client";

import { useState } from "react";
import { CameraScreen } from "../screens/camera-screen";
import { ConfirmationScreen } from "../screens/confirmation-screen";
import { LoadingScreen } from "../screens/loading-screen";
import { RecipeScreen } from "../screens/recipe-screen";
import { WelcomeScreen } from "../screens/welcome-screen";
import { SimulationBadge } from "../ui/simulation-badge";
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

// Mock data generator
const generateMockDetectedItems = (): DetectedItem[] => {
  const ingredients = [
    { name: "Tomatoes", confidence: 0.95 },
    { name: "Onions", confidence: 0.92 },
    { name: "Garlic", confidence: 0.88 },
    { name: "Chicken Breast", confidence: 0.91 },
    { name: "Bell Peppers", confidence: 0.87 },
    { name: "Olive Oil", confidence: 0.84 },
  ];

  return ingredients.map((item, idx) => ({
    id: `item-${idx}`,
    name: item.name,
    confidence: item.confidence,
    selected: true,
  }));
};

const generateMockRecipes = (ingredients: string[]): Recipe[] => {
  return [
    {
      id: "recipe-1",
      title: "Mediterranean Chicken Skillet",
      description:
        "A quick and healthy one-pan dish with tender chicken, fresh vegetables, and aromatic herbs. Perfect for a weeknight dinner.",
      prepTime: "15 min",
      cookTime: "25 min",
      servings: 4,
      difficulty: "Easy",
      matchPercentage: 95,
      ingredients: [
        "4 chicken breasts",
        "3 large tomatoes, diced",
        "2 bell peppers, sliced",
        "1 large onion, chopped",
        "4 cloves garlic, minced",
        "3 tbsp olive oil",
        "1 tsp oregano",
        "Salt and pepper to taste",
        "Fresh basil for garnish",
      ],
      instructions: [
        "Heat olive oil in a large skillet over medium-high heat.",
        "Season chicken breasts with salt and pepper, then cook for 6-7 minutes per side until golden brown. Remove and set aside.",
        "In the same skillet, sauté onions and garlic until fragrant, about 2 minutes.",
        "Add bell peppers and cook for 3-4 minutes until slightly softened.",
        "Add diced tomatoes and oregano, cook for 5 minutes until tomatoes break down.",
        "Return chicken to the skillet, nestling it into the vegetables.",
        "Cover and simmer for 10 minutes until chicken is cooked through.",
        "Garnish with fresh basil and serve hot with rice or crusty bread.",
      ],
    },
    {
      id: "recipe-2",
      title: "Roasted Vegetable Chicken",
      description:
        "Juicy roasted chicken with colorful vegetables, infused with garlic and herbs. A wholesome meal that's both nutritious and delicious.",
      prepTime: "20 min",
      cookTime: "45 min",
      servings: 4,
      difficulty: "Medium",
      matchPercentage: 88,
      ingredients: [
        "4 chicken thighs",
        "2 bell peppers, cut into chunks",
        "3 tomatoes, quartered",
        "1 large onion, cut into wedges",
        "6 cloves garlic, whole",
        "4 tbsp olive oil",
        "2 tsp paprika",
        "1 tsp thyme",
        "Salt and pepper to taste",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C).",
        "In a large roasting pan, combine all vegetables and garlic.",
        "Drizzle with half the olive oil, season with salt and pepper, and toss to coat.",
        "Season chicken with paprika, thyme, salt, and pepper.",
        "Place chicken pieces on top of vegetables, drizzle with remaining olive oil.",
        "Roast for 40-45 minutes until chicken is golden and vegetables are caramelized.",
        "Let rest for 5 minutes before serving.",
        "Serve with quinoa or roasted potatoes.",
      ],
    },
    {
      id: "recipe-3",
      title: "Quick Chicken Stir-Fry",
      description:
        "A fast and flavorful stir-fry packed with protein and vegetables. Great for busy evenings when you need something quick but tasty.",
      prepTime: "10 min",
      cookTime: "15 min",
      servings: 3,
      difficulty: "Easy",
      matchPercentage: 82,
      ingredients: [
        "3 chicken breasts, sliced thin",
        "2 bell peppers, sliced",
        "2 tomatoes, diced",
        "1 onion, sliced",
        "3 cloves garlic, minced",
        "3 tbsp olive oil",
        "2 tbsp soy sauce",
        "1 tsp ginger, grated",
        "Sesame seeds for garnish",
      ],
      instructions: [
        "Heat olive oil in a large wok or skillet over high heat.",
        "Add chicken slices and stir-fry for 5-6 minutes until cooked through. Remove and set aside.",
        "In the same pan, add onions and garlic, stir-fry for 1 minute.",
        "Add bell peppers and cook for 3 minutes, stirring constantly.",
        "Add tomatoes and ginger, cook for 2 minutes.",
        "Return chicken to the pan, add soy sauce, and toss everything together.",
        "Cook for another 2 minutes until everything is well combined.",
        "Garnish with sesame seeds and serve over rice or noodles.",
      ],
    },
  ];
};

export function IngreAIContainer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Navigation handlers
  const handleStartScanning = () => {
    setCurrentScreen("camera");
  };

  const handleCameraCapture = (imageData: string) => {
    setCapturedImage(imageData);
    // Simulate AI detection
    const mockItems = generateMockDetectedItems();
    setDetectedItems(mockItems);
    setCurrentScreen("confirmation");
  };

  const handleConfirmIngredients = (items: DetectedItem[]) => {
    const ingredients = items.map((item) => item.name);
    setSelectedIngredients(ingredients);
    setCurrentScreen("loading");

    // Simulate recipe generation (3 seconds)
    setTimeout(() => {
      const mockRecipes = generateMockRecipes(ingredients);
      setRecipes(mockRecipes);
      setCurrentScreen("recipe");
    }, 3000);
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

      {/* Simulation Badge - Show on all screens */}
      <SimulationBadge />
    </main>
  );
}
