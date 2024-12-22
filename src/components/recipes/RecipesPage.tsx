import { useState, useEffect } from "react";
import SearchSection from "../home/SearchSection";
import RecipeCard from "../home/RecipeCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const RecipesPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ dietary: [], cuisine: [] });

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      let query = supabase
        .from("recipes")
        .select(
          `
          *,
          profiles:user_id (username, full_name),
          bookmarks!left (id)
        `,
        )
        .order("created_at", { ascending: false });

      if (user) {
        query = query.eq("bookmarks.user_id", user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (recipeId: string, isBookmarked: boolean) => {
    if (!user) return;

    try {
      if (isBookmarked) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("bookmarkable_type", "recipe")
          .eq("bookmarkable_id", recipeId);
      } else {
        await supabase.from("bookmarks").insert({
          user_id: user.id,
          bookmarkable_type: "recipe",
          bookmarkable_id: recipeId,
        });
      }
      loadRecipes(); // Reload to update bookmarks
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <section className="w-full py-8 px-4 bg-slate-50">
        <SearchSection
          placeholder="Search recipes..."
          onFilterChange={setFilters}
        />
      </section>

      {/* All Recipes Grid */}
      <section className="w-full py-12 px-4">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">All Recipes</h2>
              <p className="text-muted-foreground">
                Browse our collection of delicious recipes
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  imageUrl={recipe.image_url}
                  title={recipe.title}
                  chef={recipe.profiles?.full_name || recipe.profiles?.username}
                  cookTime={`${recipe.cooking_time} mins`}
                  difficulty={recipe.difficulty}
                  rating={4.5} // You might want to calculate this from reviews
                  isBookmarked={recipe.bookmarks?.length > 0}
                  onBookmark={() =>
                    handleBookmark(recipe.id, recipe.bookmarks?.length > 0)
                  }
                  onClick={() => {}} // Add navigation to recipe details
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;
