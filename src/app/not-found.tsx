import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
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

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-500 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-8 h-8 border border-purple-500 opacity-50" />

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 mb-8 border border-gray-800 bg-gray-900/50 px-4 py-1.5 backdrop-blur-sm text-cyan-500 text-xs tracking-widest uppercase">
          <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
          System Error
        </div>

        <h1 className="text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-300">
          Page Not Found_
        </h2>
        
        <p className="text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">
          お探しのページは削除されたか、URLが変更された可能性があります。
          または、アクセス権限が不足しているかもしれません。
        </p>

        <Link 
          href="/" 
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold hover:bg-cyan-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Top</span>
          {/* Pixel Hover Effect */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      <div className="absolute bottom-10 text-xs text-gray-700">
        ERROR_CODE: PAGE_NOT_FOUND / MODULE_MISSING
      </div>
    </div>
  );
}

