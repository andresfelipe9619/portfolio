import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ReactGA from 'react-ga4';

const FunnyVirusScanDialog = ({ open, onOpenChange }) => {
  const [step, setStep] = useState('warning');
  const [progress, setProgress] = useState(0);
  const [viruses, setViruses] = useState([]);

  const virusNames = [
    'Over-Engineered_Perfectionism.dll',
    'ScopeCreep.exe',
    'Infinite_Refactoring_Loop.sys',
    'Sleep_Deprivation_Caffeine_Overload.com',
    'Rubber_Duck_Driven_Development.bat',
  ];

  const handleConfirm = () => {
    setStep('scanning');
  };

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('finished');
            return 100;
          }
          const newProgress = prev + 10;
          if (newProgress % 20 === 0 && viruses.length < 5) {
            setViruses((prevViruses) => [
              ...prevViruses,
              virusNames[prevViruses.length],
            ]);
          }
          return newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
    //eslint-disable-next-line
  }, [step, viruses.length]);

  const handleDownload = () => {
    ReactGA.event({
      category: 'Resume',
      action: 'Downloaded',
      label: 'Resume Downloaded',
    });
    const link = document.createElement('a');
    link.href = '/RESUME 3.1.pdf';
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
              <DialogTitle>
                ⚠️ Warning: Genius-Level Content Detected
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              The resume you're about to download contains a dangerously high
              concentration of skills and experience. Your system might flag it
              as a 'productivity anomaly.' Proceed with caution.
            </DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="cursor-pointer">
                Unleash the Genius
              </Button>
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
                <div key={i} className="text-red-500">
                  {virus}
                </div>
              ))}
            </div>
          </>
        )}
        {step === 'finished' && (
          <>
            <DialogHeader>
              <DialogTitle>Scan Complete... Ish.</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              We found a few... 'unconventional files'. We've added them to{' '}
              <code>.gitignore</code> so you don't have to worry about them.
              Your download is ready.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleDownload} className="cursor-pointer">
                Download Resume
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FunnyVirusScanDialog;
