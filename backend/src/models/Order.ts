import mongoose, { Document } from 'mongoose';

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  variant: {
    size?: string;
    color?: string;
    sku: string;
  };
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: {
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'] },
    color: { type: String, trim: true },
    sku: { type: String, required: true }
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  name: { type: String, required: true },
  image: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  subtotal: { type: Number, required: true, min: 0 },
  tax: { type: Number, required: true, min: 0, default: 0 },
  shipping: { type: Number, required: true, min: 0, default: 0 },
  total: { type: Number, required: true, min: 0 },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'United States' }
  },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'United States' }
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  trackingNumber: { type: String },
  estimatedDelivery: { type: Date },
  notes: { type: String }
}, {
  timestamps: true
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.tax = this.subtotal * 0.08; // 8% tax rate
  this.shipping = this.subtotal > 200 ? 0 : 15; // Free shipping over $200
  this.total = this.subtotal + this.tax + this.shipping;
  next();
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;

