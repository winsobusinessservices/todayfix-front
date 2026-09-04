export const dateFormater = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("T")[0].split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${day} ${months[Number(month) - 1]} ${year}`;
};

export const dateMonthYearFormater = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("T")[0].split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[Number(month) - 1]} ${year}`;
};