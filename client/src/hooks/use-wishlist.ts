import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  
  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        // If there's an error parsing, reset the wishlist
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Check if a product is in the wishlist
  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Add a product to the wishlist
  const addToWishlist = (product: Product): void => {
    if (!isInWishlist(product.id)) {
      const updatedWishlist = [...wishlistItems, product];
      setWishlistItems(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = (productId: number): void => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Toggle product in wishlist (add if not present, remove if present)
  const toggleWishlist = (product: Product): void => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Clear the entire wishlist
  const clearWishlist = (): void => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
  };

  return {
    wishlistItems,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length
  };
}