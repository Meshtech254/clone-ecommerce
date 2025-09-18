import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import User from './models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clone-ecommerce';

const sampleProducts = [
  {
    name: "Elegant Silk Blouse",
    description: "A luxurious silk blouse with intricate detailing and perfect drape. Perfect for both professional and evening wear.",
    price: 189.99,
    originalPrice: 249.99,
    category: "Women",
    subcategory: "Tops",
    brand: "Clo'ne",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=thumb&w=400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=thumb&w=400&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=thumb&w=400&q=80",
    variants: [
      { size: "XS", color: "Ivory", stock: 15, sku: "SILK-BLOUSE-001-XS-IVORY" },
      { size: "S", color: "Ivory", stock: 20, sku: "SILK-BLOUSE-001-S-IVORY" },
      { size: "M", color: "Ivory", stock: 25, sku: "SILK-BLOUSE-001-M-IVORY" },
      { size: "L", color: "Ivory", stock: 18, sku: "SILK-BLOUSE-001-L-IVORY" }
    ],
    tags: ["silk", "blouse", "elegant", "professional", "evening"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    salePercentage: 24,
    rating: 4.8,
    reviewCount: 127,
    material: "100% Silk",
    care: "Dry clean only"
  },
  {
    name: "Classic Wool Blazer",
    description: "A timeless wool blazer that exudes sophistication. Tailored to perfection with premium Italian wool.",
    price: 299.99,
    category: "Men",
    subcategory: "Outerwear",
    brand: "Clo'ne",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=thumb&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=thumb&w=400&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=thumb&w=400&q=80",
    variants: [
      { size: "S", color: "Navy", stock: 12, sku: "WOOL-BLAZER-001-S-NAVY" },
      { size: "M", color: "Navy", stock: 18, sku: "WOOL-BLAZER-001-M-NAVY" },
      { size: "L", color: "Navy", stock: 15, sku: "WOOL-BLAZER-001-L-NAVY" },
      { size: "XL", color: "Navy", stock: 10, sku: "WOOL-BLAZER-001-XL-NAVY" }
    ],
    tags: ["wool", "blazer", "classic", "tailored", "professional"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
    rating: 4.9,
    reviewCount: 89,
    material: "100% Italian Wool",
    care: "Dry clean only"
  },
  {
    name: "Leather Crossbody Bag",
    description: "Handcrafted leather crossbody bag with premium hardware. Perfect size for everyday essentials.",
    price: 159.99,
    category: "Accessories",
    subcategory: "Bags",
    brand: "Clo'ne",
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=thumb&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=thumb&w=400&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=thumb&w=400&q=80",
    variants: [
      { size: "One Size", color: "Cognac", stock: 25, sku: "LEATHER-BAG-001-ONESIZE-COGNAC" },
      { size: "One Size", color: "Black", stock: 30, sku: "LEATHER-BAG-001-ONESIZE-BLACK" }
    ],
    tags: ["leather", "crossbody", "handcrafted", "premium", "everyday"],
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    rating: 4.7,
    reviewCount: 56,
    material: "Genuine Leather",
    care: "Clean with leather conditioner"
  },
  {
    name: "Cashmere Sweater",
    description: "Ultra-soft cashmere sweater with a modern fit. Available in seasonal colors with timeless appeal.",
    price: 249.99,
    originalPrice: 299.99,
    category: "Women",
    subcategory: "Sweaters",
    brand: "Clo'ne",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=thumb&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=thumb&w=400&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=thumb&w=400&q=80",
    variants: [
      { size: "XS", color: "Camel", stock: 8, sku: "CASHMERE-SWEATER-001-XS-CAMEL" },
      { size: "S", color: "Camel", stock: 15, sku: "CASHMERE-SWEATER-001-S-CAMEL" },
      { size: "M", color: "Camel", stock: 20, sku: "CASHMERE-SWEATER-001-M-CAMEL" },
      { size: "L", color: "Camel", stock: 12, sku: "CASHMERE-SWEATER-001-L-CAMEL" }
    ],
    tags: ["cashmere", "sweater", "ultra-soft", "modern", "seasonal"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    salePercentage: 17,
    rating: 4.9,
    reviewCount: 203,
    material: "100% Cashmere",
    care: "Hand wash cold, lay flat to dry"
  }
];

const sampleUsers = [
  {
    name: "Demo User",
    email: "demo@clone.com",
    password: "demo123"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${users.length} users`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Sample Data Summary:');
    console.log(`   Products: ${products.length}`);
    console.log(`   Users: ${users.length}`);
    console.log('\n🔑 Demo Login:');
    console.log(`   Email: demo@clone.com`);
    console.log(`   Password: demo123`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();


