import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import NewsletterSection from "./NewsletterSection";
import ReviewsSection from "./ReviewsSection";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-6">
        <BannerSlider />
      </div>

      {/* Featured Artifacts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedArtifactsSection />
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsSection />
      </div>

      {/* Artifact Journey Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArtifactJourney />
      </div>

      {/* Restorer Spotlight Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RestorerSpotlight />
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewsSection />
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default Home;
