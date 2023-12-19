import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/AuthSlice";
import allProductsReducer from "./Redux/ProductsSlice";
import cartReducer from "./Redux/CartSlice"
import shippingReducer from "./Redux/ShippingAddressSlice"
import deliveryReducer from "./Redux/BookedDeliverySlice"
import payingMethodReducer from "./Redux/PayingMethodsSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    products: allProductsReducer,
    cart: cartReducer,
    shippingAddress: shippingReducer,
    deliveryDate: deliveryReducer,
    payingMethod: payingMethodReducer
  },
});
