import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  news, type News, type InsertNews,
  type Recommendation
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // News methods
  getAllNews(): Promise<News[]>;
  getNewsByCategory(category: string): Promise<News[]>;
  getFeaturedNews(): Promise<News[]>;
  getTrendingNews(): Promise<News[]>;
  
  // Recommendation methods
  getRecommendations(userPreferences?: string[]): Promise<Recommendation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private news: Map<number, News>;
  currentId: number;
  private productId: number;
  private categoryId: number;
  private newsId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.news = new Map();
    this.currentId = 1;
    this.productId = 1;
    this.categoryId = 1;
    this.newsId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === 'all') {
      return this.getAllProducts();
    }
    
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }
  
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }
  
  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }
  
  async getNewsByCategory(category: string): Promise<News[]> {
    if (category === 'all') {
      return this.getAllNews();
    }
    
    return Array.from(this.news.values()).filter(
      newsItem => newsItem.category === category
    );
  }
  
  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.news.values()).filter(
      newsItem => newsItem.featured
    );
  }
  
  async getTrendingNews(): Promise<News[]> {
    return Array.from(this.news.values()).filter(
      newsItem => newsItem.isTrending
    );
  }
  
  async getRecommendations(userPreferences: string[] = []): Promise<Recommendation[]> {
    // Simple recommendation algorithm
    const allProducts = await this.getAllProducts();
    const recommendations: Recommendation[] = [];
    
    const assignMatchPercentage = (product: Product): Recommendation => {
      let matchPercentage = Math.floor(Math.random() * 20) + 80; // 80-99%
      
      // If user has preferences, boost matching products
      if (userPreferences.length > 0 && 
          (userPreferences.includes(product.category) || 
           product.isTrending)) {
        matchPercentage += 5;
        if (matchPercentage > 99) matchPercentage = 99;
      }
      
      const reasons = [
        "Based on your browsing history",
        "Matches your style preferences",
        "Popular with customers like you",
        "Complements your previous purchases",
        "Perfect for your collection"
      ];
      
      return {
        ...product,
        matchPercentage,
        recommendationReason: reasons[Math.floor(Math.random() * reasons.length)]
      };
    };
    
    // Get trending items first
    const trendingItems = allProducts
      .filter(product => product.isTrending)
      .map(assignMatchPercentage);
      
    // Get other items
    const otherItems = allProducts
      .filter(product => !product.isTrending)
      .map(assignMatchPercentage);
    
    // Combine and sort by match percentage
    return [...trendingItems, ...otherItems]
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6); // Return top 6 recommendations
  }
  
  private initializeData() {
    // Initialize categories
    const categoryData: InsertCategory[] = [
      {
        name: "All",
        slug: "all",
        imageUrl: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Men",
        slug: "men",
        imageUrl: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Women",
        slug: "women",
        imageUrl: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Tops",
        slug: "tops",
        imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Bottoms",
        slug: "bottoms",
        imageUrl: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Dresses",
        slug: "dresses",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Outerwear",
        slug: "outerwear",
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Shoes",
        slug: "shoes",
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Accessories",
        slug: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    ];
    
    categoryData.forEach(category => {
      const id = this.categoryId++;
      this.categories.set(id, { ...category, id });
    });
    
    // Initialize products
    const productData: InsertProduct[] = [
      {
        name: "Silk Blend White Blouse",
        description: "Elegant white blouse made from silk blend material, perfect for professional and casual outfits.",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "tops",
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Off-white", hex: "#F5F5F5" }]
      },
      {
        name: "Floral Summer Midi Dress",
        description: "Beautiful floral print midi dress, perfect for summer days and special occasions.",
        price: 125.00,
        imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "dresses",
        rating: 4.7,
        reviewCount: 98,
        inStock: true,
        isNew: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "Floral", hex: "#MULTI" }]
      },
      {
        name: "High-Rise Slim Fit Jeans",
        description: "Classic high-rise jeans with a slim fit silhouette, made from premium denim.",
        price: 79.95,
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "bottoms",
        rating: 4.9,
        reviewCount: 215,
        inStock: true,
        sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
        colors: [{ name: "Blue Denim", hex: "#1E3F66" }, { name: "Black", hex: "#000000" }]
      },
      {
        name: "Classic Canvas Sneakers",
        description: "Timeless canvas sneakers that go with everything, featuring a comfortable rubber sole.",
        price: 64.99,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "shoes",
        rating: 4.5,
        reviewCount: 187,
        inStock: true,
        sizes: ["5", "6", "7", "8", "9", "10", "11"],
        colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }, { name: "Red", hex: "#FF0000" }]
      },
      {
        name: "Vintage Leather Moto Jacket",
        description: "Classic moto-inspired jacket crafted from premium leather with authentic vintage details. Features asymmetrical front zip, snap-down lapels and multiple pockets.",
        price: 249.99,
        originalPrice: 299.99,
        discount: 17,
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        thumbnailUrls: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1509087859087-a384654eca4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        ],
        category: "outerwear",
        rating: 4.9,
        reviewCount: 124,
        inStock: true,
        isTrending: true,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
          { name: "Brown", hex: "#3c2a21" },
          { name: "Black", hex: "#000000" },
          { name: "Taupe", hex: "#827667" }
        ]
      },
      {
        name: "Gold-Plated Bracelet Set",
        description: "Elegant set of gold-plated bracelets with a mix of designs, perfect for layering.",
        price: 45.00,
        imageUrl: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "accessories",
        rating: 4.6,
        reviewCount: 93,
        inStock: true,
        colors: [{ name: "Gold", hex: "#FFD700" }]
      },
      {
        name: "Elegant Black Cocktail Dress",
        description: "Timeless black cocktail dress with a flattering silhouette, perfect for formal events.",
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "dresses",
        rating: 4.8,
        reviewCount: 156,
        inStock: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "Black", hex: "#000000" }]
      },
      {
        name: "Oversized Chunky Knit Sweater",
        description: "Cozy oversized sweater with chunky knit pattern, perfect for layering in colder weather.",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "tops",
        rating: 4.7,
        reviewCount: 112,
        inStock: true,
        isNew: true,
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "Cream", hex: "#F5F5DC" }, 
          { name: "Grey", hex: "#808080" },
          { name: "Navy", hex: "#000080" }
        ]
      },
      {
        name: "Tailored Slim Fit Blazer",
        description: "Tailored slim fit blazer made from premium fabric, perfect for professional settings.",
        price: 189.99,
        imageUrl: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "outerwear",
        rating: 4.9,
        reviewCount: 78,
        inStock: true,
        sizes: ["36", "38", "40", "42", "44", "46"],
        colors: [
          { name: "Navy", hex: "#000080" },
          { name: "Black", hex: "#000000" },
          { name: "Grey", hex: "#808080" }
        ]
      },
      {
        name: "Premium Cashmere Scarf",
        description: "Luxurious cashmere scarf that provides ultimate softness and warmth during cold weather.",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "accessories",
        rating: 4.8,
        reviewCount: 64,
        inStock: true,
        colors: [
          { name: "Camel", hex: "#C19A6B" },
          { name: "Grey", hex: "#808080" },
          { name: "Black", hex: "#000000" }
        ]
      },
      {
        name: "Canvas Tote Bag",
        description: "Durable canvas tote bag with practical design, perfect for everyday use and shopping.",
        price: 45.00,
        imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "accessories",
        rating: 4.7,
        reviewCount: 89,
        inStock: true,
        colors: [
          { name: "Natural", hex: "#F5F5DC" },
          { name: "Black", hex: "#000000" }
        ]
      },
      {
        name: "Vintage Round Sunglasses",
        description: "Stylish round sunglasses with UV protection and vintage-inspired design.",
        price: 59.95,
        imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "accessories",
        rating: 4.6,
        reviewCount: 102,
        inStock: true,
        colors: [
          { name: "Black", hex: "#000000" },
          { name: "Tortoise", hex: "#8B4513" }
        ]
      },
      // Men's Products
      {
        name: "Slim Fit Dress Shirt",
        description: "A tailored slim-fit dress shirt made from premium cotton with a crisp finish.",
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "men",
        subCategory: "shirts",
        rating: 4.7,
        reviewCount: 112,
        inStock: true,
        isNew: true,
        isTrending: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Light Blue", hex: "#ADD8E6" },
          { name: "Black", hex: "#000000" }
        ]
      },
      {
        name: "Stretch Chino Pants",
        description: "Comfortable stretch chino pants with a modern fit, perfect for work or casual occasions.",
        price: 69.99,
        imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "men",
        subCategory: "pants",
        rating: 4.5,
        reviewCount: 87,
        inStock: true,
        isNew: false,
        isTrending: false,
        sizes: ["30x30", "32x30", "34x30", "36x30", "38x30", "40x30"],
        colors: [
          { name: "Khaki", hex: "#C3B091" },
          { name: "Navy", hex: "#000080" },
          { name: "Olive", hex: "#808000" },
          { name: "Black", hex: "#000000" }
        ]
      },
      {
        name: "Wool Blend Overcoat",
        description: "A sophisticated wool blend overcoat with a classic silhouette and modern details.",
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "men",
        subCategory: "outerwear",
        rating: 4.9,
        reviewCount: 62,
        inStock: true,
        isNew: true,
        isTrending: true,
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "Camel", hex: "#C19A6B" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Black", hex: "#000000" }
        ]
      },
      {
        name: "Premium Leather Belt",
        description: "A high-quality leather belt with a classic buckle, crafted for durability and style.",
        price: 49.99,
        originalPrice: 69.99,
        discount: 29,
        imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60fe8c1?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "men",
        subCategory: "accessories",
        rating: 4.6,
        reviewCount: 48,
        inStock: true,
        isNew: false,
        isTrending: false,
        sizes: ["32", "34", "36", "38", "40", "42"],
        colors: [
          { name: "Brown", hex: "#964B00" },
          { name: "Black", hex: "#000000" }
        ]
      },
      {
        name: "Floral Maxi Dress",
        description: "Elegant floral print maxi dress perfect for summer occasions",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "women",
        subCategory: "dresses",
        rating: 4.8,
        reviewCount: 156,
        inStock: true,
        isNew: true,
        isTrending: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
          { name: "Blue Floral", hex: "#4A90E2" },
          { name: "Pink Floral", hex: "#FF69B4" }
        ]
      },
      {
        name: "High-Waisted Palazzo Pants",
        description: "Comfortable and stylish high-waisted palazzo pants",
        price: 65.99,
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "women",
        subCategory: "pants",
        rating: 4.7,
        reviewCount: 89,
        inStock: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#000080" }
        ]
      },
      {
        name: "Silk Blouse",
        description: "Luxurious silk blouse with elegant design",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "women",
        subCategory: "tops",
        rating: 4.9,
        reviewCount: 67,
        inStock: true,
        isNew: true,
        sizes: ["XS", "S", "M", "L"],
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Cream", hex: "#FFFDD0" }
        ]
      }
    ];
    
    productData.forEach(product => {
      const id = this.productId++;
      this.products.set(id, { ...product, id });
    });
    
    // Initialize news data
    const newsData: InsertNews[] = [
      {
        title: "Sustainable Fashion Takes Center Stage at Paris Fashion Week",
        excerpt: "Designers showcase eco-friendly collections with innovative materials and ethical manufacturing processes.",
        imageUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&h=600&fit=crop",
        category: "fashion",
        date: "2025-03-25",
        readTime: "5 min read",
        isTrending: true,
        featured: true
      },
      {
        title: "New Research Shows Benefits of Natural Skincare Ingredients",
        excerpt: "Study reveals that plant-based ingredients can be more effective than synthetic alternatives for sensitive skin types.",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
        category: "skincare",
        date: "2025-03-22",
        readTime: "4 min read",
        isTrending: false,
        featured: true
      },
      {
        title: "Top Beauty Trends to Watch in Spring 2025",
        excerpt: "From dewy skin to bold pastels, these are the makeup looks that will dominate the season.",
        imageUrl: "https://picsum.photos/800/600?random=3",
        category: "beauty",
        date: "2025-03-20",
        readTime: "3 min read",
        isTrending: true,
        featured: false
      },
      {
        title: "Street Style Report: How Gen Z is Redefining Fashion",
        excerpt: "The latest street style trends show how younger consumers are mixing vintage with modern pieces.",
        imageUrl: "https://picsum.photos/800/600?random=4",
        category: "fashion",
        date: "2025-03-18",
        readTime: "6 min read",
        isTrending: true,
        featured: false
      },
      {
        title: "The Benefits of Multi-Step Skincare Routines",
        excerpt: "Dermatologists explain why layering products can lead to better results for all skin types.",
        imageUrl: "https://picsum.photos/800/600?random=5",
        category: "skincare",
        date: "2025-03-15",
        readTime: "5 min read",
        isTrending: false,
        featured: false
      },
      {
        title: "Clean Beauty: What It Really Means and Why It Matters",
        excerpt: "Experts weigh in on the definition of clean beauty and how to navigate product claims.",
        imageUrl: "https://picsum.photos/800/600?random=6",
        category: "beauty",
        date: "2025-03-12",
        readTime: "4 min read",
        isTrending: false,
        featured: false
      }
    ];
    
    newsData.forEach(newsItem => {
      const id = this.newsId++;
      this.news.set(id, { ...newsItem, id, createdAt: new Date() });
    });
  }
}

export const storage = new MemStorage();
