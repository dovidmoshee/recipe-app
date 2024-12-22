import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, X } from "lucide-react";

interface RecipeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RecipeForm({ onSuccess, onCancel }: RecipeFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(
    "Medium",
  );
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("recipes").insert({
        user_id: user.id,
        title,
        description,
        category,
        cooking_time: parseInt(cookingTime),
        difficulty,
        ingredients: ingredients.map((i) => ({ item: i })),
        instructions,
        image_url: imageUrl,
        tags,
      });

      if (error) throw error;
      onSuccess?.();
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe title"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Input
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Italian, Dessert"
            />
          </div>

          <div>
            <Label>Cooking Time (minutes)</Label>
            <Input
              required
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="45"
            />
          </div>
        </div>

        <div>
          <Label>Difficulty</Label>
          <Select
            value={difficulty}
            onValueChange={(value: "Easy" | "Medium" | "Hard") =>
              setDifficulty(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Image URL</Label>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label>Ingredients</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Add ingredient"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newIngredient) {
                  setIngredients([...ingredients, newIngredient]);
                  setNewIngredient("");
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
              >
                <span>{ingredient}</span>
                <button
                  type="button"
                  onClick={() =>
                    setIngredients(ingredients.filter((_, i) => i !== index))
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Instructions</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="Add instruction step"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newInstruction) {
                  setInstructions([...instructions, newInstruction]);
                  setNewInstruction("");
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary p-2 rounded-md"
              >
                <span className="font-medium">{index + 1}.</span>
                <span className="flex-1">{instruction}</span>
                <button
                  type="button"
                  onClick={() =>
                    setInstructions(instructions.filter((_, i) => i !== index))
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newTag) {
                  setTags([...tags, newTag]);
                  setNewTag("");
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Recipe
        </Button>
      </div>
    </form>
  );
}
