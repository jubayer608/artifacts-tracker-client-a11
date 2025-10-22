import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import NewsletterSection from "./NewsletterSection";
import ReviewsSection from "./ReviewsSection";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10">
        <BannerSlider></BannerSlider>
      </div>
      
      {/* Featured Artifacts Section */}
      <FeaturedArtifactsSection></FeaturedArtifactsSection>
      
      {/* Statistics Section */}
      <StatsSection></StatsSection>
      
      {/* Artifact Journey Section */}
      <ArtifactJourney></ArtifactJourney>
      
      {/* Restorer Spotlight Section */}
      <RestorerSpotlight></RestorerSpotlight>
      
      {/* Reviews Section */}
      <ReviewsSection></ReviewsSection>
      
      {/* Newsletter Section */}
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
