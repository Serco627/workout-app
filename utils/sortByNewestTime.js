export default function sortByNewestTime(array) {
  return array.sort((a, b) => {
    const parseDate = (dateString) => {
      // Try parsing as ISO string
      let date = new Date(dateString);

      // If invalid, try parsing as DD/MM/YYYY, HH:mm:ss or DD.MM.YYYY, HH:mm:ss
      if (isNaN(date.getTime())) {
        const [datePart, timePart] = dateString.split(", ");
        let [day, month, year] = datePart.split(/[/.]/); // Split by either '/' or '.'
        const [hour, minute, second] = timePart.split(":");

        // Ensure year is four digits
        if (year.length === 2) {
          year = "20" + year;
        }

        date = new Date(year, month - 1, day, hour, minute, second);
      }

      // If still invalid, log the error and return null
      if (isNaN(date.getTime())) {
        console.error("Invalid date encountered:", dateString);
        return null;
      }

      return date;
    };

    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    // If either date is invalid, keep original order
    if (!dateA || !dateB) return 0;

    return dateB.getTime() - dateA.getTime();
  });
}
