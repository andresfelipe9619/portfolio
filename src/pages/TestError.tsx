import { useState } from 'react';

export default function TestError() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('This is a test error from Sentry TestError page!');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Sentry Testing Route</h1>
        <p className="mb-8 text-muted-foreground">
          Click the button below to throw a test error. Only use this for
          verifying Sentry tracking.
        </p>
        <button
          onClick={() => setShouldThrow(true)}
          className="rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50"
        >
          Break the world
        </button>
      </div>
    </div>
  );
}
