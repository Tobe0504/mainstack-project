import React from "react";
import { useState, useEffect } from "react";
import useClearComponent from "../../hooks/useClearComponent";
import { Button } from "./Button";

const DateRangePicker = () => {
  // States
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  //   Custim Hooks
  const { show, overlayRef, setShow } = useClearComponent();

  useEffect(() => {
    if (startDate) {
      setCurrentMonth(
        new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      );
    }
  }, [startDate]);

  const toggleCalendar = (isStart) => {
    setSelectingStart(isStart);
    setShowCalendar(true);
    setShow(true);
  };

  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "";
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDay = currentMonth.getDay();

  const adjustedFirstDay = (firstDay + 6) % 7;

  const days = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectDate = (day) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (selectingStart) {
      setStartDate(selected);
      if (endDate && selected > endDate) {
        setEndDate(null);
      }
    } else {
      if (selected >= startDate) {
        setEndDate(selected);
        setShowCalendar(false);
        setShow(false);
      } else {
        setStartDate(selected);
        setEndDate(null);
      }
    }
  };

  const isSelected = (day) => {
    if (!day) return false;
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return (
      (startDate && d.getTime() === startDate.getTime()) ||
      (endDate && d.getTime() === endDate.getTime())
    );
  };

  return (
    <div className="relative w-full max-w-md">
      <label className="font-sans font-semibold text-base text-bg-mainstack-primary-black block mb-3">
        Date Range
      </label>
      <div className="flex gap-1.5 justify-between items-center">
        <div
          className={`flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl two-sec-transition ${
            showCalendar && selectingStart
              ? "bg-mainstack-primary-white border-mainstack-primary-black border-3"
              : "bg-mainstack-secondary-gray border-transparent border-3"
          }`}
          onClick={() => toggleCalendar(true)}
        >
          <span className="font-sans font-semibold text-sm text-mainstack-primary-black">
            {formatDate(startDate)}
          </span>
          <span
            className={`material-symbols-outlined two-sec-transition ${
              showCalendar && selectingStart ? "rotate-[-90deg]" : "rotate-0"
            }`}
          >
            keyboard_arrow_down
          </span>
        </div>
        <div
          className={`flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl two-sec-transition ${
            showCalendar && !selectingStart
              ? "bg-mainstack-primary-white border-mainstack-primary-black border-3"
              : "bg-mainstack-secondary-gray border-transparent border-3"
          }`}
          onClick={() => toggleCalendar(false)}
        >
          <span className="font-sans font-semibold text-sm text-mainstack-primary-black">
            {formatDate(endDate)}
          </span>
          <span
            className={`material-symbols-outlined two-sec-transition ${
              showCalendar && !selectingStart ? "rotate-[-90deg]" : "rotate-0"
            }`}
          >
            keyboard_arrow_down
          </span>
        </div>
      </div>
      {show && showCalendar && (
        <div
          className="absolute mt-2 bg-white rounded-lg p-8 z-10 w-full shadow-mainstack-secondary"
          ref={overlayRef}
        >
          <div className="flex justify-between items-center mb-3">
            <Button variant="ghost" onClick={prevMonth} className="text-xl">
              <span className={`material-symbols-outlined two-sec-transition`}>
                keyboard_arrow_left
              </span>
            </Button>
            <span className="text-sm font-sans text-mainstack-primary-black font-semibold">
              {currentMonth.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button onClick={nextMonth} variant="ghost">
              <span className={`material-symbols-outlined two-sec-transition`}>
                keyboard_arrow_right
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div
                key={d}
                className="font-semibold text-xs font-sans text-mainstack-primary-gray"
              >
                {d}
              </div>
            ))}

            {days.map((day, i) => (
              <div key={i} className="flex justify-center items-center h-8">
                {day && (
                  <span
                    onClick={() => selectDate(day)}
                    className={`w-8 h-8 font-sans font-semibold text-xs text-mainstack-primary-black flex items-center justify-center rounded-full cursor-pointer ${
                      isSelected(day)
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
