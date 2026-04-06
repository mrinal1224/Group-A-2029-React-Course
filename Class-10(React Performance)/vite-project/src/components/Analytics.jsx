import React, { useState } from "react";

const orders = Array.from({ length: 20000 }, (_, i) => ({
  id: i + 1,
  customer: `Customer ${i % 500}`,
  amount: Math.floor(Math.random() * 5000) + 500,
  status: i % 2 === 0 ? "paid" : "pending",
}));

function AnalyticsWithoutMemo() {
  const [note, setNote] = useState("");

  const totalRevenue = orders
    .filter((order) => order.status === "paid")
    .reduce((sum, order) => sum + order.amount, 0);

  const paidOrders = orders.filter((order) => order.status === "paid").length;
  const averageOrderValue = paidOrders ? totalRevenue / paidOrders : 0;

  console.log("Heavy analytics recalculated");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Without useMemo</h2>
      <p>Total Revenue: ₹{totalRevenue}</p>
      <p>Average Order Value: ₹{averageOrderValue.toFixed(2)}</p>

      <textarea
        placeholder="Write internal note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
}

export default AnalyticsWithoutMemo;