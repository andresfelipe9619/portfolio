
import { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    Sentry.captureException(error, { extra: errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
          <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
          <p className="text-lg mt-4">
            It seems we've hit a snag. Please try refreshing the page.
          </p>
          <button
            className="mt-8 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => Sentry.showReportDialog({ eventId: Sentry.lastEventId() })}
          >
            Report Feedback
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
