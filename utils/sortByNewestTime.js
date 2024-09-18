export default function sortByNewestTime(array) {
  return array.sort((a, b) => {
    const parseDate = (dateString) => {
      const [datePart, timePart] = dateString.split(", ");
      const [day, month, year] = datePart.split("/");
      const [hour, minute, second] = timePart.split(":");
      return new Date(year, month - 1, day, hour, minute, second);
    };

    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    return dateB - dateA;
  });
}
