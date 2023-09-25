export const checkInApi = async (employeeId, attendanceDate, checkInTime) => {
  const apiUrl = "emp_attendance" ;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee: employeeId,
        attendance_date: attendanceDate,
        check_in_time: checkInTime,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to check in.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkOutApi = async (checkInId, checkOutTime) => {
  const apiUrl = `emp_attendance/${checkInId}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        check_out_time: checkOutTime,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to check out.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCheckLogApi = async (employeeId, date) => {
  try {
    const [day, month, year] = date.split('-');
    const currentDate = `${year}-${month}-${day}`;
    const apiUrl =`/attendance/${employeeId}/${currentDate}`;
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export const WeeklyReportApi = async (user_id, from, to) => {
  console.log(user_id, from, to)
  try {
    let [day, month, year] = from.split('-');
    const fromDate = `${year}-${month}-${day}`;
     [day, month, year] = to.split('-');
     const toDate = `${year}-${month}-${day}`;
    const apiUrl =`/attendance/${user_id}/${fromDate}/${toDate}`;
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

