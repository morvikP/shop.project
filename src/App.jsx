import "./assets/css/footer.css";
import "./assets/css/header.css";
import "./assets/css/style.css";
import "./assets/css/item.css";
import "./assets/css/cataloge.css";
import "./assets/css/category.css";
import "./assets/css/login.css";
import "./assets/css/error.css";
import "./assets/css/loader.css"

import React, { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Item from "./pages/Item";
import Cataloge from "./pages/cataloge";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favourite from "./pages/Favourite";
import AdminProducts from "./pages/AdminProducts";
import Error from "./components/Error";

import {
  CART,
  CATALOGE,
  CATEGORY,
  CHECKOUT,
  FAVOURITE,
  HOME,
  ITEM,
  LOGIN,
  SIGNUP
} from "./utils/const";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <main>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={CATALOGE} element={<Cataloge />} />
          <Route path={CATEGORY} element={<Category />} />
          <Route path={`${ITEM}/:id`} element={<Item />} />
          <Route path={ITEM} element={<div>Выберите товар</div>} />
          <Route path="*" element={<Error />} />
          <Route path={CART} element={<Cart />} />
          <Route path={CHECKOUT} element={<Checkout />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={SIGNUP} element={<Signup />} />
          <Route path={FAVOURITE} element={<Favourite />} />
          <Route path="/admin" element={<AdminProducts />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
