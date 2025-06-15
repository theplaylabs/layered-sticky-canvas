import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Left Sticky Navigation */}
      <nav className="fixed left-0 top-0 h-full w-48 z-50 flex flex-col justify-start pt-16 px-8">
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
          <a href="#things-to-do" className="text-sm font-primary font-light tracking-[0.2em] text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase">
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

      {/* Right Sticky Green Bar */}
      <div className="fixed right-[60px] top-0 h-full w-[10.8px] z-50" style={{ backgroundColor: '#738a6e' }}></div>

      {/* Main Content Area */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;