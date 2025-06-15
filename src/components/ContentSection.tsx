import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  className?: string;
  minHeight?: string;
  id?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  backgroundImage,
  backgroundColor,
  className,
  minHeight = "100vh",
  id
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
      id={id}
      className={cn(
        "relative w-full",
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
      <div 
        className="relative z-10 py-16"
        style={{ 
          marginLeft: '222px',  // nav width (192px) + gap (30px)
          marginRight: '132px', // green bar area (72px) + gap (30px) + extra margin (30px)
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default ContentSection;