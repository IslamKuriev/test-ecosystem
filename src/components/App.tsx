import Product from './ProductCard';
import FullProduct from './FullProduct';
import CreateProduct from './CreateProduct';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products/:id" element={<FullProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
