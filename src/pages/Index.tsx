import Layout from '@/components/Layout';
import ContentSection from '@/components/ContentSection';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <ContentSection 
        backgroundColor="hsl(var(--background))"
        className="min-h-screen"
      >
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-light tracking-wide text-foreground">
              SIMPLE
            </h1>
            <h2 className="text-6xl font-light tracking-wide text-foreground">
              INTERIORS
            </h2>
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mt-4">
              Minimalism & Elegance
            </p>
          </div>
          
          <div className="max-w-md mx-auto space-y-4 pt-8">
            <h3 className="text-lg font-medium text-foreground">
              Get advice from interior specialists
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Integer sollicitudin purus nec ex tincidunt tincidunt et lacinia. 
              Ut sit mauris in lorem dolor sit amet. Etiam dignissim lorem quis, 
              consectetur est adipiscing elit.
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="pt-16">
            <div className="w-8 h-8 mx-auto border border-muted-foreground rounded-full flex items-center justify-center animate-pulse">
              <div className="w-1 h-3 bg-muted-foreground"></div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Section with Background Image */}
      <ContentSection 
        backgroundImage="/lovable-uploads/40dc9ee5-4626-481d-9a03-6d83ea3399f7.png"
        className="min-h-screen"
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-light text-foreground">
            Beautiful Spaces
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Creating harmony between form and function in every space we design.
          </p>
        </div>
      </ContentSection>

      {/* Another Section */}
      <ContentSection 
        backgroundColor="hsl(var(--muted))"
        className="min-h-screen"
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-light text-foreground">
            Our Philosophy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Less is more. We believe in the power of simplicity and the beauty of clean lines.
          </p>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Index;
