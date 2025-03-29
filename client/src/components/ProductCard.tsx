import { Product } from "@/lib/types";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useWishlist } from "@/hooks/use-wishlist";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  className?: string;
  showMatchPercentage?: boolean;
  matchPercentage?: number;
  recommendationReason?: string;
}

const ProductCard = ({ 
  product, 
  onQuickView, 
  className,
  showMatchPercentage = false,
  matchPercentage,
  recommendationReason
}: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorited = isInWishlist(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div className={cn("product-card group relative", className)}>
      <Link href={`/product/${product.id}`}>
        <a>
          <div className="relative overflow-hidden rounded-lg mb-3">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full aspect-[3/4] object-cover transition-transform duration-500"
            />
            
            {/* Badge indicators */}
            {product.isNew && (
              <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                New
              </div>
            )}
            
            {product.isTrending && (
              <div className="absolute top-3 left-3 bg-status-success text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                Trending
              </div>
            )}
            
            {/* Quick view button */}
            <button 
              className="quick-view absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-primary font-medium text-sm py-2 px-4 rounded-full opacity-0 transition-opacity duration-300"
              onClick={handleQuickView}
            >
              Quick View
            </button>
            
            {/* Favorite button */}
            <button 
              className="absolute top-3 right-3 bg-white p-2 rounded-full text-neutral-400 hover:text-accent transition-colors"
              onClick={toggleFavorite}
              aria-label="Add to favorites"
            >
              <Heart className={cn("h-4 w-4", isFavorited && "fill-accent text-accent")} />
            </button>
          </div>
          
          <div>
            {showMatchPercentage && matchPercentage && (
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm md:text-base">{product.name}</h3>
                <div className="bg-accent text-white text-xs px-2 py-1 rounded-full">{matchPercentage}% match</div>
              </div>
            ) || (
              <h3 className="font-medium text-sm md:text-base">{product.name}</h3>
            )}
            
            {recommendationReason && (
              <p className="text-sm text-neutral-400 mb-1">{recommendationReason}</p>
            )}
            
            <div className="flex justify-between items-center mt-1">
              <p className="font-semibold">${product.price.toFixed(2)}</p>
              {product.rating && (
                <div className="text-sm text-neutral-300">
                  <span className="text-accent">★</span>
                  <span>{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
      <button 
        onClick={(e) => {
          e.preventDefault();
          // Add to cart functionality
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem('cart', JSON.stringify(cart));
          alert('Added to cart!');
        }}
        className="w-full mt-2 py-2 bg-accent text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
