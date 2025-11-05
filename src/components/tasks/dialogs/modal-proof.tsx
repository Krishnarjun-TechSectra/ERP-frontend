import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ModalProofProps {
  task: any;
  onClose: () => void;
}

export const ModalProof = ({ task, onClose }: ModalProofProps) => {
  const [proofText, setProofText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("✅ Proof submitted for:", task.title);
    console.log("📎 File:", file?.name);
    console.log("📝 Notes:", proofText);

    // You can later add API logic here to upload proof to backend.
    onClose();
  };

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Proof of Completion</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please provide proof for completing:{" "}
            <span className="font-medium text-gray-900">{task.title}</span>
          </p>

          <div className="space-y-2">
            <Label htmlFor="proofText">Notes / Description</Label>
            <Textarea
              id="proofText"
              placeholder="Enter notes or completion summary..."
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proofFile">Attach File (optional)</Label>
            <Input id="proofFile" type="file" onChange={handleFileChange} />
            {file && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {file.name}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Proof</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
