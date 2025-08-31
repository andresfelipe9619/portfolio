import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const FunnyVirusScanDialog = ({ open, onOpenChange }) => {
  const [step, setStep] = useState('warning');
  const [progress, setProgress] = useState(0);
  const [viruses, setViruses] = useState([]);

  const handleConfirm = () => {
    setStep('scanning');
  };

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('finished');
            return 100;
          }
          const newProgress = prev + 10;
          if (newProgress % 20 === 0 && viruses.length < 5) {
            setViruses(prevViruses => [...prevViruses, `Virus ${prevViruses.length + 1} found`]);
          }
          return newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [step, viruses.length]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/developer_designer_checklist.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === 'warning' && (
          <>
            <DialogHeader>
              <DialogTitle>⚠️ Warning: Highly Potent Content Ahead!</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              The resume you are about to download is so powerful, your system might mistake it for a virus. Proceed with caution (and a sense of humor).
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} variant="outline">Cancel</Button>
              <Button onClick={handleConfirm}>I'm Feeling Lucky</Button>
            </DialogFooter>
          </>
        )}
        {step === 'scanning' && (
          <>
            <DialogHeader>
              <DialogTitle>Scanning for threats...</DialogTitle>
            </DialogHeader>
            <Progress value={progress} />
            <div className="text-sm text-muted-foreground mt-2">
              {viruses.map((virus, i) => (
                <div key={i} className="text-red-500">{virus}</div>
              ))}
            </div>
          </>
        )}
        {step === 'finished' && (
          <>
            <DialogHeader>
              <DialogTitle>Scan Complete!</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              No threats found. Your system is safe (for now). You may now download the resume.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleDownload}>Download Resume</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FunnyVirusScanDialog;
