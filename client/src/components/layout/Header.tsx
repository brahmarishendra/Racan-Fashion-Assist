import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu 
} from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="font-display font-bold text-2xl md:text-3xl tracking-tight">
              TRENDR
            </a>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              <Link href="/">
                <a className="font-medium hover:text-accent transition-colors">
                  Home
                </a>
              </Link>
              <Link href="/new-arrivals">
                <a className="font-medium hover:text-accent transition-colors">
                  New Arrivals
                </a>
              </Link>
              <Link href="/collections">
                <a className="font-medium hover:text-accent transition-colors">
                  Collections
                </a>
              </Link>
              <Link href="/about">
                <a className="font-medium hover:text-accent transition-colors">
                  About
                </a>
              </Link>
            </nav>
          )}

          {/* Desktop Actions */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search fashion items..." 
                  className="pl-10 pr-4 py-2 rounded-full bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent w-64 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-neutral-300 h-5 w-5" />
              </form>
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                <User className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
              </button>
            </div>
          )}

          {/* Mobile Controls */}
          {isMobile && (
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
              </button>
              <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="bg-white py-4 px-4 shadow-md modal-fade-in">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a className="font-medium py-2 px-4 hover:bg-neutral-100 rounded-lg transition-colors">Home</a>
            </Link>
            <Link href="/new-arrivals">
              <a className="font-medium py-2 px-4 hover:bg-neutral-100 rounded-lg transition-colors">New Arrivals</a>
            </Link>
            <Link href="/collections">
              <a className="font-medium py-2 px-4 hover:bg-neutral-100 rounded-lg transition-colors">Collections</a>
            </Link>
            <Link href="/about">
              <a className="font-medium py-2 px-4 hover:bg-neutral-100 rounded-lg transition-colors">About</a>
            </Link>
            <div className="pt-2 border-t border-neutral-200">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search fashion items..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 text-neutral-300 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;