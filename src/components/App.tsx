import Product from './ProductCard';
import FullProduct from './FullProduct';
import CreateProduct from './CreateProduct';
import { Route, Routes } from 'react-router';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.pathname = '/products';
    }
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<FullProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
