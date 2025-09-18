import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import Order from '../models/Order';
import Product from '../models/Product';

const router = express.Router();

// Get user's orders
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get a specific order
router.get('/:id', auth, async (req: any, res: Response) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create a new order (checkout)
router.post('/', auth, async (req: any, res: Response) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;
    
    // Validate items and check stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.name} not found` });
      }
      
      // Find the specific variant
      const variant = product.variants.find(v => v.sku === item.variant.sku);
      if (!variant || variant.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${item.name}` });
      }
    }
    
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod
    });
    
    await order.save();
    
    // Update product stock
    for (const item of items) {
      await Product.updateOne(
        { 'variants.sku': item.variant.sku },
        { $inc: { 'variants.$.stock': -item.quantity } }
      );
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', auth, async (req: any, res: Response) => {
  try {
    const { status, trackingNumber, estimatedDelivery } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        trackingNumber, 
        estimatedDelivery,
        ...(status === 'shipped' && { estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
      },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order' });
  }
});

// Cancel order
router.patch('/:id/cancel', auth, async (req: any, res: Response) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot cancel order in current status' });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    // Restore product stock
    for (const item of order.items) {
      await Product.updateOne(
        { 'variants.sku': item.variant.sku },
        { $inc: { 'variants.$.stock': item.quantity } }
      );
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to cancel order' });
  }
});

export default router;

