import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface RecommendationBannerProps {
  onGetRecommendations: () => void;
}

const RecommendationBanner = ({ onGetRecommendations }: RecommendationBannerProps) => {
  return (
    <section className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="font-montserrat text-xl font-semibold">Personalized For You</h2>
            <p className="text-neutral-200">Real-time recommendations based on your style preferences</p>
          </div>
          <Button 
            onClick={onGetRecommendations}
            className="bg-white text-black font-montserrat font-semibold px-6 py-2 rounded-full hover:bg-neutral-100 transition-all"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecommendationBanner;
