import React from "react";
import { useToast } from "../../../context/ToastContext";
import { formatAmount } from "../../../lib/helpers/formatAmount";
import { Button } from "../../shared/Button";

const HomeAvailableBalance = ({ balance }) => {
  // Context
  const toast = useToast();

  return (
    <section className="flex items-center gap-16 md:justify-0 justify-between">
      <div>
        <h4 className="text-sm font-sans font-medium text-mainstack-primary-gray md:mb-2">
          Available Balance
        </h4>
        <h1 className=" text-lg md:text-4xl font-sans font-bold text-mainstack-primary-black">
          USD {formatAmount(balance)}
        </h1>
      </div>

      <Button size="lg" onClick={() => toast.error("Operation successful!")}>
        Withdraw
      </Button>
    </section>
  );
};

export default HomeAvailableBalance;
