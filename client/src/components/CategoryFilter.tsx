import { useQuery } from "@tanstack/react-query";
import { Category } from "@/lib/types";
import { Link, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onSelectCategory }: CategoryFilterProps) => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const [, setLocation] = useLocation();

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    onSelectCategory(slug);
    setLocation(`/?category=${slug}`);
  };

  return (
    <section className="py-8 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-2xl font-bold mb-6">Browse Categories</h2>
        <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col items-center space-y-2">
                <Skeleton className="w-20 h-20 md:w-28 md:h-28 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          ) : (
            // Actual categories
            categories?.map((category) => (
              <Link key={category.id} href={`/?category=${category.slug}`}>
                <a 
                  className="category-filter flex-shrink-0 flex flex-col items-center space-y-2 group" 
                  data-category={category.slug}
                  onClick={(e) => handleCategoryClick(e, category.slug)}
                >
                  <div 
                    className={`relative w-20 h-20 md:w-28 md:h-28 bg-neutral-100 rounded-full overflow-hidden ${
                      activeCategory === category.slug ? 'ring-2 ring-accent' : 'group-hover:ring-2 ring-accent'
                    } transition-all`}
                  >
                    <img 
                      src={category.imageUrl}
                      alt={`${category.name} Category`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all"></div>
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </a>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
