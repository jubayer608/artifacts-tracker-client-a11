import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import NewsletterSection from "./NewsletterSection";
import ReviewsSection from "./ReviewsSection";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="m-10">
        <BannerSlider></BannerSlider>
      </div>
      
      {/* Featured Artifacts Section */}
      <FeaturedArtifactsSection></FeaturedArtifactsSection>
      
      {/* Statistics Section */}
      <StatsSection></StatsSection>
      
      {/* Artifact Journey Section */}
      <ArtifactJourney></ArtifactJourney>
      
      {/* Restorer Spotlight Section */}
      <div className="m-10 w-full mx-auto">
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
