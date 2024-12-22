import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, CalendarDays, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";

interface ClassCardProps {
  imageUrl?: string;
  title?: string;
  instructor?: string;
  dateTime?: string;
  duration?: string;
  price?: number;
  spotsLeft?: number;
  onClick?: () => void;
}

const ClassCard = ({
  imageUrl = "https://dummyimage.com/320x180/f4f4f4/666666&text=Cooking+Class",
  title = "Italian Pasta Making Masterclass",
  instructor = "Chef Antonio",
  dateTime = "Sat, Mar 15 - 2:00 PM",
  duration = "2.5 hours",
  price = 89.99,
  spotsLeft = 8,
  onClick = () => {},
}: ClassCardProps) => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    onClick();
  };

  return (
    <Card
      className="w-[320px] h-[240px] overflow-hidden bg-white cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/75 text-white px-3 py-1 rounded-full text-sm">
          ${price}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              <span>{instructor}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{dateTime}</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Users className="h-4 w-4" />
              <span>{spotsLeft} spots left</span>
            </div>
          </div>
        </div>
      </CardContent>

      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </Card>
  );
};

export default ClassCard;
