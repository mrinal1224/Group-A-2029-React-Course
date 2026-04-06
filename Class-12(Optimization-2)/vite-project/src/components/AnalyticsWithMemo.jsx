import React, { useMemo, useState } from "react";

const orders = Array.from({ length: 2000000 }, (_, i) => ({
  id: i + 1,
  customer: `Customer ${i % 500}`,
  amount: Math.floor(Math.random() * 5000) + 500,
  status: i % 2 === 0 ? "paid" : "pending",
}));

function AnalyticsWithMemo() {
  const [note, setNote] = useState("");

  const analytics = useMemo(() => {
    console.log("Heavy analytics recalculated");

    const paidOrdersList = orders.filter((order) => order.status === "paid");
    const totalRevenue = paidOrdersList.reduce(
      (sum, order) => sum + order.amount,
      0
    );
    const averageOrderValue = paidOrdersList.length
      ? totalRevenue / paidOrdersList.length
      : 0;

    return {
      totalRevenue,
      averageOrderValue,
      paidOrders: paidOrdersList.length,
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics With useMemo</h2>
      <p>Total Revenue: ₹{analytics.totalRevenue}</p>
      <p>Average Order Value: ₹{analytics.averageOrderValue.toFixed(2)}</p>
      <p>Paid Orders: {analytics.paidOrders}</p>

      <textarea
        placeholder="Write internal note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
}

export default AnalyticsWithMemo;