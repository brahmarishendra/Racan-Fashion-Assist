import React from 'react';
import { Link } from 'wouter';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6">Racan</h3>
            <p className="text-neutral-300 mb-6">Your realtime fashion assistant for discovering your unique style.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>

            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Trending Now</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Sale Items</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Collections</a></li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-bold text-lg mb-6">Information</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Fashion Blog</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Style Guide</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Racan. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-auto opacity-70">Visa</div>
            <div className="h-8 w-auto opacity-70">Apple Pay</div>
            <div className="h-8 w-auto opacity-70">PayPal</div>
            <div className="h-8 w-auto opacity-70">Google Pay</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
