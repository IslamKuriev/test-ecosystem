import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { setAddProduct } from '../redux/productSlice';
import styles from './createProduct.module.css';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !image) {
      alert('Заполните все поля и выберите изображение.');
      return;
    }

    dispatch(
      setAddProduct({
        id: Date.now(),
        description,
        thumbnail: image,
      }),
    );

    setDescription('');
    setImage(null);

    navigate('/products');
  };

  return (
    <div className={styles.container}>
      <Link to={'/products'}>
        <button>Назад</button>
      </Link>
      <h1>Создать продукт</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание продукта"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Изображение:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Preview" className={styles.imgPreview} />}
        </div>

        <button type="submit">Добавить продукт</button>
      </form>
    </div>
  );
};

export default CreateProduct;
