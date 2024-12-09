import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import styles from '../ProductCard/productCard.module.css';
import { setDeleteLocalProduct, setDeleteProduct, setLike } from '../redux/productSlice';
interface ButtonsActProps {
  postId: number;
}
const ButtonsAct: React.FC<ButtonsActProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLiked = useSelector((state: RootState) => state.product.like[postId]);
  const localProducts = useSelector((state: RootState) => state.product.localProducts);

  const findLocalProduct = localProducts.find((p) => p.id === Number(postId));

  const handleLike = () => {
    dispatch(setLike(postId));
  };
  const handleDelete = () => {
    if (findLocalProduct) {
      dispatch(setDeleteLocalProduct(postId));
    } else {
      dispatch(setDeleteProduct(postId));
    }
  };
  return (
    <div className={styles.cardActions}>
      <button className={styles.likeIcon} onClick={handleLike}>
        {isLiked ? '❤️' : '🤍'}
      </button>
      <button className={styles.deleteIcon} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ButtonsAct;
