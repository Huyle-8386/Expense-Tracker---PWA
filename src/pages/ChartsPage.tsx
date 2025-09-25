import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Balances = {
  bank: number;
  wallet: number;
  cash: number;
};

type Transaction = {
  desc: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  account: "bank" | "wallet" | "cash";
  date: string;
};

type ChartsPageProps = {
  balances: Balances;
  transactions: Transaction[];
};

const ChartsPage: React.FC<ChartsPageProps> = ({ balances, transactions }) => {
  const [filter, setFilter] = useState<string>("all");
  const COLORS = ["#46BB1D", "#FC00A8", "#04BFDA", "#FFA84A", "#9B88ED"];

  // Lọc thu nhập và chi tiêu
  const income = transactions.filter((t) => t.type === "income");
  const expense = transactions.filter((t) => t.type === "expense");

  // Dữ liệu cho biểu đồ
  const pieData =
    filter === "all"
      ? [
          { name: "Thu nhập", value: income.reduce((a, b) => a + b.amount, 0) },
          { name: "Chi tiêu", value: expense.reduce((a, b) => a + b.amount, 0) },
        ]
      : transactions
          .filter((t) => t.category === filter)
          .map((t) => ({ name: t.desc || t.category, value: t.amount }));

  const categories = [
    "all",
    "lương",
    "thưởng",
    "lãi",
    "ăn uống",
    "sinh hoạt",
    "học tập",
    "mua sắm",
    "thể thao",
  ];

  return (
    <div className="flex flex-col items-center space-y-6 w-full bg-gray-100 dark:bg-gray-900 p-4 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Thống Kê Giao Dịch
      </h1>

      {/* Card Biểu Đồ */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-full max-w-md flex flex-col items-center">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toLocaleString()} đ`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>

      {/* Bộ lọc */}
      <div className="w-full max-w-md">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Lọc theo danh mục
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-xl px-3 py-2 w-full text-gray-800 dark:text-gray-100 dark:bg-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-[#04BFDA] outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all"
                ? "Tất cả giao dịch"
                : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChartsPage;
