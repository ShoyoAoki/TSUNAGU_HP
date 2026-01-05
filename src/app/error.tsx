"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Glitch Effect Elements */}
      <div className="absolute top-1/3 left-0 w-full h-1 bg-cyan-500 opacity-20" />
      <div className="absolute bottom-1/3 left-0 w-full h-1 bg-red-500 opacity-20" />

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 mb-8 border border-red-900/50 bg-red-900/20 px-4 py-1.5 backdrop-blur-sm text-red-500 text-xs tracking-widest uppercase">
          <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
          Critical System Failure
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white">
          500 Error
        </h1>
        
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-gray-400">
          Something went wrong_
        </h2>
        
        <p className="text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">
          システム内部で予期せぬエラーが発生しました。<br />
          一時的な問題の可能性があります。
        </p>

        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold hover:bg-cyan-500 transition-colors"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>Reboot System</span>
          {/* Pixel Hover Effect */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="absolute bottom-10 text-xs text-gray-700 font-mono">
        ERROR_DIGEST: {error.digest || "UNKNOWN_ERROR"}
      </div>
    </div>
  );
}

