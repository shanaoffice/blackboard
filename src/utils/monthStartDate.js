export function getCurrentMonthDates() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    const formatDate = (date) => {
      return date.toLocaleDateString("en-GB").replace(/\//g, "-");
    };
  
    return {
      start: formatDate(firstDay),
      end: formatDate(lastDay)
    };
  }
  