import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeForm } from "@/components/forms/RecipeForm";
import { ClassForm } from "@/components/forms/ClassForm";

interface CreateContentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateContentDialog({
  isOpen,
  onOpenChange,
}: CreateContentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="recipe" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recipe">Recipe</TabsTrigger>
            <TabsTrigger value="class">Cooking Class</TabsTrigger>
          </TabsList>
          <TabsContent value="recipe" className="mt-4">
            <RecipeForm
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>
          <TabsContent value="class" className="mt-4">
            <ClassForm
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
