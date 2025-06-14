import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  className?: string;
  minHeight?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  backgroundImage,
  backgroundColor,
  className,
  minHeight = "100vh"
}) => {
  const backgroundStyle = backgroundImage 
    ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }
    : backgroundColor 
    ? { backgroundColor }
    : {};

  return (
    <section 
      className={cn(
        "relative w-full flex items-center justify-center",
        className
      )}
      style={{ 
        minHeight,
        ...backgroundStyle
      }}
    >
      {/* Background overlay for better text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[0.5px]"></div>
      )}
      
      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 py-16">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;