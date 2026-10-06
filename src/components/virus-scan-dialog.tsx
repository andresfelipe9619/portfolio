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
import { logEvent } from '@/lib/ga';
import { useTranslation } from 'react-i18next';

interface FunnyVirusScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ScanStep = 'warning' | 'scanning' | 'finished';

const FunnyVirusScanDialog = ({
  open,
  onOpenChange,
}: FunnyVirusScanDialogProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<ScanStep>('warning');
  const [progress, setProgress] = useState(0);
  const [viruses, setViruses] = useState<string[]>([]);

  const threats = t('resumeScan.threats', { returnObjects: true });
  const virusNames = Array.isArray(threats) ? (threats as string[]) : [];

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
          if (newProgress % 20 === 0 && viruses.length < virusNames.length) {
            setViruses((prevViruses) => [
              ...prevViruses,
              virusNames[prevViruses.length],
            ]);
          }
          return newProgress;
        });
      }, 250);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, viruses.length]);

  const handleDownload = () => {
    // Through logEvent, not ReactGA directly: that's where the consent gate
    // lives. A direct call here used to queue events before anyone said yes.
    logEvent('Resume', 'Downloaded', 'Resume Downloaded');
    const link = document.createElement('a');
    link.href = '/RESUME 3.3.pdf';
    link.download = 'andres-suarez-resume.pdf';
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
              <DialogTitle>{t('resumeScan.warningTitle')}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{t('resumeScan.warningDesc')}</DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="cursor-pointer"
              >
                {t('resumeScan.cancel')}
              </Button>
              {/* The scan is the joke, the résumé is the point: anyone in a
                  hurry gets the PDF in one click. */}
              <Button
                onClick={handleDownload}
                variant="secondary"
                className="cursor-pointer"
              >
                {t('resumeScan.skip')}
              </Button>
              <Button onClick={handleConfirm} className="cursor-pointer">
                {t('resumeScan.confirm')}
              </Button>
            </DialogFooter>
          </>
        )}
        {step === 'scanning' && (
          <>
            <DialogHeader>
              <DialogTitle>{t('resumeScan.scanningTitle')}</DialogTitle>
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
              <DialogTitle>{t('resumeScan.finishedTitle')}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {t('resumeScan.finishedDesc')}
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleDownload} className="cursor-pointer">
                {t('resumeScan.download')}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FunnyVirusScanDialog;
