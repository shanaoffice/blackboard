export const getCurrentTime = () => {
    const currentDateTime = new Date();
    const currentHours = String(currentDateTime.getHours()).padStart(2, "0");
    const currentMinutes = String(currentDateTime.getMinutes()).padStart(2, "0");
    const currentSeconds = String(currentDateTime.getSeconds()).padStart(2, "0");
    return `${currentHours}:${currentMinutes}:${currentSeconds}`;
  };
  