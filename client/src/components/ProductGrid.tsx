import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
}

const ProductGrid = ({ category = 'all', searchQuery }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');

  // Build query key based on filters
  const queryKey = searchQuery 
    ? ['/api/search', searchQuery] 
    : ['/api/products', category];

  // Get URL based on filters
  const queryUrl = searchQuery 
    ? `/api/search?q=${encodeURIComponent(searchQuery)}` 
    : category === 'all' 
      ? '/api/products'
      : `/api/products?category=${category}`;

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(queryUrl);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Sort products
  const sortedProducts = products ? [...products] : [];
  if (sortedProducts.length > 0) {
    switch (sortOrder) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default order (keep as is)
        break;
    }
  }

  const toggleSort = () => {
    const orders: ('default' | 'price_asc' | 'price_desc' | 'rating')[] = ['default', 'price_asc', 'price_desc', 'rating'];
    const currentIndex = orders.indexOf(sortOrder);
    const nextIndex = (currentIndex + 1) % orders.length;
    setSortOrder(orders[nextIndex]);
  };

  // Generate sort label
  const getSortLabel = () => {
    switch (sortOrder) {
      case 'price_asc': return 'Price: Low to High';
      case 'price_desc': return 'Price: High to Low';
      case 'rating': return 'Highest Rated';
      default: return 'Sort';
    }
  };

  return (
    <section id="trending" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold">Trending Now</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-sm font-medium flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm font-medium flex items-center"
              onClick={toggleSort}
            >
              <ArrowDownUp className="h-4 w-4 mr-2" /> {getSortLabel()}
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          // Loading skeletons
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="w-full aspect-[3/4] rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-status-error mb-4">Failed to load products</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No products found</p>
            <Button variant="outline" onClick={() => window.location.href = '/'}>Browse All Products</Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button variant="outline" className="bg-white border border-neutral-200 text-primary font-medium py-3 px-8 rounded-full hover:bg-neutral-100 transition-colors">
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
      
      {showModal && selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default ProductGrid;
