import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductPage from "@/pages/ProductPage";
import NewsPage from "@/pages/NewsPage";
import LoginPage from "@/pages/LoginPage";
import WishlistPage from "@/pages/WishlistPage";
import "./components/ui/theme.css";
import logoPath from "@assets/Logo.png";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function FloatingAIButton() {
  return (
    <a 
      href="https://racan.vercel.app/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed left-6 bottom-6 z-50 w-12 h-12 rounded-none bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl hover:transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
      title="Get AI fashion recommendations"
    >
      <div className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c1.2 0 2.3.4 3.2 1.2a8 8 0 0 1 3 10.6 10 10 0 0 1-2.4 3.2A10 10 0 0 1 12 19a10 10 0 0 1-3.8-2 10 10 0 0 1-2.4-3.2A8 8 0 0 1 8.8 3.2 8 8 0 0 1 12 2z"/>
          <path d="M16 16.5v-.5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v.5"/>
          <path d="M8.5 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/>
          <path d="M15.5 9a1.5 1.5 0 1 0-3 0 1.5 1.5 0 1 0 3 0"/>
          <path d="M7 13h10"/>
        </svg>
      </div>
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500"></span>
      </span>
    </a>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <FloatingAIButton />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
