import { createSlice } from "@reduxjs/toolkit";

type ProductImg = {
  contentType: String;
  name: String;
  _id: String;
};

type ProductType = {
  price: number;
  productDescription: String;
  productName: String;
  uploadTime: String;
  productImage: Array<ProductImg>;
  _id: String;
};

type cartProduct = {
  product: Array<ProductType>;
};

const initialState: cartProduct = {
  product: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      console.log(action.payload.price , typeof action.payload.price);
      //   let exist = state.product.filter((item) => {
      //     console.log(item._id);
      //     console.log(action.payload._id);
      //     console.log(item._id === action.payload._id);
      //   });
      //   console.log(exist);
      //   if (exist) {
      //     alert("Product already exist in the cart");
      //   }
      state.product.push(action.payload);
    },
    removeCart: (state, action) => {
      state.product = state.product.filter(
        (item) => item._id !== action.payload
      );
    },
    //   toggleTodo: (state, action) => {
    //     const todo = state.list.find((todo) => todo.id === action.payload);
    //     if (todo) {
    //       todo.done = !todo.done;
    //     }
    //   },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
