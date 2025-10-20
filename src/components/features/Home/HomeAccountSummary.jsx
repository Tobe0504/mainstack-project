import React from "react";
import { formatAmount } from "../../../lib/helpers/formatAmount";
import Tooltip from "../../shared/Tooltip";

const HomeAccountSummary = ({ summary }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-8 ">
      <div className="flex flex-col md:gap-2">
        <div className="flex items-center justify-between md:gap-2">
          <h4 className=" font-sans font-medium text-sm text-mainstack-primary-gray">
            Ledger Balance
          </h4>
          <Tooltip content="The total amount currently in your account, including pending and available funds. This reflects all transactions recorded up to now not just what’s ready for withdrawal.">
            <span className="material-symbols-outlined cursor-pointer w-5 h-5 text-mainstack-tertiary-gray">
              info
            </span>
          </Tooltip>
        </div>

        <p className="text-lg md:text-3xl font-sans font-bold text-mainstack-primary-black">
          USD {formatAmount(summary?.ledger_balance)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className=" font-sans font-medium text-sm text-mainstack-primary-gray">
            Total Payout
          </h4>
          <Tooltip content="The total income you’ve earned from all completed transactions or sales. This includes both paid and pending payouts.">
            <span className="material-symbols-outlined cursor-pointer w-5 h-5 text-mainstack-tertiary-gray">
              info
            </span>
          </Tooltip>
        </div>

        <p className="text-lg md:text-3xl font-sans font-bold text-mainstack-primary-black">
          USD {formatAmount(summary?.total_payout)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className=" font-sans font-medium text-sm text-mainstack-primary-gray">
            Total Revenue
          </h4>
          <Tooltip content="The total amount that has been successfully transferred or paid out to your bank or wallet. This represents funds that have already left your platform balance.">
            <span className="material-symbols-outlined cursor-pointer w-5 h-5 text-mainstack-tertiary-gray">
              info
            </span>
          </Tooltip>
        </div>

        <p className="text-lg md:text-3xl font-sans font-bold text-mainstack-primary-black">
          USD {formatAmount(summary?.total_revenue)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className=" font-sans font-medium text-sm text-mainstack-primary-gray">
            Pending Payout
          </h4>
          <Tooltip content="The amount that’s been earned but is still being processed for payout. These funds will move to your total payout once they’re approved or cleared.">
            <span className="material-symbols-outlined cursor-pointer w-5 h-5 text-mainstack-tertiary-gray">
              info
            </span>
          </Tooltip>
        </div>

        <p className="text-lg md:text-3xl font-sans font-bold text-mainstack-primary-black">
          USD {formatAmount(summary?.pending_payout)}
        </p>
      </div>
    </div>
  );
};

export default HomeAccountSummary;
