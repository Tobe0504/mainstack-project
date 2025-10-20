import React, { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import HomeAvailableBalance from "../features/Home/HomeAvailableBalance";
import HomeChart from "../features/Home/HomeChart";
import HomeAccountSummary from "../features/Home/HomeAccountSummary";
import TransactionsTable from "../shared/TransactionsTable";
import HomeFilter from "../features/Home/HomeFilter";
import { useRequest } from "../../hooks/useRequests";
import { useEffect } from "react";
import { getTransactions, getWallet } from "../../lib/services/walletServices";
import Loader from "../shared/Loader";
import { useContext } from "react";
import { AuthUserContext } from "../../context/AuthUserContext";

const Home = () => {
  // Custom Hooks
  const {
    data: walletData,
    makeRequest: makeWalletRequest,
    loading: walletRequestIsLoading,
  } = useRequest();
  const {
    data: transactionsData,
    makeRequest: makeTransactionsRequest,
    loading: transactionRequestIsLoading,
  } = useRequest();

  // States
  const [filters, setFilters] = useState({
    daySpan: null,
    startDate: null,
    endDate: null,
    type: [],
    status: [],
  });

  // Helpers
  const filterTransactions = (transactions, filters) => {
    if (!transactions || transactions.length === 0) return [];

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      if (filters.daySpan) {
        const now = new Date();
        const dayAgo = new Date();
        dayAgo.setDate(now.getDate() - filters.daySpan);
        if (txDate < dayAgo) return false;
      }

      if (filters.startDate && txDate < new Date(filters.startDate))
        return false;
      if (filters.endDate && txDate > new Date(filters.endDate)) return false;

      if (Array.isArray(filters.type) && filters.type.length) {
        const types = filters.type.map((t) => t.toLowerCase());
        if (!types.includes((tx.type || "").toLowerCase())) return false;
      }

      if (Array.isArray(filters.status) && filters.status.length) {
        const statuses = filters.status.map((s) => s.toLowerCase());
        if (!statuses.includes((tx.status || "").toLowerCase())) return false;
      }

      return true;
    });
  };

  const getActiveFiltersCount = (filters) => {
    let count = 0;

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value !== null && value !== undefined && value !== "") {
        count += 1;
      }
    });

    return count;
  };

  const activeCount = getActiveFiltersCount(filters);

  const resetFilters = () => {
    setFilters({
      daySpan: null,
      startDate: null,
      endDate: null,
      type: [],
      status: [],
    });
  };

  // Utils
  const filteredTransactions = filterTransactions(transactionsData, filters);

  // Context
  const { loading } = useContext(AuthUserContext);

  // Effects
  useEffect(() => {
    makeWalletRequest(getWallet);
    makeTransactionsRequest(getTransactions);
  }, [makeWalletRequest, makeTransactionsRequest]);

  if (loading) {
    return (
      <div className="p-8">
        <Loader />
      </div>
    );
  }

  return (
    <AppLayout
      className="pt-4 md:pt-8 text-mainstack-primary-black flex flex-col md:gap-24 gap-8"
      sideOverlayChild={
        <HomeFilter filters={filters} setFilters={setFilters} />
      }
    >
      {walletRequestIsLoading || transactionRequestIsLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex md:flex-row flex-col items-stretch gap-4 md:gap-31  w-full">
            <div className="flex-1 flex flex-col gap-4 md:gap-16">
              <HomeAvailableBalance balance={walletData?.balance} />
              <HomeChart transactions={transactionsData} />
            </div>

            <div className="basis-67">
              <HomeAccountSummary summary={walletData} />
            </div>
          </div>
          <TransactionsTable
            transactions={filteredTransactions}
            clearFilters={resetFilters}
            activeCount={activeCount}
          />
        </>
      )}
    </AppLayout>
  );
};

export default Home;
