import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterProducts, setProducts } from '../redux/productSlice';
import { RootState, AppDispatch } from '../redux/store/store';
import styles from './productCard.module.css';
import { Link } from 'react-router-dom';
import ButtonsAct from '../likeButton';

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, filter, like, localProducts } = useSelector(
    (state: RootState) => state.product,
  );

  const allProducts = [...products, ...localProducts];

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://dummyjson.com/products?limit=8&skip=10');
      const data = await res.json();
      dispatch(setProducts(data.products));
    }
    fetchData();
  }, [dispatch]);

  const handleFilter = (option: string) => {
    dispatch(setFilterProducts(option));
  };

  const filteredProducts = allProducts.filter((product) => {
    if (filter === 'Избранные') {
      return like[product.id];
    }
    return true;
  });

  return (
    <>
      <h2 className="title">Продукты</h2>
      <div className={styles.btnsFilter}>
        <button
          className={filter === 'Все' ? styles.active : undefined}
          onClick={() => handleFilter('Все')}>
          Все
        </button>
        <button
          className={filter === 'Избранные' ? styles.active : undefined}
          onClick={() => handleFilter('Избранные')}>
          Избранные
        </button>
        <Link to={'/create-product'}>
          <button style={{ marginLeft: '20px' }}>Создать продукт</button>
        </Link>
      </div>
      <div className={styles.cardContainer}>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className={styles.card}>
              <Link to={`/products/${product.id}`}>
                <img src={product.thumbnail} alt="Продукт" />
                <p className={styles.cardDescription}>{product.description}</p>
              </Link>
              <ButtonsAct postId={product.id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
