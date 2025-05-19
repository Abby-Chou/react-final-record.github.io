import CouponProvider from "./CouponProvider";
import { LoadingProvider } from "./LoadingContext";
import OrderProvider from "./OrderProvider";
import SearchProvider from "./SearchProvider";
import CartQtyProvider from "./CartQtyProvider";
import NavbarProvider from "./NavbarProvider";

export default function AppProvider({ children }) {
  return (
    <NavbarProvider>
      <CartQtyProvider>
        <SearchProvider>
          <CouponProvider>
            <LoadingProvider>
              <OrderProvider>{children} </OrderProvider>
            </LoadingProvider>
          </CouponProvider>
        </SearchProvider>
      </CartQtyProvider>
    </NavbarProvider>
  );
}
