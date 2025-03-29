import { pgTable, text, serial, integer, boolean, jsonb, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  originalPrice: real("original_price"),
  discount: real("discount"),
  imageUrl: text("image_url").notNull(),
  thumbnailUrls: text("thumbnail_urls").array(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  inStock: boolean("in_stock").default(true),
  isNew: boolean("is_new").default(false),
  isTrending: boolean("is_trending").default(false),
  sizes: text("sizes").array(),
  colors: jsonb("colors"),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true
});

// Category schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// News schema
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  date: text("date").notNull(),
  readTime: text("read_time").notNull(),
  isTrending: boolean("is_trending").default(false),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  createdAt: true
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Recommendation type
export interface Recommendation extends Product {
  matchPercentage: number;
  recommendationReason: string;
}
