import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer, WebSocket } from "ws";
import { z } from "zod";

interface Client {
  ws: WebSocket;
  id: string;
  preferences: string[];
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Set up WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store connected clients
  const clients: Map<string, Client> = new Map();
  
  wss.on('connection', (ws) => {
    const clientId = Math.random().toString(36).substring(2, 15);
    clients.set(clientId, { ws, id: clientId, preferences: [] });
    
    console.log(`Client connected: ${clientId}`);
    
    // Send initial recommendations
    sendRecommendations(clientId);
    
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'updatePreferences') {
          const client = clients.get(clientId);
          if (client) {
            client.preferences = data.preferences || [];
            clients.set(clientId, client);
            
            // Send updated recommendations
            sendRecommendations(clientId);
          }
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
    
    ws.on('close', () => {
      clients.delete(clientId);
      console.log(`Client disconnected: ${clientId}`);
    });
  });
  
  // Function to send recommendations to a client
  async function sendRecommendations(clientId: string) {
    const client = clients.get(clientId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      const recommendations = await storage.getRecommendations(client.preferences);
      client.ws.send(JSON.stringify({
        type: 'recommendations',
        data: recommendations
      }));
    }
  }
  
  // API Routes
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      let products;
      
      if (category) {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });
  
  app.get('/api/products/:id', async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  });
  
  app.get('/api/categories', async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  });
  
  app.get('/api/search', async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }
      
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error searching products' });
    }
  });
  
  app.get('/api/recommendations', async (_req: Request, res: Response) => {
    try {
      const recommendations = await storage.getRecommendations();
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recommendations' });
    }
  });
  
  // News endpoints
  app.get('/api/news', async (_req: Request, res: Response) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ message: 'Error fetching news' });
    }
  });
  
  app.get('/api/news/category/:category', async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const news = await storage.getNewsByCategory(category);
      res.json(news);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      res.status(500).json({ message: 'Error fetching news by category' });
    }
  });
  
  app.get('/api/news/featured', async (_req: Request, res: Response) => {
    try {
      const featuredNews = await storage.getFeaturedNews();
      res.json(featuredNews);
    } catch (error) {
      console.error('Error fetching featured news:', error);
      res.status(500).json({ message: 'Error fetching featured news' });
    }
  });
  
  app.get('/api/news/trending', async (_req: Request, res: Response) => {
    try {
      const trendingNews = await storage.getTrendingNews();
      res.json(trendingNews);
    } catch (error) {
      console.error('Error fetching trending news:', error);
      res.status(500).json({ message: 'Error fetching trending news' });
    }
  });

  return httpServer;
}
