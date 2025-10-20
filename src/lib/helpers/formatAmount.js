export const formatAmount = (value) => {
  if (typeof value === "string") {
    value = value.replace(/,/g, "");
  }
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return "";
  }

  return numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatAmountWithoutTrailingDecimals = (value) => {
  if (typeof value === "string") {
    value = value.replace(/,/g, "");
  }
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return "";
  }

  return numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
