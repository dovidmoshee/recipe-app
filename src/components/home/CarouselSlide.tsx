import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

interface CarouselSlideProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  type?: "recipe" | "class";
  duration?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const CarouselSlide = ({
  imageUrl = "https://dummyimage.com/1512x500/f4f4f4/666666&text=Featured+Content",
  title = "Delicious Italian Pasta Making",
  description = "Learn the art of handmade pasta from our expert chefs",
  type = "class",
  duration = "2 hours",
  ctaLabel = "Join Class",
  onCtaClick = () => {},
}: CarouselSlideProps) => {
  return (
    <div className="relative w-full h-[500px] bg-slate-100">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium uppercase tracking-wider">
              {type}
            </span>
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{duration}</span>
              </div>
            )}
          </div>
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg mb-6 max-w-2xl">{description}</p>
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            {ctaLabel}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
