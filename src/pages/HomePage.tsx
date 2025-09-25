import React, { useState } from "react";

type Balances = {
  bank: number;
  wallet: number;
  cash: number;
};

type HomePageProps = {
  balances: Balances;
  onUpdateBalance: (type: keyof Balances, value: number) => void;
};

const HomePage: React.FC<HomePageProps> = ({ balances, onUpdateBalance }) => {
  const [bank, setBank] = useState<number | string>(balances.bank);
  const [wallet, setWallet] = useState<number | string>(balances.wallet);
  const [cash, setCash] = useState<number | string>(balances.cash);

  const handleSave = () => {
    onUpdateBalance("bank", Number(bank));
    onUpdateBalance("wallet", Number(wallet));
    onUpdateBalance("cash", Number(cash));
  };

  const total = Number(bank) + Number(wallet) + Number(cash);

  return (
    <div className="flex flex-col items-center space-y-8 w-full bg-gray-100 dark:bg-gray-900">
      {/* Tổng Số Dư */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-18 mb-2">
          Tổng Số Dư
        </h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-green-600 dark:text-green-400">
          {total.toLocaleString()} đ
        </p>
      </div>

      {/* Các Khoản Tiền */}
      <div className="w-full max-w-md space-y-5">
        {/* Ngân hàng */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-transform hover:scale-105 border-2 border-blue-600 dark:border-blue-400">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Ngân hàng
          </label>
          <input
            type="number"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Ví điện tử */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-transform hover:scale-105 border-2 border-purple-600 dark:border-purple-400">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Ví điện tử
          </label>
          <input
            type="number"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-purple-600 border-purple-600 dark:text-purple-400 dark:border-purple-400 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Tiền mặt */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-transform hover:scale-105 border-2 border-orange-500 dark:border-orange-400">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Tiền mặt
          </label>
          <input
            type="number"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#04BFDA] font-bold text-orange-500 border-orange-500 dark:text-orange-400 dark:border-orange-400 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Nút Lưu */}
        <button
          onClick={handleSave}
          className="w-full bg-[#04BFDA] text-white dark:bg-[#04BFDA] dark:text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#03a9c4] transition-transform transform hover:scale-105"
        >
          Lưu Số Dư
        </button>
      </div>
    </div>
  );
};

export default HomePage;
