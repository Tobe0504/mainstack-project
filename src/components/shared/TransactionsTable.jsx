import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { capitalize } from "../../lib/helpers/capitalize";
import { formatAmountWithoutTrailingDecimals } from "../../lib/helpers/formatAmount";
import { Button } from "./Button";
import { formatDate } from "../../lib/helpers/formatDate";
import HomeNoTransactions from "../features/Home/HomeNoTransactions";

const TransactionsTable = ({ transactions, clearFilters, activeCount }) => {
  // Utils

  // COntext
  const { setShowOverlayScreen } = useContext(AppContext);

  return (
    <div className="font-sans flex-col flex bg-white rounded-lg gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b-1 border-b-mainstack-secondary-gray">
        <div>
          <h2 className=" text-lg md:text-2xl font-bold text-mainstack-primary-black">
            {transactions?.length} Transactions
          </h2>
          <p className="text-sm text-mainstack-primary-gray font-sans font-medium">
            Your transactions for the last 7 days
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            className="text-sm  py-3 px-7.5"
            size="lg"
            variant="secondary"
            onClick={() => setShowOverlayScreen((prevState) => !prevState)}
          >
            Filter
            {activeCount > 0 && (
              <span className="border w-5 h-5 flex items-center justify-center  text-xs bg-mainstack-primary-black rounded-full text-mainstack-primary-white">
                {activeCount}
              </span>
            )}
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings:
                  "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                fontSize: "20px",
              }}
            >
              keyboard_arrow_down
            </span>
          </Button>
          <Button className="text-sm py-3 px-7.5" size="lg" variant="secondary">
            <span>Export list</span>
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings:
                  "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                fontSize: "20px",
              }}
            >
              download
            </span>
          </Button>
        </div>
      </div>

      {transactions?.length > 0 ? (
        <div>
          {transactions?.length > 0 &&
            transactions?.map((t, index) => {
              const transactionTypeIcon =
                t.type === "deposit" ? "call_made" : "call_received";

              const header = t?.metadata?.product_name
                ? t?.metadata?.product_name
                : t?.type === "deposit"
                ? "Cash Deposit"
                : "Cash Withdrawal";

              const formattedDate = formatDate(t?.date);

              return (
                <div key={index} className="flex items-center w-full gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-full hidden md:flex items-center justify-center ${
                      t.status?.toLowerCase() === "successful"
                        ? "bg-mainstack-primary-green"
                        : "bg-mainstack-primary-red"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined font-light ${
                        t.status?.toLowerCase() !== "successful"
                          ? "text-mainstack-secondary-red"
                          : "text-mainstack-secondary-green"
                      }`}
                      style={{
                        fontVariationSettings:
                          "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        fontSize: "20px",
                      }}
                    >
                      {transactionTypeIcon}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 flex-1">
                    <div>
                      <p className="text-mainstack-primary-black font-sans font-medium text-base">
                        {header}
                      </p>
                      {t?.metadata?.name && (
                        <p className="text-mainstack-primary-gray text-sm font-sans font-medium">
                          {t?.metadata?.name}
                        </p>
                      )}
                      {!t?.metadata?.name && (
                        <p
                          className={`${
                            t.status?.toLowerCase() === "pending"
                              ? "text-mainstack-primary-gold"
                              : "text-mainstack-secondary-green"
                          } font-medium text-sm`}
                        >
                          {capitalize(t.status)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end text-right sm:mt-0 ml-auto">
                      <p className="text-mainstack-primary-black font-sans font-bold text-base ">
                        USD {formatAmountWithoutTrailingDecimals(t.amount)}
                      </p>
                      <p className="text-sm font-sans font-medium text-mainstack-primary-gray">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <HomeNoTransactions clearFilters={clearFilters} />
      )}
    </div>
  );
};

export default TransactionsTable;
