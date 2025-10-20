import React from "react";
import { Button } from "../../shared/Button";

const HomeNoTransactions = ({ clearFilters }) => {
  return (
    <div className="pt-12 flex flex-col items-center">
      <div className="max-w-92">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#DBDEE6_1.89%,_#F6F7F9_98.77%)] mb-5">
          <span className="material-symbols-outlined">receipt_long</span>
        </div>
        <h4 className="font-bold text-3xl font-sans text-mainstack-primary-black mt-2.5 mb-5">
          No matching transaction found for the selected filter
        </h4>
        <p className="font-medium text-base font-sans text-mainstack-primary-gray mb-8">
          Change your filters to see more results, or add a new product.
        </p>
        <Button variant="secondary" onClick={clearFilters}>
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default HomeNoTransactions;
