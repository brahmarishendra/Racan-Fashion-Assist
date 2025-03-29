import { useEffect, useRef } from "react";
import { Recommendation } from "@/lib/types";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendationSectionProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  onQuickView: (product: Recommendation) => void;
}

const RecommendationSection = ({ 
  recommendations, 
  isLoading, 
  onQuickView 
}: RecommendationSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6 text-black">Your Personalized Picks</h2>
        <p className="text-neutral-400 mb-8 max-w-2xl">
          Based on your browsing history and preferences, we've curated these items just for you.
        </p>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="default"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md text-neutral-400 hover:text-primary transition-colors hidden md:flex"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md text-neutral-400 hover:text-primary transition-colors hidden md:flex"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {/* Recommendation Carousel */}
          <div 
            ref={carouselRef}
            className="recommendation-carousel overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-4 md:space-x-6 pb-4">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-64 md:w-72 space-y-3">
                    <Skeleton className="w-full aspect-[3/4] rounded-lg" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-5/6" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/6" />
                    </div>
                  </div>
                ))
              ) : recommendations.length === 0 ? (
                <div className="flex-shrink-0 w-full text-center py-8">
                  <p className="text-lg mb-2">No recommendations available</p>
                  <p className="text-sm text-neutral-400">Try browsing more products to get personalized recommendations</p>
                </div>
              ) : (
                recommendations.map((recommendation) => (
                  <ProductCard
                    key={recommendation.id}
                    product={recommendation}
                    onQuickView={onQuickView}
                    className="flex-shrink-0 w-64 md:w-72"
                    showMatchPercentage={true}
                    matchPercentage={recommendation.matchPercentage}
                    recommendationReason={recommendation.recommendationReason}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
