import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Product } from '@shared/schema';
import { Star, StarHalf, ChevronDown, Plus, Minus } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  
  if (!product) return null;
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < (product.inventory || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  const renderStars = (rating: number | string | null | undefined) => {
    if (!rating) return null;
    
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="text-yellow-400 fill-yellow-400 h-4 w-4" />
        ))}
        {hasHalfStar && <StarHalf className="text-yellow-400 fill-yellow-400 h-4 w-4" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="text-neutral-300 h-4 w-4" />
        ))}
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col md:flex-row p-0">
        {/* Product Image */}
        <div className="md:w-1/2 relative">
          <div className="relative pb-[120%] md:pb-[140%]">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold mb-2">{product.title}</h3>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {renderStars(product.rating)}
                <span className="text-sm ml-2 text-neutral-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <p className="text-2xl font-semibold mb-4">${product.price}</p>
            <p className="text-neutral-600 mb-6">{product.description}</p>
          </div>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Color</h4>
            <div className="flex space-x-3">
              <button 
                className={`w-10 h-10 rounded-full bg-black border ${selectedColor === 'black' ? 'border-2 border-accent' : 'border-neutral-300'} relative active:scale-95 transition-transform`}
                aria-label="Black"
                onClick={() => setSelectedColor('black')}
              ></button>
              <button 
                className={`w-10 h-10 rounded-full bg-neutral-800 border ${selectedColor === 'dark-gray' ? 'border-2 border-accent' : 'border-neutral-300'} active:scale-95 transition-transform`}
                aria-label="Dark Gray"
                onClick={() => setSelectedColor('dark-gray')}
              ></button>
              <button 
                className={`w-10 h-10 rounded-full bg-neutral-400 border ${selectedColor === 'gray' ? 'border-2 border-accent' : 'border-neutral-300'} active:scale-95 transition-transform`}
                aria-label="Gray"
                onClick={() => setSelectedColor('gray')}
              ></button>
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Size</h4>
              <button className="text-sm text-accent underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className="w-12 h-12 rounded-lg bg-white border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all opacity-50 cursor-not-allowed"
                disabled
              >
                XS
              </button>
              <button 
                className={`w-12 h-12 rounded-lg ${selectedSize === 'S' ? 'bg-accent text-white' : 'bg-white border border-neutral-300 hover:bg-neutral-100'} flex items-center justify-center active:scale-95 transition-all`}
                onClick={() => setSelectedSize('S')}
              >
                S
              </button>
              <button 
                className={`w-12 h-12 rounded-lg ${selectedSize === 'M' ? 'bg-accent text-white' : 'bg-white border border-neutral-300 hover:bg-neutral-100'} flex items-center justify-center active:scale-95 transition-all`}
                onClick={() => setSelectedSize('M')}
              >
                M
              </button>
              <button 
                className={`w-12 h-12 rounded-lg ${selectedSize === 'L' ? 'bg-accent text-white' : 'bg-white border border-neutral-300 hover:bg-neutral-100'} flex items-center justify-center active:scale-95 transition-all`}
                onClick={() => setSelectedSize('L')}
              >
                L
              </button>
              <button 
                className={`w-12 h-12 rounded-lg ${selectedSize === 'XL' ? 'bg-accent text-white' : 'bg-white border border-neutral-300 hover:bg-neutral-100'} flex items-center justify-center active:scale-95 transition-all`}
                onClick={() => setSelectedSize('XL')}
              >
                XL
              </button>
            </div>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                <button 
                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center border-x border-neutral-300">{quantity}</span>
                <button 
                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-500">Only {product.inventory || 5} items left</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button className="w-full py-3 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors">
              Add to Cart
            </button>
            <button className="w-full py-3 bg-white border border-primary text-primary font-medium rounded-lg hover:bg-neutral-100 transition-colors">
              Add to Wishlist
            </button>
          </div>
          
          {/* Product Details */}
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <div className="mb-4">
              <div className="flex items-center justify-between cursor-pointer">
                <h4 className="font-medium">Product Details</h4>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between cursor-pointer">
                <h4 className="font-medium">Shipping & Returns</h4>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between cursor-pointer">
                <h4 className="font-medium">Material & Care</h4>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
