import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselSlide from "./CarouselSlide";

interface HeroCarouselProps {
  slides?: Array<{
    imageUrl: string;
    title: string;
    description: string;
    type: "recipe" | "class";
    duration: string;
    ctaLabel: string;
    onCtaClick: () => void;
  }>;
}

const HeroCarousel = ({
  slides = [
    {
      imageUrl:
        "https://dummyimage.com/1512x500/f4f4f4/666666&text=Italian+Cooking",
      title: "Master Italian Cuisine",
      description:
        "Join our expert chefs for an immersive Italian cooking experience",
      type: "class",
      duration: "3 hours",
      ctaLabel: "Join Class",
      onCtaClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/1512x500/f4f4f4/666666&text=Sushi+Making",
      title: "Authentic Sushi Making",
      description:
        "Learn the art of sushi making from traditional Japanese chefs",
      type: "class",
      duration: "2.5 hours",
      ctaLabel: "Join Class",
      onCtaClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/1512x500/f4f4f4/666666&text=French+Pastries",
      title: "Classic French Pastries",
      description: "Discover the secrets of French pastry making",
      type: "recipe",
      duration: "45 minutes",
      ctaLabel: "View Recipe",
      onCtaClick: () => {},
    },
  ],
}: HeroCarouselProps) => {
  return (
    <div className="relative w-full h-[500px] bg-slate-100">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <CarouselSlide {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
