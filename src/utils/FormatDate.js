export function FormatDate(date, config) {
  if (!date) return "-";
  let options = {
    year: "2-digit",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
  };
  if (config) options = config;
  const toDate = new Date(date);
  const format = new Intl.DateTimeFormat("en-In", options);
  return format.format(toDate);
}
