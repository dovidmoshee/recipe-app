import React from "react";
import RecipeCard from "./RecipeCard";

interface TrendingRecipesProps {
  recipes?: Array<{
    imageUrl: string;
    title: string;
    chef: string;
    cookTime: string;
    difficulty: "Easy" | "Medium" | "Hard";
    rating: number;
    isBookmarked: boolean;
    onBookmark: () => void;
    onClick: () => void;
  }>;
}

const TrendingRecipes = ({
  recipes = [
    {
      imageUrl:
        "https://dummyimage.com/280x160/f4f4f4/666666&text=Italian+Pasta",
      title: "Homemade Italian Pasta",
      chef: "Chef Marco",
      cookTime: "45 mins",
      difficulty: "Medium",
      rating: 4.8,
      isBookmarked: false,
      onBookmark: () => {},
      onClick: () => {},
    },
    {
      imageUrl: "https://dummyimage.com/280x160/f4f4f4/666666&text=Sushi+Rolls",
      title: "Traditional Sushi Rolls",
      chef: "Chef Yuki",
      cookTime: "60 mins",
      difficulty: "Hard",
      rating: 4.9,
      isBookmarked: true,
      onBookmark: () => {},
      onClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/280x160/f4f4f4/666666&text=French+Croissants",
      title: "Classic French Croissants",
      chef: "Chef Pierre",
      cookTime: "120 mins",
      difficulty: "Hard",
      rating: 4.7,
      isBookmarked: false,
      onBookmark: () => {},
      onClick: () => {},
    },
    {
      imageUrl: "https://dummyimage.com/280x160/f4f4f4/666666&text=Greek+Salad",
      title: "Mediterranean Greek Salad",
      chef: "Chef Elena",
      cookTime: "15 mins",
      difficulty: "Easy",
      rating: 4.5,
      isBookmarked: false,
      onBookmark: () => {},
      onClick: () => {},
    },
    {
      imageUrl: "https://dummyimage.com/280x160/f4f4f4/666666&text=Thai+Curry",
      title: "Spicy Thai Green Curry",
      chef: "Chef Somchai",
      cookTime: "40 mins",
      difficulty: "Medium",
      rating: 4.6,
      isBookmarked: false,
      onBookmark: () => {},
      onClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/280x160/f4f4f4/666666&text=Mexican+Tacos",
      title: "Authentic Street Tacos",
      chef: "Chef Carlos",
      cookTime: "30 mins",
      difficulty: "Medium",
      rating: 4.7,
      isBookmarked: false,
      onBookmark: () => {},
      onClick: () => {},
    },
  ],
}: TrendingRecipesProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-slate-50 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Trending Recipes</h2>
        <p className="text-muted-foreground">
          Discover our most popular recipes from around the world
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipes;
