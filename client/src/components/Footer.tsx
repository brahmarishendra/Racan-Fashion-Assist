import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4">
              Racan<span className="text-accent">.</span>
            </h3>
            <p className="text-neutral-300 mb-4">
              Discover your unique style with real-time fashion recommendations tailored to your preferences.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/racan.ai" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://x.com/sigasis_" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Sale</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Collections</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Customer Service</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Subscribe</h4>
            <p className="text-neutral-300 mb-4">
              Sign up for exclusive offers, style updates, and fashion inspiration.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-neutral-400 text-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <Button 
                className="w-full bg-[#FF2D6B] hover:bg-[#FF2D6B]/90 text-white py-2 rounded-lg border-0"
              >
                Subscribe <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-400 text-neutral-300 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Racan. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
