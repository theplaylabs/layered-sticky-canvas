import Layout from '@/components/Layout';
import ContentSection from '@/components/ContentSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    guestCount: 1,
    attendingRehearsalDinner: false,
    attendingWedding: false,
    attendingFarewellBrunch: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend or Google Sheets
    console.log('RSVP Data:', formData);
    alert('Thank you for your RSVP! We will confirm receipt shortly.');
  };

  return (
    <Layout>
      {/* Home Section */}
      <ContentSection 
        id="home"
        backgroundColor="hsl(var(--background))"
        className="min-h-screen"
      >
        <div className="text-right md:text-right text-center space-y-6">
          <div className="space-y-2 relative">
            {/* Large green ampersand background */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-end -mt-8 md:-mt-16">
              <span className="text-[6rem] md:text-[11.34rem] font-accent font-bold select-none" style={{ color: '#bfcfbb' }}>&</span>
            </div>
            
            {/* Names layered on top */}
            <div className="relative z-10" style={{ marginRight: '0px' }}>
              <h1 className="text-5xl md:text-8xl font-secondary font-light tracking-wider text-foreground leading-[0.75]">
                MATT
              </h1>
              <h2 className="text-5xl md:text-8xl font-secondary font-light tracking-wider text-foreground leading-[0.75]">
                CARLA
              </h2>
            </div>
            
            <div className="text-center md:text-right relative z-10" style={{ marginRight: '0px' }}>
              <p className="text-xs md:text-sm font-primary font-light tracking-[0.3em] text-muted-foreground uppercase mt-4">
                Join us in celebration
              </p>
            </div>
          </div>
          
          <div className="max-w-md mx-auto md:ml-auto space-y-4 pt-8">
            <h3 className="text-lg font-primary font-medium" style={{ color: '#738a6e' }}>
              Save the Date - September 26, 2026
            </h3>
            <p className="text-sm font-primary font-light text-muted-foreground leading-relaxed">
              We're excited to share our special day with you. Please join us for our 
              wedding celebration and all the festivities that surround it.
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="pt-16 flex justify-center md:justify-end">
            <div className="w-8 h-8 border border-muted-foreground rounded-full flex items-center justify-center animate-pulse">
              <div className="w-1 h-3 bg-muted-foreground"></div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Itinerary Section */}
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Mexico City Walking Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Zocalo+Plaza+de+la+Constitucion+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#738a6e' }}>Zocalo (Plaza de la Constitución)</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Plaza de la Constitución S/N</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>9:00AM-11:00AM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Comfortable walking shoes, casual attire</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="thursday-food" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Street Food Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Mercado+San+Juan+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#738a6e' }}>Mercado San Juan</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Ernesto Pugibet 21</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>1:00PM-4:00PM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Casual, comfortable attire</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Anthropology Museum Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Museo+Nacional+de+Antropologia+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#738a6e' }}>Museo Nacional de Antropología</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Av. Paseo de la Reforma s/n</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>11:00AM-3:00PM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Comfortable walking shoes, casual attire</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="friday-dinner" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Rehearsal Dinner</h4>
                      <a href="https://maps.google.com/?q=Cancion+Cibeles+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#738a6e' }}>Cancion Cibeles</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Plaza de Cibeles 10</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>7:00PM-10:00PM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Smart casual, no shorts or flip-flops</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Wedding Ceremony & Reception</h4>
                      <a href="https://maps.google.com/?q=Toledo+Rooftop+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#738a6e' }}>Toledo Rooftop</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Isabel La Católica 30</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>4:00PM-2:00AM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Cocktail attire, <a href="#faq" className="hover:underline" style={{ color: '#738a6e' }}>no children allowed</a></p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Farewell Brunch (Optional)</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Location TBD</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>11:00AM-2:00PM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Casual brunch attire</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
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
        backgroundColor="#ffffff"
        className="min-h-screen"
      >
        <div className="text-left space-y-8">
          <h2 className="text-4xl font-primary font-light" style={{ color: '#3a3a3a' }}>
            Travel & Accommodations
          </h2>
          
          <div className="space-y-8">
            {/* Getting to Mexico City */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Flying to Mexico City from Calgary
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                Mexico City International Airport (MEX) requires connecting flights from Calgary (YYC). Popular routing options include:
                <br /><br />
                <strong>Via Vancouver:</strong> <a href="https://www.aircanada.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Air Canada</a> - YYC to YVR to MEX (7-9 hours total)
                <br />
                <strong>Via Vancouver:</strong> <a href="https://www.westjet.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>WestJet</a> - YYC to YVR to MEX (7-9 hours total)
                <br />
                <strong>Via Phoenix:</strong> <a href="https://www.aa.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>American Airlines</a> - YYC to PHX to MEX (7-9 hours total)
                <br />
                <strong>Via Dallas:</strong> <a href="https://www.aa.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>American Airlines</a> - YYC to DFW to MEX (8-10 hours total)
                <br /><br />
                We recommend booking flights well in advance for better rates. Consider arriving Thursday if joining optional tours.
              </p>
            </div>

            {/* Transportation from Airport */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Airport to Hotel Transportation
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                <strong>Uber (Recommended):</strong> The most convenient and safe option. Download the Uber app before arrival. 
                Costs approximately $10-20 CAD to Roma Norte area. Pick-up area is on the Departures level (3rd floor). 
                Always verify the license plate matches your app before getting in.
                <br /><br />
                <strong>How to get Uber from MEX Airport:</strong>
                <br />1. After collecting baggage, take escalator to Departures level (Terminal 1: Level 3, Terminal 2: Level 2)
                <br />2. Open Uber app and request ride
                <br />3. Follow app directions to designated pickup zone
                <br />4. Wait for your driver and verify license plate
                <br />5. Journey to Roma Norte takes 30-45 minutes depending on traffic
              </p>
            </div>

            {/* Getting Around Mexico City */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Getting Around Mexico City
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                <strong>Uber (Recommended):</strong> The most reliable and safe option for tourists. Always verify the license plate and driver details before entering. 
                Most rides within the city cost $4-10 CAD. UberX is the most common option.
                <br /><br />
                <strong>Metro:</strong> Extensive and inexpensive at about $0.35 CAD, but can be very crowded. Avoid during rush hours (7-9 AM, 6-8 PM). 
                Generally safe but not ideal for tourists with luggage or valuables.
                <br /><br />
                <strong>Walking:</strong> Roma Norte and Centro Histórico are very walkable neighborhoods. Stay aware of your surroundings, 
                especially at night. Our wedding venues are easily accessible by Uber from Roma Norte hotels.
              </p>
            </div>

            {/* Hotel Recommendations */}
            <div className="space-y-6">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Recommended Hotels
              </h3>
              
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="hotel-luxury" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>The Brick Hotel</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Luxury • Roma Norte</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>$335-535 CAD/night</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop" 
                          alt="The Brick Hotel lobby" 
                          className="w-full h-24 object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&h=150&fit=crop" 
                          alt="The Brick Hotel room" 
                          className="w-full h-24 object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=150&fit=crop" 
                          alt="The Brick Hotel rooftop" 
                          className="w-full h-24 object-cover"
                        />
                      </div>
                      <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                        A sophisticated luxury hotel in the heart of Roma Norte, walking distance to trendy restaurants and cafes. 
                        Features beautiful design, rooftop terrace, and excellent service.
                      </p>
                      <a href="https://www.thebrickhotel.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#738a6e' }}>
                        Visit The Brick Hotel website
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hotel-boutique" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Hotel Carlota</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Boutique • Juárez</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>$160-270 CAD/night</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=200&h=150&fit=crop" 
                          alt="Hotel Carlota courtyard" 
                          className="w-full h-24 object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=150&fit=crop" 
                          alt="Hotel Carlota boutique room" 
                          className="w-full h-24 object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=200&h=150&fit=crop" 
                          alt="Hotel Carlota architecture"
                          className="w-full h-24 object-cover"
                        />
                      </div>
                      <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                        A stylish boutique hotel in the vibrant Juárez neighborhood. 
                        Features contemporary design, artistic atmosphere, and excellent service. Close to Roma Norte and easily accessible to wedding venues.
                      </p>
                      <a href="https://www.hotelcarlota.mx" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#738a6e' }}>
                        Visit Hotel Carlota website
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hotel-budget" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Hotel Villa Condesa</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Mid-Range • Condesa (adjacent to Roma Norte)</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>$105-190 CAD/night</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=200&h=150&fit=crop" 
                          alt="Hotel Villa Condesa lobby" 
                          className="w-full h-24 object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&h=150&fit=crop" 
                          alt="Hotel Villa Condesa modern room" 
                          className="w-full h-24 object-cover"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop" 
                          alt="Hotel Villa Condesa amenities" 
                          className="w-full h-24 object-cover"
                        />
                      </div>
                      <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                        A comfortable mid-range hotel in trendy Condesa neighborhood, just steps from Roma Norte. 
                        Offers clean, modern rooms with good amenities. Great value and easy access to wedding venues via Uber.
                      </p>
                      <a href="https://www.hotelvillacondesa.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#738a6e' }}>
                        Visit Hotel Villa Condesa website
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Things to Do Section */}
      <ContentSection 
        id="things-to-do"
        backgroundColor="#ffffff"
        className="min-h-screen"
      >
        <div className="text-left space-y-8">
          <h2 className="text-4xl font-primary font-light" style={{ color: '#3a3a3a' }}>
            Things to Do
          </h2>
          
          <div className="space-y-8">
            {/* Restaurants */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Restaurants
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=150&fit=crop" 
                  alt="Fine dining restaurant" 
                  className="w-full h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&h=150&fit=crop" 
                  alt="Mexican street food" 
                  className="w-full h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop" 
                  alt="Casual dining Mexico City" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                Mexico City offers incredible culinary experiences from street food to Michelin-starred restaurants.
                <br /><br />
                <strong>Fine Dining:</strong> <a href="https://www.pujol.com.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Pujol</a> (Michelin starred), <a href="https://www.quintonil.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Quintonil</a>, <a href="https://www.sud777.com.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Sud777</a>
                <br /><em className="text-xs" style={{ color: '#8a8a8a' }}>Note: Fine dining restaurants often require reservations well in advance.</em>
                <br /><br />
                <strong>Casual & Local:</strong> <a href="https://contramar.com.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Contramar</a> (seafood), <a href="https://www.rosettarestaurante.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Rosetta</a> (Italian-Mexican), El Cardenal (traditional Mexican breakfast)
                <br /><br />
                <strong>Street Food:</strong> Mercado San Juan, Tacos El Güero (tacos al pastor), Esquina Común (modern Mexican)
              </p>
            </div>

            {/* Museums & Sightseeing */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Museums & Sightseeing
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1555880522-a4f6c3002044?w=200&h=150&fit=crop" 
                  alt="Museum of Anthropology" 
                  className="w-full h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=200&h=150&fit=crop" 
                  alt="Frida Kahlo Museum" 
                  className="w-full h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=200&h=150&fit=crop" 
                  alt="Historic architecture Mexico City" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                Discover Mexico City's rich cultural heritage through world-class museums and historic sites.
                <br /><br />
                <strong>Must-Visit Museums:</strong> <a href="https://www.mna.inah.gob.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>National Museum of Anthropology</a>, <a href="https://www.museofridakahlo.org.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Frida Kahlo Museum</a>, <a href="https://www.palacio.bellas.artes.gob.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Palacio de Bellas Artes</a>
                <br /><br />
                <strong>Historic Sites:</strong> <a href="https://www.templomayor.inah.gob.mx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#738a6e' }}>Templo Mayor</a>, Zócalo (Main Square), Metropolitan Cathedral
                <br /><br />
                <strong>Neighborhoods:</strong> Coyoacán (Frida Kahlo's neighborhood), San Ángel (colonial charm), Roma Norte (trendy area where you'll be staying)
              </p>
            </div>

            {/* Optional Tours */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Join Our Optional Tours
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1571163294945-0d60c8d9c41d?w=200&h=150&fit=crop" 
                  alt="Mexico City walking tour" 
                  className="w-full h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=200&h=150&fit=crop" 
                  alt="Street food tour Mexico City" 
                  className="w-full h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" 
                  alt="Museum tour group" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                We've organized optional group activities during the wedding weekend! Check our itinerary section above for:
                <br />• Mexico City Walking Tour (Thursday)
                <br />• Street Food Tour (Thursday) 
                <br />• Anthropology Museum Tour (Friday)
                <br /><br />
                These are great opportunities to explore the city with fellow wedding guests and discover hidden gems with local guides.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* RSVP Section */}
      <ContentSection 
        id="rsvp"
        backgroundColor="#ffffff"
        className="min-h-screen"
      >
        <div className="text-left space-y-8">
          <h2 className="text-4xl font-primary font-light" style={{ color: '#3a3a3a' }}>
            RSVP
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
              Please respond by <strong>August 15, 2026</strong>
            </p>
            
            <div className="border-l-4 p-4" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)', borderColor: '#738a6e' }}>
              <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>
                <strong>Important:</strong> Children are not allowed at the wedding ceremony and reception. 
                For childcare information, please see our <a href="#faq" className="hover:underline" style={{ color: '#738a6e' }}>FAQ section</a>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-primary font-medium" style={{ color: '#3a3a3a' }}>
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="border-gray-300 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestCount" className="text-sm font-primary font-medium" style={{ color: '#3a3a3a' }}>
                  Number of Guests
                </Label>
                <Input
                  id="guestCount"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({...formData, guestCount: parseInt(e.target.value)})}
                  required
                  className="border-gray-300 focus:border-green-500"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-primary font-medium" style={{ color: '#3a3a3a' }}>
                  Which events will you attend?
                </h4>
                <p className="text-xs font-primary font-light italic" style={{ color: '#6a6a6a' }}>
                  Note: Optional events do not require RSVP
                </p>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rehearsal"
                    checked={formData.attendingRehearsalDinner}
                    onCheckedChange={(checked) => setFormData({...formData, attendingRehearsalDinner: checked as boolean})}
                  />
                  <Label htmlFor="rehearsal" className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>
                    Rehearsal Dinner (Friday, September 25)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wedding"
                    checked={formData.attendingWedding}
                    onCheckedChange={(checked) => setFormData({...formData, attendingWedding: checked as boolean})}
                  />
                  <Label htmlFor="wedding" className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>
                    Wedding Ceremony & Reception (Saturday, September 26)
                  </Label>
                </div>

              </div>

              <Button 
                type="submit" 
                className="w-full font-primary font-medium rounded-none"
                style={{ backgroundColor: '#738a6e', color: 'white' }}
              >
                Submit RSVP
              </Button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>
                <strong>Note:</strong> For pre-populated guest information or technical assistance with this form, 
                we can connect this to a Google Sheet on the backend. Please let us know if you'd like help setting that up.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* FAQ Section */}
      <ContentSection 
        id="faq"
        backgroundColor="#ffffff"
        className="min-h-screen"
      >
        <div className="text-left space-y-8">
          <h2 className="text-4xl font-primary font-light" style={{ color: '#3a3a3a' }}>
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="faq-children" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Childcare for the Wedding</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  Children are welcome at the rehearsal dinner and farewell brunch. However, the wedding venue is an over-18 venue, 
                  so children cannot attend the ceremony and reception. We will arrange for professional childcare nearby during the wedding. 
                  Please contact us for more details about childcare arrangements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-attire" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>What should I wear?</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  The wedding dress code is cocktail attire. For other events, please refer to the specific dress codes listed in our itinerary. 
                  Mexico City can be cool in September, so consider bringing a light jacket for evening events.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-currency" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>What currency should I bring?</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  Mexican Pesos (MXN) are the local currency. Many places accept USD, but you'll get better rates paying in pesos. 
                  ATMs are widely available, and credit cards are accepted at most restaurants and hotels. We recommend bringing some cash for tips and small vendors.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-language" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Do I need to speak Spanish?</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  In hotels and tourist locations, you'll typically find English-speaking staff. However, at markets, local shops, 
                  and other everyday establishments, Spanish is the primary language. We recommend downloading a translation app 
                  like Google Translate to help communicate when needed.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-gifts" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Gift Registry</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  Your presence at our destination wedding is the greatest gift! We are thrilled to celebrate with you 
                  and that's all we could ask for.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Index;