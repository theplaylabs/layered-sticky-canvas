import Layout from '@/components/Layout';
import ContentSection from '@/components/ContentSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
              <span className="text-[11.34rem] font-accent font-bold select-none" style={{ color: '#bfcfbb' }}>&</span>
            </div>
            
            {/* Names layered on top */}
            <div className="relative z-10" style={{ marginRight: '55px' }}>
              <h1 className="text-8xl font-secondary font-light tracking-wider text-foreground leading-[0.75]">
                MATT
              </h1>
              <h2 className="text-8xl font-secondary font-light tracking-wider text-foreground leading-[0.75]">
                CARLA
              </h2>
            </div>
            
            <p className="text-sm font-primary font-light tracking-[0.3em] text-muted-foreground uppercase mt-4 relative z-10" style={{ marginRight: '55px' }}>
              Join us in celebration
            </p>
          </div>
          
          <div className="max-w-md ml-auto space-y-4 pt-8">
            <h3 className="text-lg font-primary font-medium" style={{ color: '#738a6e' }}>
              Save the Date - September 26, 2026
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
        backgroundColor="#ffffff"
        className="min-h-screen"
      >
        <div className="text-left space-y-8">
          <h2 className="text-4xl font-primary font-light" style={{ color: '#3a3a3a' }}>
            Itinerary
          </h2>
          
          <div className="space-y-8">
            {/* Thursday */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium tracking-wider" style={{ color: '#738a6e' }}>
                THURSDAY, SEPTEMBER 24
              </h3>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="thursday-walking" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-0">
                    <div className="text-left">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Mexico City Walking Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Zocalo+Plaza+de+la+Constitucion+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline" style={{ color: '#5a5a5a' }}>Zocalo (Plaza de la Constitución)</a>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>9:00am-11:00am</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="thursday-food" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-0">
                    <div className="text-left">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Street Food Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Mercado+San+Juan+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline" style={{ color: '#5a5a5a' }}>Mercado San Juan</a>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>1:00pm-4:00pm</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Friday */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium tracking-wider" style={{ color: '#738a6e' }}>
                FRIDAY, SEPTEMBER 25
              </h3>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="friday-museum" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-0">
                    <div className="text-left">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Anthropology Museum Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Museo+Nacional+de+Antropologia+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline" style={{ color: '#5a5a5a' }}>Museo Nacional de Antropología</a>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>11:00am-3:00pm</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="friday-dinner" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-0">
                    <div className="text-left">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Rehearsal Dinner</h4>
                      <a href="https://maps.google.com/?q=Cancion+Cibeles+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline" style={{ color: '#5a5a5a' }}>Cancion Cibeles</a>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>7:00pm-10:00pm</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Saturday */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium tracking-wider" style={{ color: '#738a6e' }}>
                SATURDAY, SEPTEMBER 26
              </h3>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="saturday-wedding" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-0">
                    <div className="text-left">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Wedding Ceremony & Reception</h4>
                      <a href="https://maps.google.com/?q=Toledo+Rooftop+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline" style={{ color: '#5a5a5a' }}>Toledo Rooftop</a>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>4:00pm-2:00am</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Sunday */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium tracking-wider" style={{ color: '#738a6e' }}>
                SUNDAY, SEPTEMBER 27
              </h3>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="sunday-brunch" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-0">
                    <div className="text-left">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Farewell Brunch</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>???</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>11:00am-2:00pm</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Travel Section */}
      <ContentSection 
        id="travel"
        backgroundColor="#3a3a3a"
        className="min-h-screen"
      >
        <div className="text-left space-y-6">
          <h2 className="text-4xl font-primary font-light text-white">
            Travel & Accommodations
          </h2>
          <p className="text-lg font-primary font-light text-white/80 leading-relaxed">
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
