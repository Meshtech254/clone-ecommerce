import express, { Request, Response } from 'express';
import Product from '../models/Product';
import { optionalAuth } from '../middleware/auth';

const router = express.Router();

// Get all products with filtering, search, and pagination
router.get('/', optionalAuth, async (req: any, res: Response) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured,
      newArrival,
      onSale
    } = req.query;

    // Build filter object
    const filter: any = {};
    
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (newArrival === 'true') filter.isNewArrival = true;
    if (onSale === 'true') filter.isOnSale = true;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = { $text: { $search: search } };
    }

    // Combine filters
    const finalFilter = { ...filter, ...searchQuery };

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(finalFilter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('variants');

    const total = await Product.countDocuments(finalFilter);
    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalProducts: total,
        hasNext: Number(page) < totalPages,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get featured products
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .limit(8)
      .populate('variants');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// Get new arrivals
router.get('/new-arrivals', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isNewArrival: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('variants');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch new arrivals' });
  }
});

// Get sale products
router.get('/sale', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isOnSale: true })
      .sort({ salePercentage: -1 })
      .limit(8)
      .populate('variants');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sale products' });
  }
});

// Get products by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find({ category })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('variants');

    const total = await Product.countDocuments({ category });
    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalProducts: total,
        hasNext: Number(page) < totalPages,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category products' });
  }
});

// Get a single product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('variants');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create a new product (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Update a product (admin only)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// Delete a product (admin only)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router; 