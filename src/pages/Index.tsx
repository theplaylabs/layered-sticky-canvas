import Layout from '@/components/Layout';
import ContentSection from '@/components/ContentSection';

const Index = () => {
  return (
    <Layout>
      {/* Home Section */}
      <ContentSection 
        id="home"
        backgroundColor="hsl(var(--background))"
        className="min-h-screen"
      >
        <div className="text-right space-y-6">
          <div className="space-y-2 relative">
            {/* Large green ampersand background */}
            <div className="absolute inset-0 flex items-center justify-end" style={{ marginTop: '-60px' }}>
              <span className="text-[12rem] font-accent font-bold text-green-800/30 select-none">&</span>
            </div>
            
            {/* Names layered on top */}
            <div className="relative z-10" style={{ marginRight: '40px' }}>
              <h1 className="text-8xl font-secondary font-light tracking-wider text-foreground">
                MATT
              </h1>
              <h2 className="text-8xl font-secondary font-light tracking-wider text-foreground">
                CARLA
              </h2>
            </div>
            
            <p className="text-sm font-primary font-light tracking-[0.3em] text-muted-foreground uppercase mt-4 relative z-10">
              Join us in celebration
            </p>
          </div>
          
          <div className="max-w-md ml-auto space-y-4 pt-8">
            <h3 className="text-lg font-primary font-medium text-foreground">
              Save the Date
            </h3>
            <p className="text-sm font-primary font-light text-muted-foreground leading-relaxed">
              We're excited to share our special day with you. Please join us for our 
              wedding celebration and all the festivities that surround it.
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="pt-16 flex justify-end">
            <div className="w-8 h-8 border border-muted-foreground rounded-full flex items-center justify-center animate-pulse">
              <div className="w-1 h-3 bg-muted-foreground"></div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Schedule Section */}
      <ContentSection 
        id="schedule"
        backgroundImage="/lovable-uploads/40dc9ee5-4626-481d-9a03-6d83ea3399f7.png"
        className="min-h-screen"
      >
        <div className="text-left space-y-6">
          <h2 className="text-4xl font-primary font-light text-foreground">
            Schedule
          </h2>
          <p className="text-lg font-primary font-light text-foreground/80 leading-relaxed">
            Timeline of events for our special day.
          </p>
        </div>
      </ContentSection>

      {/* Travel Section */}
      <ContentSection 
        id="travel"
        backgroundColor="hsl(var(--muted))"
        className="min-h-screen"
      >
        <div className="text-left space-y-6">
          <h2 className="text-4xl font-primary font-light text-foreground">
            Travel & Accommodations
          </h2>
          <p className="text-lg font-primary font-light text-muted-foreground leading-relaxed">
            Information about getting here and where to stay.
          </p>
        </div>
      </ContentSection>

      {/* Things to Do Section */}
      <ContentSection 
        id="things-to-do"
        backgroundColor="hsl(var(--background))"
        className="min-h-screen"
      >
        <div className="text-left space-y-6">
          <h2 className="text-4xl font-primary font-light text-foreground">
            Things to Do
          </h2>
          <p className="text-lg font-primary font-light text-muted-foreground leading-relaxed">
            Explore the area and make the most of your visit.
          </p>
        </div>
      </ContentSection>

      {/* RSVP Section */}
      <ContentSection 
        id="rsvp"
        backgroundColor="hsl(var(--muted))"
        className="min-h-screen"
      >
        <div className="text-left space-y-6">
          <h2 className="text-4xl font-primary font-light text-foreground">
            RSVP
          </h2>
          <p className="text-lg font-primary font-light text-muted-foreground leading-relaxed">
            Please let us know if you'll be joining us.
          </p>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Index;
