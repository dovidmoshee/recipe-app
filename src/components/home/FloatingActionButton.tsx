import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateContentDialog } from "@/components/dialogs/CreateContentDialog";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        className="fixed bottom-8 right-8 h-[60px] w-[60px] rounded-full shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <CreateContentDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default FloatingActionButton;
