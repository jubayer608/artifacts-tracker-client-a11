import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import NewsletterSection from "./NewsletterSection";
import TestimonialsSection from "./TestimonialsSection";
import AboutSection from "./AboutSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="m-4 md:m-10">
        <BannerSlider></BannerSlider>
      </div>
      
      {/* Featured Artifacts */}
      <FeaturedArtifactsSection></FeaturedArtifactsSection>
      
      {/* Artifact Journey */}
      <ArtifactJourney></ArtifactJourney>
      
      {/* Restorer Spotlight */}
      <div className="m-4 md:m-10 w-full mx-auto">
        <RestorerSpotlight></RestorerSpotlight>
      </div>
      
      {/* Testimonials */}
      <TestimonialsSection></TestimonialsSection>
      
      {/* About Section */}
      <AboutSection></AboutSection>
      
      {/* Newsletter */}
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
