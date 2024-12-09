import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  description: string;
  thumbnail: string;
}

interface LikeState {
  [key: number]: boolean;
}

interface ProductState {
  products: Product[];
  localProducts: Product[];
  productById: Product | null;
  like: LikeState;
  filter: 'Все' | 'Избранные';
}

const initialState: ProductState = {
  products: [],
  localProducts: [],
  productById: null,
  like: {},
  filter: 'Все',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    setProductById(state, action: PayloadAction<Product>) {
      state.productById = action.payload;
    },

    setLike(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.like[id] = !state.like[id];
    },

    setDeleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },

    setDeleteLocalProduct(state, action: PayloadAction<number>) {
      state.localProducts = state.localProducts.filter((product) => product.id !== action.payload);
    },

    setFilterProducts(state, action: PayloadAction<'Все' | 'Избранные'>) {
      state.filter = action.payload;
    },

    setAddProduct(state, action: PayloadAction<Product>) {
      state.localProducts.push(action.payload);
    },
  },
});

export const {
  setProducts,
  setProductById,
  setLike,
  setDeleteProduct,
  setDeleteLocalProduct,
  setFilterProducts,
  setAddProduct,
} = productSlice.actions;

export default productSlice.reducer;
