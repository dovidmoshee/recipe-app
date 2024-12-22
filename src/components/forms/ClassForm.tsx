import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, Loader2 } from "lucide-react";

interface ClassFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ClassForm({ onSuccess, onCancel }: ClassFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [schedule, setSchedule] = useState("");
  const [price, setPrice] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("classes").insert({
        instructor_id: user.id,
        title,
        description,
        category,
        duration: parseInt(duration),
        schedule: new Date(schedule).toISOString(),
        price: parseFloat(price),
        max_participants: parseInt(maxParticipants),
        image_url: imageUrl,
        requirements,
        current_participants: 0,
        status: "scheduled",
      });

      if (error) throw error;
      onSuccess?.();
    } catch (error) {
      console.error("Error creating class:", error);
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
            placeholder="Class title"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Class description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Input
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Italian Cuisine"
            />
          </div>

          <div>
            <Label>Duration (minutes)</Label>
            <Input
              required
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="120"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Schedule</Label>
            <Input
              required
              type="datetime-local"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>

          <div>
            <Label>Price ($)</Label>
            <Input
              required
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="99.99"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Maximum Participants</Label>
            <Input
              required
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              placeholder="10"
            />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <Label>Requirements</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add requirement"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newRequirement) {
                  setRequirements([...requirements, newRequirement]);
                  setNewRequirement("");
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
              >
                <span>{requirement}</span>
                <button
                  type="button"
                  onClick={() =>
                    setRequirements(requirements.filter((_, i) => i !== index))
                  }
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
          Create Class
        </Button>
      </div>
    </form>
  );
}
