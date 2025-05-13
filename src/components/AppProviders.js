import CouponProvider from "./CouponProvider";
import { LoadingProvider } from "./LoadingContext";
import OrderProvider from "./OrderProvider";
import SearchProvider from "./SearchProvider";
import CartQtyProvider from "./CartQtyProvider";

export default function AppProvider({ children }) {
  return (
    <CartQtyProvider>
      <SearchProvider>
        <CouponProvider>
          <LoadingProvider>
            <OrderProvider>{children} </OrderProvider>
          </LoadingProvider>
        </CouponProvider>
      </SearchProvider>
    </CartQtyProvider>
  );
}
