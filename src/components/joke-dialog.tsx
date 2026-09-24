import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface JokeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JokeDialog = ({ open, onOpenChange }: JokeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bro...</DialogTitle>
        </DialogHeader>
        <DialogDescription>Just scroll down.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default JokeDialog;
