import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Heart, Truck, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail = ({ product, isOpen, onClose }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.hex || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [isFavorited, setIsFavorited] = useState(false);

  const thumbnails = product.thumbnailUrls?.length 
    ? [product.imageUrl, ...product.thumbnailUrls] 
    : [product.imageUrl];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const formatThumbnailUrl = (url: string) => {
    return url.replace('w=400', 'w=200');
  };

  const formatFullSizeUrl = (url: string) => {
    return url.replace('w=200', 'w=800');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-4 md:p-6">
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-neutral-400 hover:text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="relative h-[300px] md:h-[450px] mb-3 rounded-lg overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {thumbnails.map((url, index) => (
                  <button 
                    key={index}
                    className={cn(
                      "product-thumbnail h-20 w-20 rounded-md overflow-hidden border-2",
                      selectedImage === url ? "border-accent" : "border-transparent"
                    )}
                    onClick={() => setSelectedImage(url)}
                  >
                    <img 
                      src={formatThumbnailUrl(url)} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="flex items-center text-sm mb-2">
                <span className="text-status-success font-medium">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <span className="mx-2">•</span>
                {product.rating && (
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-accent">
                        {star <= Math.floor(product.rating) ? "★" : 
                         star - 0.5 <= product.rating ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="ml-1 text-neutral-300">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>
              
              <h2 className="font-playfair text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-neutral-400 mb-4">{product.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="ml-2 text-neutral-300 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      {product.discount && (
                        <span className="ml-2 text-status-success text-sm font-medium">
                          Save {product.discount}%
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <button 
                        key={index}
                        className={cn(
                          "w-10 h-10 rounded-full border-2",
                          selectedColor === color.hex ? "border-accent" : "border-transparent"
                        )}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.hex)}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Size</h3>
                    <Button variant="link" className="text-accent text-sm p-0">Size Guide</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          "size-btn py-2 px-4 border rounded-md",
                          selectedSize === size 
                            ? "border-accent bg-accent text-white" 
                            : "border-neutral-200"
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add to Cart */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <div className="flex items-center border border-neutral-200 rounded-md">
                  <Button 
                    variant="ghost" 
                    className="py-2 px-4 text-xl" 
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <input 
                    type="text" 
                    value={quantity} 
                    className="w-12 py-2 text-center focus:outline-none" 
                    readOnly
                  />
                  <Button 
                    variant="ghost" 
                    className="py-2 px-4 text-xl" 
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
                <Button 
                  variant="default" 
                  className="py-3 px-8 bg-black text-white font-medium rounded-md hover:bg-opacity-90 flex-grow"
                >
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="p-3 border border-neutral-200 rounded-md hover:bg-neutral-100"
                  onClick={toggleFavorite}
                >
                  <Heart className={cn("h-5 w-5", isFavorited && "fill-accent text-accent")} />
                </Button>
              </div>
              
              {/* Shipping and Returns */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center space-x-2 text-sm mb-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RotateCcw className="h-4 w-4" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
