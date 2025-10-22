import BannerSlider from "./BannerSlider";
import ArtifactJourney from "./ArtifactJourney";
import FeaturedArtifactsSection from "./FeaturedArtifactsSection";
import RestorerSpotlight from "./RestorerSpotlight";
import RecentlyViewed from "./RecentlyViewed";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <div>
      <div className="m-10">
        <BannerSlider></BannerSlider>
      </div>
      <FeaturedArtifactsSection></FeaturedArtifactsSection>
      <ArtifactJourney></ArtifactJourney>
      <div className="m-10 w-full mx-auto">
        <RestorerSpotlight></RestorerSpotlight>
      </div>
      <RecentlyViewed />
      <Reviews />
    </div>
  );
};

export default Home;
