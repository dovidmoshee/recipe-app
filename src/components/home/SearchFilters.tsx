import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFiltersProps {
  dietaryRestrictions?: string[];
  selectedDietary?: string[];
  cuisineTypes?: string[];
  selectedCuisine?: string[];
  onDietaryChange?: (value: string[]) => void;
  onCuisineChange?: (value: string[]) => void;
}

const SearchFilters = ({
  dietaryRestrictions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
  ],
  selectedDietary = [],
  cuisineTypes = [
    "Italian",
    "Japanese",
    "Mexican",
    "Indian",
    "French",
    "Chinese",
  ],
  selectedCuisine = [],
  onDietaryChange = () => {},
  onCuisineChange = () => {},
}: SearchFiltersProps) => {
  return (
    <div className="flex gap-4 items-center bg-white p-2 rounded-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-between">
            Dietary Restrictions
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Dietary Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dietaryRestrictions.map((restriction) => (
            <DropdownMenuCheckboxItem
              key={restriction}
              checked={selectedDietary.includes(restriction)}
              onCheckedChange={() => {
                const newSelected = selectedDietary.includes(restriction)
                  ? selectedDietary.filter((item) => item !== restriction)
                  : [...selectedDietary, restriction];
                onDietaryChange(newSelected);
              }}
            >
              {restriction}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-between">
            Cuisine Type
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Cuisines</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {cuisineTypes.map((cuisine) => (
            <DropdownMenuCheckboxItem
              key={cuisine}
              checked={selectedCuisine.includes(cuisine)}
              onCheckedChange={() => {
                const newSelected = selectedCuisine.includes(cuisine)
                  ? selectedCuisine.filter((item) => item !== cuisine)
                  : [...selectedCuisine, cuisine];
                onCuisineChange(newSelected);
              }}
            >
              {cuisine}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {(selectedDietary.length > 0 || selectedCuisine.length > 0) && (
        <div className="flex gap-2 items-center text-sm text-muted-foreground">
          <span>Active filters:</span>
          {selectedDietary.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
            >
              {filter}
              <Check className="ml-1 h-3 w-3" />
            </span>
          ))}
          {selectedCuisine.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
            >
              {filter}
              <Check className="ml-1 h-3 w-3" />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
