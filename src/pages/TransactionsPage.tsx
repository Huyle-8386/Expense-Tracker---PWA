import React, { useState } from "react";
import type { FormEvent } from "react";

type Transaction = {
  desc: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  account: "bank" | "wallet" | "cash";
  date: string;
};

type TransactionsPageProps = {
  transactions: Transaction[];
  onAddTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (index: number) => void;
};

const TransactionsPage: React.FC<TransactionsPageProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const [desc, setDesc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState<string>("food");
  const [account, setAccount] = useState<"bank" | "wallet" | "cash">("bank");

  const categories: Record<"income" | "expense", string[]> = {
    income: ["lương", "thưởng", "lãi"],
    expense: ["ăn uống", "sinh hoạt", "học tập", "mua sắm", "thể thao"],
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onAddTransaction({
      desc,
      amount: Number(amount),
      type,
      category,
      account,
      date: new Date().toLocaleString(),
    });

    setDesc("");
    setAmount("");
  };

  const accountColors = {
    bank: "blue",
    wallet: "purple",
    cash: "green",
  } as const;

  return (
    <div className="flex flex-col items-center space-y-8 w-full bg-gray-100 dark:bg-gray-900 p-4">
      {/* Tiêu đề */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Giao Dịch
      </h1>

      {/* Form thêm giao dịch */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
        {/* Mô tả */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Mô tả
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Nhập mô tả"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Số tiền */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Số tiền
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Nhập số tiền"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Loại & Danh mục */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-${accountColors[account]}-600 dark:border-${accountColors[account]}-400`}>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Loại
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-${accountColors[account]}-600 dark:text-${accountColors[account]}-400 border-${accountColors[account]}-600 dark:border-${accountColors[account]}-400 bg-white dark:bg-gray-700`}
            >
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Danh mục
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              {categories[type].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tài khoản */}
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-${accountColors[account]}-600 dark:border-${accountColors[account]}-400`}>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Tài khoản
          </label>
          <select
            value={account}
            onChange={(e) =>
              setAccount(e.target.value as "bank" | "wallet" | "cash")
            }
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-${accountColors[account]}-600 dark:text-${accountColors[account]}-400 border-${accountColors[account]}-600 dark:border-${accountColors[account]}-400 bg-white dark:bg-gray-700`}
          >
            <option value="bank">Ngân hàng</option>
            <option value="wallet">Ví điện tử</option>
            <option value="cash">Tiền mặt</option>
          </select>
        </div>

        {/* Nút thêm */}
        <button
          type="submit"
          className="w-full bg-[#04BFDA] text-white dark:bg-[#04BFDA] dark:text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#03a9c4] transition-transform transform hover:scale-105"
        >
          Thêm Giao Dịch
        </button>
      </form>

      {/* Danh sách giao dịch */}
      <ul className="w-full max-w-md mt-6 space-y-3">
        {transactions.map((t, i) => (
          <li
            key={i}
            className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-${
              accountColors[t.account]
            }-600 dark:border-${accountColors[t.account]}-400 flex justify-between items-center`}
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {t.desc} - {t.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{t.date}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Tài khoản: {t.account === "bank" ? "Ngân hàng" : t.account === "wallet" ? "Ví điện tử" : "Tiền mặt"}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {t.type === "income" ? "+" : "-"} {t.amount.toLocaleString()} đ
              </p>
              <button
                onClick={() => onDeleteTransaction(i)}
                className="text-xs text-red-500 mt-1 underline"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
