import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Newspaper,
  User,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth, signOut } from "@/lib/firebase";
import { useWishlist } from "@/hooks/use-wishlist";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  const { wishlistCount } = useWishlist();

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="z-40 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-1.5 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex space-x-4">
              <span>Free shipping on orders over $75</span>
              <span>|</span>
              <span>30-day easy returns</span>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link href="/account">
                    <a className="flex items-center hover:text-white/80">
                      <User className="h-3.5 w-3.5 mr-1" />
                      <span>{currentUser.displayName || "My Account"}</span>
                    </a>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center hover:text-white/80"
                  >
                    <LogOut className="h-3.5 w-3.5 mr-1" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link href="/login">
                  <a className="flex items-center hover:text-white/80">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>Login</span>
                  </a>
                </Link>
              )}
              <Link href="/wishlist">
                <a className="flex items-center hover:text-white/80">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  <span>Wishlist</span>
                </a>
              </Link>
              <div className="flex items-center">
                <Bell className="h-3.5 w-3.5 mr-1" />
                <span>Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <a className="font-playfair text-2xl font-bold tracking-tight text-[#FF2D6B]">
              Racan<span className="text-accent">.</span>
            </a>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for fashion, beauty, skincare..."
                className="w-full py-2 pl-10 pr-4 bg-neutral-100 rounded-full focus:outline-none text-black placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              aria-label="Search"
              className="md:hidden"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </Button>

            {/* News Icon */}
            <Link href="/news">
              <a className="relative flex items-center space-x-1 p-2 hover:text-accent transition-colors text-gray-700">
                <Newspaper className="h-5 w-5" />
                <span className="hidden md:inline text-sm font-medium">
                  News
                </span>
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500">
                  <span className="text-[9px]">3</span>
                </Badge>
              </a>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist">
              <a className="relative flex items-center space-x-1 p-2 hover:text-accent transition-colors text-gray-700">
                <Heart className="h-5 w-5" />
                <span className="hidden md:inline text-sm font-medium">
                  Wishlist
                </span>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-accent">
                    <span className="text-[9px]">{wishlistCount}</span>
                  </Badge>
                )}
              </a>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <a className="relative flex items-center space-x-1 p-2 hover:text-accent transition-colors text-gray-700">
                <ShoppingBag className="h-5 w-5" />
                <span className="hidden md:inline text-sm font-medium">
                  Cart
                </span>
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-accent">
                  <span className="text-[9px]">2</span>
                </Badge>
              </a>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-2"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-neutral-200">
          <ul className="flex space-x-1 py-3">
            <li>
              <Link href="/">
                <a className="font-medium px-3 py-2 hover:text-accent rounded-md hover:bg-neutral-50 transition-colors text-gray-700">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/new">
                <a className="font-medium px-3 py-2 hover:text-accent rounded-md hover:bg-neutral-50 transition-colors text-gray-700">
                  New In
                </a>
              </Link>
            </li>
            <li className="group relative">
              <Link href="/?category=women">
                <a className="font-medium px-4 py-2 hover:text-white hover:bg-accent rounded-md transition-colors flex items-center text-black">
                  Women's Fashion <ChevronDown className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </li>
            <li className="group relative">
              <Link href="/?category=men">
                <a className="font-medium px-4 py-2 hover:text-white hover:bg-accent rounded-md transition-colors flex items-center text-black">
                  Men's Fashion <ChevronDown className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/?category=accessories">
                <a className="font-medium px-3 py-2 hover:text-accent rounded-md hover:bg-neutral-50 transition-colors text-gray-700">
                  Accessories
                </a>
              </Link>
            </li>
            <li>
              <Link href="/?category=beauty">
                <a className="font-medium px-3 py-2 hover:text-accent rounded-md hover:bg-neutral-50 transition-colors text-gray-700">
                  Beauty
                </a>
              </Link>
            </li>
            <li>
              <Link href="/news">
                <a className="font-medium px-3 py-2 text-accent rounded-md hover:bg-neutral-50 transition-colors flex items-center">
                  News{" "}
                  <Badge className="ml-1.5 px-1.5 py-0 text-[10px] bg-red-500">
                    New
                  </Badge>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/?category=sale">
                <a className="font-medium px-3 py-2 text-red-500 rounded-md hover:bg-neutral-50 transition-colors">
                  Sale
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="py-3 md:hidden border-t border-neutral-200">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 bg-neutral-100 rounded-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-700" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="block py-2 font-medium text-gray-700">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/new">
                  <a className="block py-2 font-medium text-gray-700">New In</a>
                </Link>
              </li>
              <li>
                <Link href="/?category=women">
                  <a className="block py-2 font-medium text-gray-700">Women</a>
                </Link>
              </li>
              <li>
                <Link href="/?category=men">
                  <a className="block py-2 font-medium text-gray-700">Men</a>
                </Link>
              </li>
              <li>
                <Link href="/?category=accessories">
                  <a className="block py-2 font-medium text-gray-700">
                    Accessories
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/?category=beauty">
                  <a className="block py-2 font-medium text-gray-700">Beauty</a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="block py-2 font-medium text-accent flex items-center">
                    News <Badge className="ml-2 bg-red-500">New</Badge>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/?category=sale">
                  <a className="block py-2 font-medium text-red-500">Sale</a>
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li>
                    <Link href="/account">
                      <a className="block py-2 font-medium text-gray-700">
                        {currentUser.displayName || "My Account"}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block py-2 font-medium w-full text-left flex items-center text-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">
                    <a className="block py-2 font-medium flex items-center text-gray-700">
                      <User className="h-4 w-4 mr-2" /> Login / Sign up
                    </a>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/wishlist">
                  <a className="block py-2 font-medium text-gray-700">
                    Wishlist
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <a className="block py-2 font-medium text-gray-700">Cart</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
