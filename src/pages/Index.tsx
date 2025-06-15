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
            
            <p className="text-sm font-primary font-light tracking-[0.3em] text-muted-foreground uppercase mt-4 relative z-10">
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Mexico City Walking Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Zocalo+Plaza+de+la+Constitucion+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#5a5a5a' }}>Zocalo (Plaza de la Constitución)</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Plaza de la Constitución S/N, Centro Histórico de la Cdad. de México, Centro, Cuauhtémoc, 06010 Ciudad de México, CDMX, Mexico</p>
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Street Food Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Mercado+San+Juan+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#5a5a5a' }}>Mercado San Juan</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Ernesto Pugibet 21, Centro Histórico de la Cdad. de México, Centro, Cuauhtémoc, 06010 Ciudad de México, CDMX, Mexico</p>
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Anthropology Museum Tour (Optional)</h4>
                      <a href="https://maps.google.com/?q=Museo+Nacional+de+Antropologia+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#5a5a5a' }}>Museo Nacional de Antropología</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Av. Paseo de la Reforma s/n, Polanco, Bosque de Chapultepec I Secc, Miguel Hidalgo, 11560 Ciudad de México, CDMX, Mexico</p>
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Rehearsal Dinner</h4>
                      <a href="https://maps.google.com/?q=Cancion+Cibeles+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#5a5a5a' }}>Cancion Cibeles</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Plaza de Cibeles 10, Roma Nte., Cuauhtémoc, 06700 Ciudad de México, CDMX, Mexico</p>
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Wedding Ceremony & Reception</h4>
                      <a href="https://maps.google.com/?q=Toledo+Rooftop+Mexico+City" target="_blank" rel="noopener noreferrer" className="text-sm font-primary font-light hover:underline block" style={{ color: '#5a5a5a' }}>Toledo Rooftop</a>
                      <p className="text-xs font-primary font-light" style={{ color: '#8a8a8a' }}>Isabel La Católica 30, Centro Histórico de la Cdad. de México, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX, Mexico</p>
                      <p className="text-sm font-primary font-medium tracking-wider mt-1" style={{ color: '#738a6e' }}>4:00PM-2:00AM</p>
                      <p className="text-sm font-primary font-light italic mt-1" style={{ color: '#6a6a6a' }}>Dress Code: Cocktail attire, no children allowed</p>
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
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Farewell Brunch</h4>
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
                Flying to Mexico City from Canada
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                Mexico City International Airport (MEX) has direct flights from Toronto (YYZ) and Vancouver (YVR). 
                Flight time is approximately 6-7 hours. We recommend booking flights well in advance for better rates. 
                Major airlines serving this route include Air Canada, Aeromexico, and Interjet.
              </p>
            </div>

            {/* Transportation from Airport */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Airport to Hotel Transportation
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                <strong>Uber/Taxi:</strong> The most convenient option. Uber is widely available and costs approximately $8-15 USD depending on your destination. 
                Official airport taxis are also available at fixed rates.
                <br /><br />
                <strong>Metro:</strong> An economical option at about $0.25 USD, but not recommended with heavy luggage.
              </p>
            </div>

            {/* Getting Around Mexico City */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Getting Around Mexico City
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                <strong>Uber:</strong> The most reliable and safe option for tourists. Always verify the license plate and driver details.
                <br /><br />
                <strong>Metro:</strong> Extensive and inexpensive, but can be crowded. Avoid during rush hours (7-9 AM, 6-8 PM).
                <br /><br />
                <strong>Walking:</strong> Many attractions in Centro Histórico are walkable, but stay aware of your surroundings.
              </p>
            </div>

            {/* Hotel Recommendations */}
            <div className="space-y-6">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Recommended Hotels
              </h3>
              
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="hotel-luxury" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Four Seasons Hotel Mexico City</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Luxury • Paseo de la Reforma</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>$300-500 USD/night</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      Located in the heart of Polanco, this luxury hotel offers exceptional service, beautiful rooms, and is close to many of our wedding events. 
                      Features include a spa, fitness center, and excellent restaurants.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hotel-boutique" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Hotel Downtown Mexico</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Boutique • Centro Histórico</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>$150-250 USD/night</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      A stylish boutique hotel in the historic center, perfect for exploring the city's cultural attractions. 
                      Walking distance to many wedding venues and featuring modern amenities with colonial charm.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hotel-budget" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                    <div className="text-left w-full">
                      <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Hotel Majestic</h4>
                      <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>Mid-Range • Zócalo</p>
                      <p className="text-sm font-primary font-light" style={{ color: '#6a6a6a' }}>$80-150 USD/night</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                      A historic hotel overlooking the main square (Zócalo), offering great value and a central location. 
                      Perfect for budget-conscious travelers who want to be in the heart of the action.
                    </p>
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
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                Mexico City offers incredible culinary experiences from street food to Michelin-starred restaurants. 
                Don't miss tacos al pastor, mole, and fresh ceviche. Popular areas for dining include Polanco, Roma Norte, and Centro Histórico.
              </p>
            </div>

            {/* Museums & Sightseeing */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Museums & Sightseeing
              </h3>
              <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                Explore the National Museum of Anthropology, Frida Kahlo Museum, Templo Mayor, and the stunning Palacio de Bellas Artes. 
                Take a stroll through Chapultepec Park and visit the historic neighborhoods of Coyoacán and San Ángel.
              </p>
            </div>

            {/* Optional Tours */}
            <div className="space-y-4">
              <h3 className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
                Join Our Optional Tours
              </h3>
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
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>
                <strong>Important:</strong> Children are not allowed at the wedding ceremony and reception. 
                For childcare information, please see our <a href="#faq" className="text-blue-600 hover:underline">FAQ section</a>.
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="brunch"
                    checked={formData.attendingFarewellBrunch}
                    onCheckedChange={(checked) => setFormData({...formData, attendingFarewellBrunch: checked as boolean})}
                  />
                  <Label htmlFor="brunch" className="text-sm font-primary font-light" style={{ color: '#5a5a5a' }}>
                    Farewell Brunch (Sunday, September 27)
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full font-primary font-medium"
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
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Childcare for the Wedding</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  While children are not permitted at the wedding ceremony and reception, we understand that some guests may be traveling with little ones. 
                  We can provide recommendations for trusted babysitting services in Mexico City. Please contact us directly for referrals and assistance with arrangements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-attire" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
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
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
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

            <AccordionItem value="faq-gifts" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg bg-opacity-30" style={{ backgroundColor: 'rgba(115, 138, 110, 0.1)' }}>
                <div className="text-left w-full">
                  <h4 className="font-primary font-medium" style={{ color: '#3a3a3a' }}>Gift Registry</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-4">
                <p className="text-sm font-primary font-light leading-relaxed" style={{ color: '#5a5a5a' }}>
                  Your presence at our destination wedding is the greatest gift! If you wish to give something, 
                  we have registries at [Store Names] or would appreciate contributions toward our honeymoon fund.
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