import { useState } from "react";
import useClearComponent from "../../hooks/useClearComponent";
import { Button } from "./Button";

const Dropdown = ({ label, options, selected, setSelected }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggle = (type) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Custom Hooks
  const { show, setShow, overlayRef } = useClearComponent();

  // Handlers
  const handleToggleShowOptions = () => {
    setShowOptions((prevState) => !prevState);
    setShow((prevState) => !prevState);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg">
      <label className="font-sans font-semibold text-base text-bg-mainstack-primary-black block mb-3">
        {label}
      </label>
      <div className="relative">
        <Button
          className={`w-full flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl two-sec-transition truncate ${
            showOptions && show
              ? "bg-mainstack-primary-white border-mainstack-primary-black border-3"
              : "bg-mainstack-secondary-gray border-transparent border-3"
          }`}
          onClick={handleToggleShowOptions}
          variant="ghost"
        >
          {selected.length > 0 ? selected.join(", ") : "Select an option.."}
        </Button>
        <div
          className={`mt-2 rounded-xl bg-white shadow-mainstack-secondary overflow-y-auto two-sec-transition absolute w-full z-[3]  ${
            showOptions && show ? "max-h-70" : "max-h-0"
          }`}
          ref={overlayRef}
        >
          <div className="p-2">
            {options.map((type) => (
              <div
                key={type}
                className="flex items-center p-3.5 hover:bg-mainstack-secondary-gray cursor-pointer gap-3"
                onClick={() => handleToggle(type)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(type)}
                  readOnly
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 flex items-center justify-center rounded-xs select-none ${
                    selected.includes(type)
                      ? "text-white bg-mainstack-primary-black"
                      : "text-transparent bg-white border-1 border-mainstack-tertiary-gray-200"
                  }`}
                >
                  <span
                    class="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    check
                  </span>
                </span>
                <span className="font-sans font-semibold text-base text-mainstack-primary-black">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
