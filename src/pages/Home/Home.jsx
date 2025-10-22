import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import NewsletterSection from "./NewsletterSection";
import ReviewsSection from "./ReviewsSection";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <BannerSlider></BannerSlider>
      </div>
      
      {/* Featured Artifacts Section */}
      <FeaturedArtifactsSection></FeaturedArtifactsSection>
      
      {/* Statistics Section */}
      <StatsSection></StatsSection>
      
      {/* Artifact Journey Section */}
      <ArtifactJourney></ArtifactJourney>
      
      {/* Restorer Spotlight Section */}
      <div className="px-4 md:px-8 lg:px-16 py-8 w-full">
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
