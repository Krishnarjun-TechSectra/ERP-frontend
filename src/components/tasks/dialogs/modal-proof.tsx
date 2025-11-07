import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ModalProofProps {
  task: any;
  onClose: () => void;
  onConfirm: (proofText: string) => void;
}

export const ModalProof = ({ task, onClose, onConfirm }: ModalProofProps) => {
  const [proofText, setProofText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!proofText.trim()) return;
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      onConfirm(proofText.trim());
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent
        className="
          fixed left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          max-w-md w-[90%]
          rounded-2xl backdrop-blur-xl 
          border border-gray-200 shadow-2xl
          transition-all duration-200
        "
      >
        {/* Loading overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl z-10">
            <Loader2 className="animate-spin text-gray-600 w-6 h-6" />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Proof of Completion
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-gray-600">
            Provide proof or a short description for completing:{" "}
            <span className="font-medium text-gray-900">
              {task?.title ?? "Untitled Task"}
            </span>
          </p>

          <div className="space-y-2">
            <Label htmlFor="proofText">Notes / Description</Label>
            <Textarea
              id="proofText"
              placeholder="Describe what was done or add completion notes..."
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              disabled={isSubmitting}
              className="resize-none h-28"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="min-w-[90px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !proofText.trim()}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting
              </>
            ) : (
              "Submit Proof"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
