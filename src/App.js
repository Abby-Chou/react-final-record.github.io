import { Routes, Route } from "react-router-dom";
import Login from "./pages/front/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";
import Cakes from "./pages/front/Cakes";
import Pies from "./pages/front/Pies";
import Doughnuts from "./pages/front/Doughnuts";
import Payments from "./pages/front/Payments";
import AdminOrders from "./pages/admin/AdminOrders";
import ScrollToTop from "./ScrollToTop";
import Problems from "./pages/front/Problems";
import CheckOrder from "./pages/front/CheckOrder";
import AllKindsProducts from "./pages/front/AllKindsProducts";

import { useLoading } from "./components/LoadingContext";
import AppProvider from "./components/AppProviders";
import Loading from "./components/Loading";

function GlobalLoading() {
  const { isLoading } = useLoading();
  return <Loading isLoading={isLoading} />;
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route path="" element={<Home />} />
            <Route path="products" element={<Products />}>
              <Route path="allProducts" element={<AllKindsProducts />} />
              <Route path="cakes" element={<Cakes />} />
              <Route path="pies" element={<Pies />} />
              <Route path="doughnuts" element={<Doughnuts />} />
            </Route>
            <Route path="problems" element={<Problems />} />
            <Route path="checkOrder" element={<CheckOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payments" element={<Payments />} />
            <Route path="success/:orderId" element={<Success />} />
          </Route>

          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
        <GlobalLoading />
      </div>
    </AppProvider>
  );
}

export default App;
