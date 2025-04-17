import CouponProvider from "./CouponProvider";
import { LoadingProvider } from "./LoadingContext";
import OrderProvider from "./OrderProvider";
import SearchProvider from "./SearchProvider";

export default function AppProvider({ children }) {
  return (
    <SearchProvider>
      <CouponProvider>
        <LoadingProvider>
          <OrderProvider>{children} </OrderProvider>
        </LoadingProvider>
      </CouponProvider>
    </SearchProvider>
  );
}
