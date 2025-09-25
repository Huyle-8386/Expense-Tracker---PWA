import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import TransactionsPage from "./pages/TransactionsPage";
import ChartsPage from "./pages/ChartsPage";
import BottomNav from "./components/BottomNav";

type BalanceType = "bank" | "wallet" | "cash";

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
  account: BalanceType;
  date: string;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "transactions" | "charts">("home");

  // số dư từng loại
  const [balances, setBalances] = useState<Balances>({
    bank: 0,
    wallet: 0,
    cash: 0,
  });

  // danh sách giao dịch
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // cập nhật số dư từng loại
  const handleUpdateBalance = (type: BalanceType, amount: number) => {
    setBalances((prev) => ({ ...prev, [type]: amount }));
  };

  // thêm giao dịch
  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [...prev, tx]);

    setBalances((prev) => {
      const newBalances = { ...prev };
      if (tx.type === "income") {
        newBalances[tx.account] += tx.amount;
      } else {
        newBalances[tx.account] -= tx.amount;
      }
      return newBalances;
    });
  };

  // xóa giao dịch
  const handleDeleteTransaction = (index: number) => {
    const tx = transactions[index];
    setTransactions((prev) => prev.filter((_, i) => i !== index));

    // hoàn lại số dư
    setBalances((prev) => {
      const newBalances = { ...prev };
      if (tx.type === "income") {
        newBalances[tx.account] -= tx.amount;
      } else {
        newBalances[tx.account] += tx.amount;
      }
      return newBalances;
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage balances={balances} onUpdateBalance={handleUpdateBalance} />;
      case "transactions":
        return (
          <TransactionsPage
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      case "charts":
        return <ChartsPage balances={balances} transactions={transactions} />;
      default:
        return <HomePage balances={balances} onUpdateBalance={handleUpdateBalance} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
        {/* <div className="flex-1 overflow-y-auto flex flex-col justify-start"> */}
          {renderPage()}
        {/* </div> */}
      </div>
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
