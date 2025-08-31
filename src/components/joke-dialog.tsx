import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const JokeDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bro...</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Just scroll down.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default JokeDialog;
