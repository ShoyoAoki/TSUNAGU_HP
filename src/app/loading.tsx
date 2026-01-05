import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Rings */}
        <div className="w-16 h-16 border-4 border-gray-100 rounded-full" />
        <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin" />
      </div>
      
      <div className="mt-8 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-500 animate-pulse" />
        <span className="text-sm font-bold tracking-widest text-gray-900 font-mono uppercase">
          Loading System...
        </span>
      </div>
    </div>
  );
}

