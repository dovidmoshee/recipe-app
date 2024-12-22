import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ClassCard from "./ClassCard";

interface CookingClassesRowProps {
  classes?: Array<{
    imageUrl: string;
    title: string;
    instructor: string;
    dateTime: string;
    duration: string;
    price: number;
    spotsLeft: number;
    onClick: () => void;
  }>;
}

const CookingClassesRow = ({
  classes = [
    {
      imageUrl:
        "https://dummyimage.com/320x180/f4f4f4/666666&text=Italian+Cooking",
      title: "Italian Pasta Masterclass",
      instructor: "Chef Marco",
      dateTime: "Sat, Mar 15 - 2:00 PM",
      duration: "2.5 hours",
      price: 89.99,
      spotsLeft: 5,
      onClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/320x180/f4f4f4/666666&text=Sushi+Making",
      title: "Sushi Making Workshop",
      instructor: "Chef Yuki",
      dateTime: "Sun, Mar 16 - 3:00 PM",
      duration: "3 hours",
      price: 129.99,
      spotsLeft: 3,
      onClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/320x180/f4f4f4/666666&text=French+Pastry",
      title: "French Pastry Basics",
      instructor: "Chef Pierre",
      dateTime: "Mon, Mar 17 - 10:00 AM",
      duration: "4 hours",
      price: 149.99,
      spotsLeft: 8,
      onClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/320x180/f4f4f4/666666&text=Thai+Cuisine",
      title: "Thai Street Food",
      instructor: "Chef Somchai",
      dateTime: "Tue, Mar 18 - 5:00 PM",
      duration: "2 hours",
      price: 79.99,
      spotsLeft: 6,
      onClick: () => {},
    },
    {
      imageUrl:
        "https://dummyimage.com/320x180/f4f4f4/666666&text=Mexican+Tacos",
      title: "Authentic Taco Making",
      instructor: "Chef Carlos",
      dateTime: "Wed, Mar 19 - 6:00 PM",
      duration: "2.5 hours",
      price: 89.99,
      spotsLeft: 4,
      onClick: () => {},
    },
  ],
}: CookingClassesRowProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-slate-50 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Upcoming Cooking Classes</h2>
        <p className="text-muted-foreground">
          Learn from expert chefs in live, interactive cooking sessions
        </p>
      </div>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {classes.map((classItem, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ClassCard {...classItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 bg-white" />
        <CarouselNext className="-right-12 bg-white" />
      </Carousel>
    </div>
  );
};

export default CookingClassesRow;
