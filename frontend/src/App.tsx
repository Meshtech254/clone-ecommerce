import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              E-Commerce Store
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <h2 className="text-2xl font-semibold text-gray-600">
                      Welcome to our store!
                    </h2>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold">Products</h3>
                    <ul className="mt-4 space-y-4">
                      {products.map(product => (
                        <li key={product._id} className="bg-white p-4 rounded shadow">
                          <h4 className="font-bold">{product.name}</h4>
                          <p>{product.description}</p>
                          <p className="text-green-600">${product.price}</p>
                          <p className="text-gray-500">Stock: {product.stock}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
