import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div className="bg-base-100">
      <div className="m-10">
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
      <Newsletter />
    </div>
  );
};

export default Home;
