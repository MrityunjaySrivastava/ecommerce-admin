"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProductCharts({ products }: { products: any[] }) {
  const stockData = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));

  const priceData = products.map((p) => ({
    name: p.name,
    price: p.price,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      {/* STOCK CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Stock by Product</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PRICE CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Price Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
