import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Left Sticky Navigation */}
      <nav className="fixed left-0 top-0 h-full w-16 bg-background/80 backdrop-blur-sm border-r border-border z-50 flex flex-col items-center py-8">
        <div className="flex flex-col space-y-6">
          {/* Logo/Brand */}
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary"></div>
          </div>
          
          {/* Navigation Items */}
          <div className="flex flex-col space-y-4">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/60 hover:bg-primary cursor-pointer transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/60 hover:bg-primary cursor-pointer transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/60 hover:bg-primary cursor-pointer transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/60 hover:bg-primary cursor-pointer transition-colors"></div>
          </div>
        </div>
      </nav>

      {/* Right Sticky Green Bar */}
      <div className="fixed right-[60px] top-0 h-full w-3 bg-emerald-800 z-50"></div>

      {/* Main Content Area */}
      <main className="ml-16 mr-[90px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;