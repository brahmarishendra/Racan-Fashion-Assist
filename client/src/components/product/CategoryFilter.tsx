import React, { useState } from 'react';
import { X, Filter, Sliders } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Slider } from '@/components/ui/slider';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([20, 200]);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('S');

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilters = () => {
    setIsFilterOpen(false);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'shoes', name: 'Shoes' }
  ];

  const colors = [
    { id: 'black', color: 'bg-black' },
    { id: 'white', color: 'bg-white border border-neutral-300' },
    { id: 'red', color: 'bg-red-500' },
    { id: 'blue', color: 'bg-blue-500' },
    { id: 'green', color: 'bg-green-500' },
    { id: 'yellow', color: 'bg-yellow-500' },
    { id: 'purple', color: 'bg-purple-500' },
    { id: 'pink', color: 'bg-pink-500' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const renderFilterButton = () => (
    <button 
      onClick={toggleFilters}
      className="md:hidden px-4 py-2 bg-neutral-100 rounded-lg flex items-center space-x-2"
    >
      <Filter className="h-4 w-4" />
      <span>Filters</span>
    </button>
  );

  const filterClasses = `
    fixed md:static inset-y-0 left-0 w-[280px] md:w-64 
    bg-white md:bg-transparent p-6 md:p-0 
    shadow-lg md:shadow-none z-40 
    transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
    filters-transition
  `;

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold">Browse Collection</h2>
        {isMobile && renderFilterButton()}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={filterClasses}>
          {isMobile && (
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={closeFilters} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          
          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="flex flex-col space-y-2">
              {categories.map(category => (
                <button 
                  key={category.id}
                  data-category={category.id}
                  className={`px-4 py-2 ${
                    activeCategory === category.id 
                      ? 'bg-accent text-white' 
                      : 'bg-neutral-100 text-primary hover:bg-neutral-200'
                  } rounded-lg text-left transition-colors`}
                  onClick={() => onCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Price Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={priceRange} 
                max={300} 
                min={0} 
                step={10}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex justify-between mt-4">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          {/* Color Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button 
                  key={color.id}
                  className={`w-8 h-8 rounded-full ${color.color} 
                    ${selectedColor === color.id ? 'ring-2 ring-accent ring-offset-2' : ''} 
                    active:scale-95 transition-transform`}
                  aria-label={color.id}
                  onClick={() => handleColorSelect(color.id)}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Size Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button 
                  key={size}
                  className={`w-10 h-10 rounded-lg ${
                    selectedSize === size 
                      ? 'bg-accent text-white' 
                      : 'bg-white border border-neutral-300 hover:bg-neutral-100'
                  } flex items-center justify-center active:scale-95 transition-all`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Apply Filters Button (Mobile Only) */}
          {isMobile && (
            <div>
              <button 
                onClick={closeFilters}
                className="w-full py-3 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>


      </div>
    </>
  );
};

export default CategoryFilter;
