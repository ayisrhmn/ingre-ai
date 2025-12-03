export const INGREDIENT_DETECTION_PROMPT = `Analyze this image and detect all food ingredients visible. 
Return ONLY a valid JSON array in this exact format, with no additional text or markdown:
[
  {"name": "Ingredient Name", "confidence": 0.95},
  {"name": "Another Ingredient", "confidence": 0.88}
]

Rules:
- Only return the JSON array, nothing else
- confidence should be between 0 and 1
- Only include actual food ingredients you can clearly see
- Be specific with ingredient names`;

export const RECIPE_GENERATION_PROMPT = (
  ingredients: string[],
) => `Based on these ingredients: ${ingredients.join(", ")}

Generate 3 recipe suggestions. Return ONLY a valid JSON array in this exact format, with no additional text or markdown:
[
  {
    "title": "Recipe Name",
    "description": "Brief description of the dish",
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 4,
    "difficulty": "Easy",
    "matchPercentage": 95,
    "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
    "instructions": ["Step 1", "Step 2", "Step 3"]
  }
]

Rules:
- Return ONLY the JSON array, nothing else
- difficulty must be one of: "Easy", "Medium", "Hard"
- matchPercentage should reflect how well the recipe uses the available ingredients (0-100)
- Include quantities in the ingredients list
- Provide detailed step-by-step instructions
- Make recipes realistic and practical`;
