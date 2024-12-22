import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchFilters from "./SearchFilters";

interface SearchSectionProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: { dietary: string[]; cuisine: string[] }) => void;
  placeholder?: string;
}

const SearchSection = ({
  onSearch = () => {},
  onFilterChange = () => {},
  placeholder = "Search for recipes or cooking classes...",
}: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDietary, setSelectedDietary] = React.useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = React.useState<string[]>([]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleDietaryChange = (dietary: string[]) => {
    setSelectedDietary(dietary);
    onFilterChange({ dietary, cuisine: selectedCuisine });
  };

  const handleCuisineChange = (cuisine: string[]) => {
    setSelectedCuisine(cuisine);
    onFilterChange({ dietary: selectedDietary, cuisine });
  };

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <SearchFilters
        selectedDietary={selectedDietary}
        selectedCuisine={selectedCuisine}
        onDietaryChange={handleDietaryChange}
        onCuisineChange={handleCuisineChange}
      />
    </div>
  );
};

export default SearchSection;
