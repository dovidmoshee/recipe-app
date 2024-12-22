import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import HeroCarousel from "./HeroCarousel";
import SearchSection from "./SearchSection";
import TrendingRecipes from "./TrendingRecipes";
import CookingClassesRow from "./CookingClassesRow";
import FloatingActionButton from "./FloatingActionButton";

interface HomePageProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: { dietary: string[]; cuisine: string[] }) => void;
  onCreateRecipe?: () => void;
  onCreateClass?: () => void;
}

const HomePage = ({
  onSearch = () => {},
  onFilterChange = () => {},
  onCreateRecipe = () => {},
  onCreateClass = () => {},
}: HomePageProps) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Search Section */}
      <section className="w-full py-8 px-4 bg-slate-50">
        <SearchSection onSearch={onSearch} onFilterChange={onFilterChange} />
      </section>

      {/* Trending Recipes Section */}
      <section className="w-full py-12 px-4">
        <TrendingRecipes />
      </section>

      {/* Cooking Classes Section */}
      <section className="w-full py-12 px-4 bg-slate-50">
        <CookingClassesRow />
      </section>

      {/* Floating Action Button */}
      {user && (
        <FloatingActionButton
          onCreateRecipe={onCreateRecipe}
          onCreateClass={onCreateClass}
        />
      )}

      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default HomePage;
