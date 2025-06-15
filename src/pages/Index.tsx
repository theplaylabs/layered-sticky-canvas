import Layout from '@/components/Layout';
import ContentSection from '@/components/ContentSection';
import RSVPForm from '@/components/RSVPForm';

const Index = () => {
  return (
    <Layout>
      {/* Home Section */}
      <ContentSection 
        id="home"
        backgroundImage="/lovable-uploads/40dc9ee5-4626-481d-9a03-6d83ea3399f7.png"
        className="flex items-center justify-center"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-primary font-light mb-4">
            Welcome to Our Wedding
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Join us for a celebration of love
          </p>
        </div>
      </ContentSection>

      {/* Schedule Section */}
      <ContentSection id="schedule" backgroundColor="#f8f9fa">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-primary font-light mb-8 text-center">Itinerary</h2>
          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Rehearsal Dinner</h3>
              <p className="text-muted-foreground">Friday, [Date] at [Time]</p>
              <p className="text-muted-foreground">[Venue Name & Address]</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Wedding Ceremony</h3>
              <p className="text-muted-foreground">Saturday, [Date] at [Time]</p>
              <p className="text-muted-foreground">[Venue Name & Address]</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Reception</h3>
              <p className="text-muted-foreground">Saturday, [Date] at [Time]</p>
              <p className="text-muted-foreground">[Venue Name & Address]</p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Travel Section */}
      <ContentSection id="travel" backgroundColor="#ffffff">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-primary font-light mb-8 text-center">Travel & Accommodations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Getting There</h3>
              <p className="text-muted-foreground mb-4">
                The nearest airport is [Airport Name] ([Code]), approximately [X] miles from the venue.
              </p>
              <p className="text-muted-foreground">
                We recommend renting a car for easy transportation between venues and local attractions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Where to Stay</h3>
              <p className="text-muted-foreground mb-4">
                We have reserved room blocks at the following hotels:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• [Hotel Name] - [Phone Number]</li>
                <li>• [Hotel Name] - [Phone Number]</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Things to Do Section */}
      <ContentSection id="things-to-do" backgroundColor="#f8f9fa">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-primary font-light mb-8 text-center">Things to Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Local Attractions</h3>
              <p className="text-muted-foreground">
                Explore the beautiful [local area] with its [attractions].
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Dining</h3>
              <p className="text-muted-foreground">
                Don't miss [restaurant recommendations] for great local cuisine.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Activities</h3>
              <p className="text-muted-foreground">
                Enjoy [activities] during your stay.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* RSVP Section */}
      <ContentSection id="rsvp" backgroundColor="#ffffff">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-primary font-light mb-8 text-center">RSVP</h2>
          <RSVPForm />
        </div>
      </ContentSection>

      {/* FAQ Section */}
      <ContentSection id="faq" backgroundColor="#f8f9fa">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-primary font-light mb-8 text-center">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What should I wear?</h3>
              <p className="text-muted-foreground">
                The dress code is [dress code]. We recommend [specific guidance].
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I bring a plus one?</h3>
              <p className="text-muted-foreground">
                Plus ones are included in your invitation if applicable. Please check your RSVP form for details.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Will there be childcare?</h3>
              <p className="text-muted-foreground">
                Yes, we will have professional childcare available during the ceremony and reception.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What time should I arrive?</h3>
              <p className="text-muted-foreground">
                Please arrive 15-30 minutes before the ceremony start time to allow for seating.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Index;