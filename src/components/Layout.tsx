import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Mobile Navigation - Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex justify-center py-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
            <a href="#home" className="text-xs font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
              Home
            </a>
            <a href="#schedule" className="text-xs font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
              Itinerary
            </a>
            <a href="#travel" className="text-xs font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
              Travel
            </a>
            <a href="#things-to-do" className="text-xs font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
              Things to Do
            </a>
            <a href="#rsvp" className="text-xs font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
              RSVP
            </a>
            <a href="#faq" className="text-xs font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation - Left Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-48 z-50 flex-col justify-start pt-16 px-8">
        <div className="flex flex-col space-y-8">
          {/* Navigation Items */}
          <a href="#home" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
            Home
          </a>
          <a href="#schedule" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
            Itinerary
          </a>
          <a href="#travel" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
            Travel & Accommodations
          </a>
          <a href="#things-to-do" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase whitespace-nowrap">
            Things to Do
          </a>
          <a href="#rsvp" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
            RSVP
          </a>
          <a href="#faq" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
            FAQ
          </a>
        </div>
      </nav>

      {/* Right Sticky Green Bar - Desktop Only */}
      <div className="hidden md:block fixed right-[60px] top-0 h-full w-[10.8px] z-50" style={{ backgroundColor: '#738a6e' }}></div>

      {/* Main Content Area */}
      <main className="w-full md:ml-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;