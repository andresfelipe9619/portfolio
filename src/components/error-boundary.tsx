import { type ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { AlertCircle, RotateCcw, MessageSquareWarning } from 'lucide-react';
import { motion } from 'motion/react';

interface FallbackProps {
  error: Error;
  componentStack: string | null;
  eventId: string | null;
  resetError: () => void;
}

const FallbackComponent = ({ error, eventId, resetError }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 selection:bg-primary/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-destructive/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-destructive/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center ring-1 ring-destructive/30 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]"
          >
            <AlertCircle className="w-10 h-10 text-destructive" strokeWidth={1.5} />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              System Anomaly
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              We encountered an unexpected glitch in the matrix. Don't worry, the incident has been logged.
            </p>
          </div>

          {import.meta.env.DEV && error && (
            <div className="w-full text-left bg-black/40 border border-destructive/20 p-4 rounded-xl overflow-x-auto shadow-inner">
              <p className="text-xs font-mono text-destructive/90 select-all">
                {error.toString()}
              </p>
            </div>
          )}

          <div className="w-full grid gap-3 pt-2">
            <button
              onClick={resetError}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              <RotateCcw className="w-4 h-4" />
              Reboot Sequence
            </button>
            <button
              onClick={() => Sentry.showReportDialog({ eventId: eventId || undefined })}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-secondary/80 hover:bg-secondary text-secondary-foreground font-medium rounded-xl border border-border/50 transition-all active:scale-[0.98]"
            >
              <MessageSquareWarning className="w-4 h-4" />
              Submit Diagnostic Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
