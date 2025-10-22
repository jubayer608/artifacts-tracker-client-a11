import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import NewsletterSection from "./NewsletterSection";
import ReviewsSection from "./ReviewsSection";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="px-6 md:px-20">
        <BannerSlider></BannerSlider>
      </div>
      
      {/* Featured Artifacts Section */}
      <FeaturedArtifactsSection></FeaturedArtifactsSection>
      
      {/* Statistics Section */}
      <StatsSection></StatsSection>
      
      {/* Artifact Journey Section */}
      <ArtifactJourney></ArtifactJourney>
      
      {/* Restorer Spotlight Section */}
      <div className="px-6 md:px-20 w-full mx-auto">
        <RestorerSpotlight></RestorerSpotlight>
      </div>
      
      {/* Reviews Section */}
      <ReviewsSection></ReviewsSection>
      
      {/* Newsletter Section */}
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
