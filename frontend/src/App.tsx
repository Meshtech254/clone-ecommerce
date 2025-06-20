import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Product Details</h2>
      <p className="text-lg">Product ID: <span className="font-mono text-blue-600">{id}</span></p>
      <p className="mt-4 text-gray-600">(This is a placeholder page. You can add more details here.)</p>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <li
      className="card p-4 flex flex-col items-start cursor-pointer transition-transform hover:scale-105 focus-within:scale-105 outline-none"
      tabIndex={0}
      onClick={() => navigate(`/product/${product._id}`)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/product/${product._id}`); }}
      aria-label={`View details for ${product.name}`}
    >
      <h4 className="font-bold text-blue-800 text-base sm:text-lg md:text-xl mb-1">{product.name}</h4>
      <p className="text-gray-700 text-sm sm:text-base mb-2">{product.description}</p>
      <p className="text-blue-600 font-semibold text-base sm:text-lg mb-1">${product.price}</p>
      <p className="text-gray-500 text-xs sm:text-sm">Stock: {product.stock}</p>
      <button
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:bg-blue-800 focus:outline-none text-sm font-semibold shadow"
        onClick={e => { e.stopPropagation(); navigate(`/product/${product._id}`); }}
        tabIndex={-1}
      >
        View Details
      </button>
    </li>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-2 sm:py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold vibrant-title text-center">
              Clo'ne
            </h1>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          <div className="max-w-7xl w-full flex-1 mx-auto py-4 px-2 sm:py-6 sm:px-6 lg:px-8 flex flex-col">
            <Routes>
              <Route path="/" element={
                <div className="px-0 py-4 sm:px-2 md:px-8 lg:px-0">
                  <div className="border-4 border-dashed border-blue-300 bg-blue-100/40 rounded-lg h-48 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center animate-pulse">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-700 drop-shadow-lg text-center">
                      Welcome to <span className="vibrant-title">Clo'ne</span>!
                    </h2>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-center">Products</h3>
                    <ul className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </ul>
                  </div>
                </div>
              } />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
