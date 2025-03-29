import React from 'react';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleClick = () => {
    onClick(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement wishlist functionality
    console.log('Add to wishlist:', product.id);
  };

  return (
    <Card 
      className="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
      data-category={product.category}
      onClick={handleClick}
    >
      <div className="relative pb-[120%]">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <button 
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-100 transition-colors"
          onClick={handleWishlistClick}
        >
          <Heart className="h-4 w-4 text-neutral-400 hover:text-accent transition-colors" />
        </button>
        
        {product.isNew && (
          <Badge variant="accent" className="absolute bottom-0 left-0 px-3 py-1 text-xs font-medium">
            NEW
          </Badge>
        )}
        
        {product.isTrending && (
          <Badge variant="success" className="absolute bottom-0 left-0 px-3 py-1 text-xs font-medium">
            TRENDING
          </Badge>
        )}
        
        {product.isSale && (
          <Badge variant="warning" className="absolute bottom-0 left-0 px-3 py-1 text-xs font-medium">
            SALE
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="product-title font-medium mb-1">{product.title}</h3>
        <p className="text-sm text-neutral-400 mb-2">{product.collection}</p>
        <div className="flex justify-between items-center">
          {product.isSale && product.originalPrice ? (
            <div>
              <span className="product-price font-semibold">${product.price}</span>
              <span className="text-sm text-neutral-400 line-through ml-2">${product.originalPrice}</span>
            </div>
          ) : (
            <span className="product-price font-semibold">${product.price}</span>
          )}
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
