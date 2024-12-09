// import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { setProductById } from '../redux/productSlice';
import styles from './fullProduct.module.css';
import { Link, useParams } from 'react-router';

const FullProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productById, localProducts } = useSelector((state: RootState) => state.product);

  const { id } = useParams();
  const findLocalProduct = localProducts.find((p) => p.id === Number(id));
  useEffect(() => {
    if (findLocalProduct) {
      dispatch(setProductById(findLocalProduct));
    } else {
      async function fetchData() {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        dispatch(setProductById(data));
      }
      fetchData();
    }
  }, [dispatch, id, findLocalProduct]);

  if (!productById) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Продукт</h2>
      <div className={styles.card}>
        <img src={productById.thumbnail} alt="Img" />
        <p className={styles.cardDescription}>{productById.description}</p>
      </div>
      <Link to={'/products'}>
        <button className={styles.btnExit}>Назад</button>
      </Link>
    </>
  );
};

export default FullProduct;
