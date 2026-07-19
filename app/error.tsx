'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-6 font-sans text-text-primary">
      <div className="max-w-md w-full bg-panel border border-border rounded-lg p-8 shadow-md text-center space-y-6">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 border border-red-500/20 mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-base font-bold text-text-primary uppercase tracking-wide font-sans">
            Application Error Encountered
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed font-sans">
            An unexpected error occurred in the Decimal Lens layout engine. You can attempt to reset the application state or reload the current filing.
          </p>
        </div>

        {error.message && (
          <div className="bg-muted/30 border border-border p-3 rounded font-mono text-[10px] text-left text-text-secondary break-all overflow-auto max-h-32">
            {error.message}
          </div>
        )}

        <div className="flex gap-2 w-full">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 border border-border bg-panel text-text-secondary text-xs font-semibold py-2.5 rounded-md hover:bg-bg transition-all cursor-pointer shadow-sm font-sans"
          >
            Reload Window
          </button>
          <button
            onClick={() => reset()}
            className="flex-1 bg-accent-navy text-white text-xs font-semibold py-2.5 rounded-md hover:bg-opacity-90 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 font-sans"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset State
          </button>
        </div>
      </div>
    </div>
  );
}
