import React, { useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import logo from './assets/clonelogo.png.jpg.png';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const accentGold = 'text-[#C9B037]';
const accentGoldBg = 'bg-[#C9B037]';
// removed unused accentGoldBorder

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [cartItems, setCartItems] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAuthModal(false);
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-black flex flex-col">
        <Header 
          isAuthenticated={isAuthenticated}
          onAuthClick={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          setAuthMode={setAuthMode}
          cartItems={cartItems}
          onAddToCart={addToCart}
        />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Authentication Modal */}
        {showAuthModal && (
          <AuthModal 
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            onSuccess={() => {
              setIsAuthenticated(true);
              setShowAuthModal(false);
            }}
          />
        )}

        {/* Cart Notification */}
        {showNotification && (
          <div className="fixed top-20 right-6 bg-[#C9B037] text-black px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Item added to cart!</span>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

function Header({ 
  isAuthenticated, 
  onAuthClick, 
  onLogout,
  setAuthMode,
  cartItems,
  onAddToCart
}: { 
  isAuthenticated: boolean; 
  onAuthClick: () => void; 
  onLogout: () => void; 
  setAuthMode: (mode: 'login' | 'register') => void;
  cartItems: number;
  onAddToCart: () => void;
}) {
  return (
    <header className="w-full bg-black border-b border-zinc-800 flex items-center justify-between px-6 md:px-16 py-6 sticky top-0 z-50 backdrop-blur-sm bg-black/95">
      {/* Left: Logo + Tagline */}
      <Link to="/" className="flex items-center gap-4">
        <img src={logo} alt="Clo'ne Logo" className="w-14 h-14 object-contain" />
        <div className="flex flex-col">
          <span className="text-white text-3xl font-bold tracking-widest">Clo'ne</span>
          <span className={`text-sm font-light tracking-widest ${accentGold}`}>EXPERIENCE THE ART</span>
        </div>
      </Link>
      
      {/* Center: Navigation */}
      <nav className="hidden lg:flex flex-1 justify-center gap-12">
        <NavLink 
          to="/" 
          className={({isActive}) => 
            isActive 
              ? `text-white font-semibold ${accentGold}` 
              : 'text-white font-semibold hover:text-[#C9B037] transition-colors duration-300'
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/shop" 
          className={({isActive}) => 
            isActive 
              ? `text-white font-semibold ${accentGold}` 
              : 'text-white font-semibold hover:text-[#C9B037] transition-colors duration-300'
          }
        >
          Shop
        </NavLink>
        <NavLink 
          to="/about" 
          className={({isActive}) => 
            isActive 
              ? `text-white font-semibold ${accentGold}` 
              : 'text-white font-semibold hover:text-[#C9B037] transition-colors duration-300'
          }
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({isActive}) => 
            isActive 
              ? `text-white font-semibold ${accentGold}` 
              : 'text-white font-semibold hover:text-[#C9B037] transition-colors duration-300'
          }
        >
          Contact
        </NavLink>
      </nav>

      {/* Search Bar */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#C9B037] focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Right: Admin Link + Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link 
          to="/admin" 
          className="text-white hover:text-[#C9B037] transition-colors duration-300 font-medium text-sm px-3 py-2 rounded hover:bg-white/10"
        >
          Admin
        </Link>
        
        {/* Shopping Cart Icon */}
        <button className="text-white hover:text-[#C9B037] transition-colors duration-300 p-2 relative" onClick={onAddToCart}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M7 13h10" />
          </svg>
          {/* Cart Badge */}
          <span className="absolute -top-2 -right-2 bg-[#C9B037] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {cartItems}
          </span>
        </button>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-2 text-white hover:text-[#C9B037] transition-colors duration-300">
                <div className="w-8 h-8 bg-[#C9B037] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">U</span>
                </div>
                <span className="text-sm">Account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Wishlist
                  </Link>
                  <hr className="my-2" />
                  <button 
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setAuthMode('login');
                onAuthClick();
              }}
              className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm"
            >
              Sign In
            </button>
            <button 
              onClick={() => {
                setAuthMode('register');
                onAuthClick();
              }}
              className={`${accentGoldBg} text-black px-4 py-2 rounded-lg hover:bg-[#B8A032] transition-colors duration-300 font-semibold text-sm`}
            >
              Register
            </button>
          </div>
        )}
        
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white p-2 ml-2">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

// Authentication Modal Component
function AuthModal({ 
  mode, 
  onClose, 
  onSwitchMode, 
  onSuccess 
}: { 
  mode: 'login' | 'register'; 
  onClose: () => void; 
  onSwitchMode: () => void; 
  onSuccess: () => void; 
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
        alert('Check your email to confirm your account.');
        onSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
        onSuccess();
      }
    } catch (err: any) {
      alert(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9B037] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9B037] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9B037] focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full ${accentGoldBg} text-black py-3 rounded-lg font-semibold hover:bg-[#B8A032] transition-colors duration-300`}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={onSwitchMode}
              className="ml-2 text-[#C9B037] hover:text-[#B8A032] font-medium"
            >
              {mode === 'login' ? 'Register here' : 'Sign in here'}
            </button>
          </p>
        </div>

        
      </div>
    </div>
  );
}

function Home({ onAddToCart }: { onAddToCart: () => void }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#C9B037] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#C9B037] rounded-full blur-3xl"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Clo'ne
          </h1>
          <p className="text-2xl md:text-3xl font-light text-[#C9B037] mb-8 tracking-widest">
            EXPERIENCE THE ART
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover luxury fashion that transcends trends. Each piece tells a story of craftsmanship, 
            elegance, and timeless beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${accentGoldBg} text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8A032] transition-all duration-300 transform hover:scale-105`} onClick={onAddToCart}>
              Shop Collection
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              View Lookbook
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated pieces that define luxury and sophistication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeaturedProductCard 
              name="Elegant Silk Blouse"
              price={189.99}
              originalPrice={249.99}
              image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              category="Women"
              onAddToCart={onAddToCart}
            />
            <FeaturedProductCard 
              name="Classic Wool Blazer"
              price={299.99}
              originalPrice={399.99}
              image="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              category="Men"
              onAddToCart={onAddToCart}
            />
            <FeaturedProductCard 
              name="Leather Crossbody Bag"
              price={159.99}
              originalPrice={199.99}
              image="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              category="Accessories"
              onAddToCart={onAddToCart}
            />
          </div>
          
          <div className="text-center mt-12">
            <button className="border-2 border-black text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <BrandStory />

      {/* Instagram/Lookbook Section */}
      <InstagramSection />

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who have discovered their signature style with Clo'ne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${accentGoldBg} text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8A032] transition-all duration-300`} onClick={onAddToCart}>
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedProductCard({ name, price, originalPrice, image, category, onAddToCart }: { name: string; price: number; originalPrice: number; image: string; category: string; onAddToCart: () => void }) {
  return (
    <div className="group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
        {originalPrice > price && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              SALE
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#C9B037] transition-colors duration-300">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button 
          onClick={onAddToCart}
          className="mt-4 text-white bg-[#C9B037] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8A032] transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function BrandStory() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Artistic Photo */}
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" 
              alt="Clothing Detail" 
              className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Right: Brand Story */}
          <div className="text-gray-900">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-[#C9B037]">
              More Than Clothing
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Clo'ne is a statement of identity and art. We believe that what you wear is an extension of who you are—a canvas for self-expression and creativity. Every piece is crafted with intention, blending timeless elegance with contemporary artistry.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our collections are designed for those who see fashion as more than just clothing, but as a way to tell their story, express their passion, and connect with the world around them.
            </p>
            <button className="inline-flex items-center gap-2 text-lg font-semibold text-[#C9B037] hover:text-[#B8A032] transition-colors duration-300 border-b-2 border-[#C9B037] pb-1">
              Read More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Follow Our Story
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            @clo.ne
          </p>
          <div className="flex justify-center">
            <a href="#" className="text-black hover:text-[#C9B037] transition-colors duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
          ].map((img, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg group cursor-pointer">
              <img 
                src={img} 
                alt={`Instagram ${index + 1}`} 
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shop() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-black text-white py-16">
      <h2 className={`text-3xl font-bold mb-4 ${accentGold}`}>Shop Clo'ne</h2>
      <p className="text-zinc-300 mb-8">Our complete collection is coming soon...</p>
      <Link to="/" className={`px-6 py-3 rounded-full font-bold text-black ${accentGoldBg} hover:bg-white hover:text-[#C9B037] transition-all duration-300`}>
        Back to Home
      </Link>
    </div>
  );
}

function About() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-black text-white py-16">
      <h2 className={`text-3xl font-bold mb-4 ${accentGold}`}>About Clo'ne</h2>
      <p className="text-zinc-300 mb-8 max-w-2xl text-center">
        Clo'ne is more than a brand—it's an experience. Our collections are crafted for those who value authenticity, creativity, and the art of fashion.
      </p>
      <Link to="/" className={`px-6 py-3 rounded-full font-bold text-black ${accentGoldBg} hover:bg-white hover:text-[#C9B037] transition-all duration-300`}>
        Back to Home
      </Link>
    </div>
  );
}

function Contact() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-black text-white py-16">
      <h2 className={`text-3xl font-bold mb-4 ${accentGold}`}>Contact Us</h2>
      <p className="text-zinc-300 mb-8 max-w-2xl text-center">
        Get in touch with our team. We'd love to hear from you and help with any questions about our collections.
      </p>
      <Link to="/" className={`px-6 py-3 rounded-full font-bold text-black ${accentGoldBg} hover:bg-white hover:text-[#C9B037] transition-all duration-300`}>
        Back to Home
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="Clo'ne Logo" className="w-12 h-12 object-contain" />
              <div>
                <span className="text-white text-2xl font-bold tracking-widest">Clo'ne</span>
                <span className={`block text-sm font-light tracking-widest ${accentGold}`}>EXPERIENCE THE ART</span>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Discover luxury fashion that transcends trends. Each piece tells a story of craftsmanship, 
              elegance, and timeless beauty.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#C9B037]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors duration-300">Shop</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#C9B037]">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>hello@clone.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Fashion Ave<br />New York, NY 10001</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Clo'ne. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-[#C9B037] transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C9B037] transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C9B037] transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
