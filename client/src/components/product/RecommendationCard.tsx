import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Recommendation } from '@shared/schema';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: (recommendation: Recommendation) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation,
  onClick 
}) => {
  return (
    <div 
      className="relative rounded-xl overflow-hidden group cursor-pointer"
      onClick={() => onClick(recommendation)}
    >
      <div className="relative pb-[130%]">
        <img 
          src={recommendation.imageUrl} 
          alt={recommendation.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5">
          <Badge variant="accent" className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
            {recommendation.matchPercentage}% Match
          </Badge>
          <h3 className="text-white font-medium text-lg">{recommendation.title}</h3>
          <p className="text-neutral-300 text-sm mt-1">{recommendation.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
