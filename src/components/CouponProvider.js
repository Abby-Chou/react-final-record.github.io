import { createContext, useState } from "react";

export const CouponContext = createContext();

export default function CouponProvider({ children }) {
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  return (
    <CouponContext.Provider value={{ appliedCoupon, setAppliedCoupon }}>
      {children}
    </CouponContext.Provider>
  );
}
