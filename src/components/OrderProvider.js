import { OrderContext } from "../store/messageStore";
import { useState } from "react";

export default function OrderProvider({ children }) {
  const [orderInfo, setOrderInfo] = useState(null); // 暫存外送資訊
  const [orderId, setOrderId] = useState(null); // 訂單 ID

  return (
    <OrderContext.Provider
      value={{
        orderInfo,
        setOrderInfo,
        orderId,
        setOrderId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
