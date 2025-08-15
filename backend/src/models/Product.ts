import mongoose, { Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  mainImage: string;
  variants: {
    size?: string;
    color?: string;
    stock: number;
    sku: string;
  }[];
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isOnSale: boolean;
  salePercentage?: number;
  rating: number;
  reviewCount: number;
  material?: string;
  care?: string;
  dimensions?: string;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  category: { 
    type: String, 
    required: true, 
    enum: ['Women', 'Men', 'Accessories', 'New Arrivals', 'Sale']
  },
  subcategory: { type: String, trim: true },
  brand: { type: String, required: true, default: "Clo'ne" },
  images: [{ type: String, required: true }],
  mainImage: { type: String, required: true },
  variants: [{
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'] },
    color: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, required: true, unique: true }
  }],
  tags: [{ type: String, trim: true }],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  salePercentage: { type: Number, min: 0, max: 100 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0, min: 0 },
  material: { type: String, trim: true },
  care: { type: String, trim: true },
  dimensions: { type: String, trim: true },
  weight: { type: Number, min: 0 }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product; 