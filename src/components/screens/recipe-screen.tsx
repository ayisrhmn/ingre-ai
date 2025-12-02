"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Flame, Users, X } from "lucide-react";
import { useState } from "react";

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

interface RecipeScreenProps {
  recipes: Recipe[];
  usedIngredients: string[];
  onStartOver: () => void;
  onBack: () => void;
}

export function RecipeScreen({ recipes, usedIngredients, onStartOver, onBack }: RecipeScreenProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Recipe List View
  if (!selectedRecipe) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b shadow-sm">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <X className="w-5 h-5" />
              </Button>
              <h2 className="font-semibold">Recipe Suggestions</h2>
              <div>&nbsp;</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Based on:</span>
              <div className="flex flex-wrap gap-1">
                {usedIngredients.map((ingredient, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe List */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{recipes.length} Recipes Found</h3>
            <Badge variant="default" className="gap-1">
              <Flame className="w-3 h-3" />
              AI Powered
            </Badge>
          </div>

          <div className="grid gap-4">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="px-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="default">{recipe.matchPercentage}% Match</Badge>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{recipe.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="sticky bottom-0 p-6 bg-card border-t">
          <Button onClick={onStartOver} size="lg" className="w-full">
            Scan New Ingredients
          </Button>
        </div>
      </div>
    );
  }

  // Recipe Detail View
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSelectedRecipe(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="font-semibold">Recipe Details</h2>
          <div>&nbsp;</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Title & Description */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-3xl font-bold flex-1">{selectedRecipe.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{selectedRecipe.matchPercentage}% Match</Badge>
            <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
          </div>
          <p className="text-muted-foreground">{selectedRecipe.description}</p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{selectedRecipe.prepTime}</p>
              <p className="text-muted-foreground text-xs">Prep Time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{selectedRecipe.cookTime}</p>
              <p className="text-muted-foreground text-xs">Cook Time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{selectedRecipe.servings}</p>
              <p className="text-muted-foreground text-xs">Servings</p>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <Card className="p-5 space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="text-2xl">🥗</span>
            Ingredients
          </h3>
          <ul className="space-y-2">
            {selectedRecipe.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Instructions */}
        <Card className="p-5 space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="text-2xl">👨‍🍳</span>
            Instructions
          </h3>
          <ol className="space-y-3">
            {selectedRecipe.instructions.map((instruction, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{instruction}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-6 bg-card border-t">
        <Button onClick={onStartOver} className="w-full" size="lg">
          Cook Another Recipe
        </Button>
      </div>
    </div>
  );
}
