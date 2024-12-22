import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Bookmark, ChefHat, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";

interface RecipeCardProps {
  imageUrl?: string;
  title?: string;
  chef?: string;
  cookTime?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  rating?: number;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onClick?: () => void;
}

const RecipeCard = ({
  imageUrl = "https://dummyimage.com/280x160/f4f4f4/666666&text=Recipe+Image",
  title = "Classic Italian Pasta",
  chef = "Chef Maria",
  cookTime = "30 mins",
  difficulty = "Medium",
  rating = 4.5,
  isBookmarked = false,
  onBookmark = () => {},
  onClick = () => {},
}: RecipeCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const { user } = useAuth();

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    onBookmark();
  };

  return (
    <Card
      className="w-[280px] h-[320px] overflow-hidden bg-white transition-all duration-300 cursor-pointer relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleBookmark}
        >
          <Bookmark
            className={`h-5 w-5 ${isBookmarked ? "fill-primary" : ""}`}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <ChefHat className="h-4 w-4" />
          <span>{chef}</span>
        </div>

        <div
          className={`flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-100 lg:opacity-0"
          }`}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{cookTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                difficulty,
              )}`}
            >
              {difficulty}
            </span>
          </div>
        </div>
      </CardContent>

      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </Card>
  );
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Hard":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default RecipeCard;
