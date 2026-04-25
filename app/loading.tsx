// src/app/loading.tsx

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-primary-dark" />
      </div>
    </div>
  );
}
