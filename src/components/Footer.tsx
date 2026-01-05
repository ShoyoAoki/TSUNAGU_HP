export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Bridg Inc.
            </h3>
            <p className="text-gray-500 font-medium text-sm">
              Empowering organizations through data transparency.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-cyan-600 transition-colors">Product</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Solutions</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Company</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bridg Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
