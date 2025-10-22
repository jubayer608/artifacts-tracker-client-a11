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
      <div className="w-full">
        <FeaturedArtifactsSection></FeaturedArtifactsSection>
      </div>
      
      {/* Statistics Section */}
      <div className="w-full">
        <StatsSection></StatsSection>
      </div>
      
      {/* Artifact Journey Section */}
      <div className="w-full">
        <ArtifactJourney></ArtifactJourney>
      </div>
      
      {/* Restorer Spotlight Section */}
      <div className="px-6 md:px-20 w-full mx-auto">
        <RestorerSpotlight></RestorerSpotlight>
      </div>
      
      {/* Reviews Section */}
      <div className="w-full">
        <ReviewsSection></ReviewsSection>
      </div>
      
      {/* Newsletter Section */}
      <div className="w-full">
        <NewsletterSection></NewsletterSection>
      </div>
    </div>
  );
};

export default Home;
