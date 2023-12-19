import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LoginForm from "./Components/Forms/LoginForm";
import RegisterScreen from "./Screens/RegisterScreen";
import { useSelector } from "react-redux";
import MainScreen from "./Screens/MainScreen";
import ProductScreen from "./Screens/ProductScreen";
import TransportScreen from "./Screens/TransportScreen";
import ContactScreen from "./Screens/ContactScreen";
import AccountScreen from "./Screens/AccountScreen";
import ManagementScreen from "./Screens/ManagementScreen";
import ShowProductsManagementScreen from "./Components/ShowProductsManagementScreen";
import AppendProductScreen from "./Screens/AppendProductScreen";
import ProductToEditDetailsScreen from "./Screens/ProductToEditDetailsScreen";
import ResourcesScreen from "./Screens/ResourcesScreen";
import CartScreen from "./Screens/CartScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";

const AppRouter = () => {
  const { token } = useSelector((state) => state.auth.userData);
  const isAuth = () => {
    if (token !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuth() ? <MainScreen /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isAuth() ? <Navigate to="/" /> : <LoginForm />,
    },
    {
      path: "/register",
      element: isAuth() ? <Navigate to="/" /> : <RegisterScreen />,
    },
    {
      path: "/product/:id",
      element: isAuth() ? <ProductScreen /> : <Navigate to="/login" />,
    },
    {
      path: "/transport",
      element: isAuth() ? <TransportScreen /> : <Navigate to="/login" />,
    },
    {
      path: "/kontakt",
      element: isAuth() ? <ContactScreen /> : <Navigate to="/login" />,
    },
    {
      path: "/management",
      element: isAuth() ? <ManagementScreen /> : <Navigate to="/login" />,
    },
    {
      path: "wyswietl_produkty",
      element: isAuth() ? <ShowProductsManagementScreen /> : <Navigate to="/login" />
    },
    {
      path: "dodaj_produkt",
      element: isAuth() ? <AppendProductScreen /> : <Navigate to="/login" />
    },
    {
      path: "edytuj_produkt/:id",
      element: isAuth() ? <ProductToEditDetailsScreen /> : <Navigate to="/login" />
    },
    {
      path: "wyswietl_pracownikow",
      element: isAuth() ? <ResourcesScreen /> : <Navigate to="/login" />
    },
    {
      path: "cart",
      element: isAuth() ? <CartScreen /> : <Navigate to="/login" />
    },
    {
      path: "konto",
      element: isAuth() ? <AccountScreen /> : <Navigate to="/login" />
    },
    {
      path: "wysylka",
      element: isAuth() ? <ShippingScreen /> : <Navigate to="/login" />
    }
    ,
    {
      path: "platnosc",
      element: isAuth() ? <PaymentScreen /> : <Navigate to="/login" />
    },
    {
      path: "podsumowanie",
      element: isAuth() ? <PlaceOrderScreen /> : <Navigate to="/login" />
    }
  ]);
  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
