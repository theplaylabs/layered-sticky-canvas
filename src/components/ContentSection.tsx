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
      <div className="relative z-10 py-16 px-4 md:ml-[232px] md:mr-[122px] md:px-16">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;