import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Button } from "../../shared/Button";
import DateRangePicker from "../../shared/DateRangePicker";
import Dropdown from "../../shared/Dropdown";

const HomeFilter = ({ filters, setFilters }) => {
  // Utils
  const dayRange = [
    { name: "Today", days: 0 },
    { name: "Last 7 days", days: 7 },
    { name: "This month", days: 30 },
    { name: "Last 3 months", days: 90 },
    { name: "Last 6 months", days: 180 },
  ];

  // States
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState(
    []
  );

  // Router

  //   Context
  const { setShowOverlayScreen } = useContext(AppContext);

  //   Utils
  const transactionTypes = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawal",
    "Deposit",
    "Chargebacks",
    "Cashbacks",
    "Refer & Earn",
  ];
  const transactionStatuses = ["Successful", "Pending", "Failed"];

  // Helpers
  const handleClearFilters = () => {
    setFilters({
      daySpan: null,
      startDate: null,
      endDate: null,
      type: [],
      status: [],
    });
    setSelectedTransactionStatus([]);
    setSelectedTransactionTypes([]);
  };

  // Effects
  useEffect(() => {
    if (selectedTransactionTypes) {
      setFilters((prevState) => ({
        ...prevState,
        type: selectedTransactionTypes,
      }));
    }

    if (selectedTransactionStatus) {
      setFilters((prevState) => ({
        ...prevState,
        status: selectedTransactionStatus,
      }));
    }
  }, [selectedTransactionTypes, selectedTransactionStatus]);

  return (
    <section className="px-6 py-5 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between ">
          <h4 className="font-sans font-bold text-2xl text-mainstack-primary-black">
            Filter
          </h4>
          <Button variant="ghost" onClick={() => setShowOverlayScreen(false)}>
            <span className="material-symbols-outlined">close</span>
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {dayRange.map((data) => {
            return (
              <Button
                variant={
                  filters?.daySpan === data?.days ? "default" : "outline"
                }
                className="text-sm"
                size="sm"
                onClick={() =>
                  setFilters((prevState) => ({
                    ...prevState,
                    daySpan: data?.days,
                  }))
                }
              >
                {data?.name}
              </Button>
            );
          })}
        </div>

        <DateRangePicker />
        <Dropdown
          label="Transaction Type"
          options={transactionTypes}
          selected={selectedTransactionTypes}
          setSelected={setSelectedTransactionTypes}
        />
        <Dropdown
          label="Transaction Status"
          options={transactionStatuses}
          selected={selectedTransactionStatus}
          setSelected={setSelectedTransactionStatus}
        />
      </div>

      <div className="flex gap-3 items-center ">
        <Button
          className="flex-1"
          size="lg"
          variant="outline"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
        <Button className="flex-1" size="lg">
          Apply
        </Button>
      </div>
    </section>
  );
};

export default HomeFilter;
