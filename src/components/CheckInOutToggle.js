import { useContext, useEffect } from 'react';
import {getCheckLogApi, WeeklyReportApi} from "../api/CheckinApi"
import { CheckInOutContext } from '../CheckInOutContext';
import { getCurrentTime } from '../utils/timeUtils'
import { getDatesForWeek } from '../utils/dateUtils'
import { getCurrentMonthDates } from '../utils/monthStartDate';
import { UserContext } from '../UserContext';

function CheckInOutToggle() {
  const { user_id } = useContext(UserContext);
  const {
    setIsCheckIn,
    setTotaltime,
    setChecklogData,
    setWeeklyData,
    selectedDate,
    selectedOption,
  } = useContext(CheckInOutContext);

  useEffect(() => {
    const handleInitialCheck = async () => {
    try {
      const checkLogApi = await getCheckLogApi(user_id, selectedDate);
      setChecklogData(checkLogApi);
      const time1 = new Date(`2000-01-01T${getCurrentTime()}`);
      const time2 = new Date(`2000-01-01T${checkLogApi["Last_check"]}`);
      const timeDifference = (time1 - time2)/1000;
      if (checkLogApi["check_in"]){
        setTotaltime(parseInt(checkLogApi["Total In time"])+timeDifference );
        setIsCheckIn(true);
        localStorage.setItem('isCheckIn',true)
        // const dateKeys = Object.keys(checkLogApi["Daywise attendance details"]);
        // const latestDate = dateKeys[dateKeys.length - 1];
        // const checkLogArray = checkLogApi["Daywise attendance details"][latestDate]["check_log"];
        // const lastId = checkLogArray[checkLogArray.length - 1].id;
        // setCheckinId(lastId)
        // localStorage.setItem("CheckinId",lastId)
      }else{
        setIsCheckIn(false);
        localStorage.setItem('isCheckIn',false)
        setTotaltime(parseInt(checkLogApi["Total In time"]));
      }
    } catch (error) {
      console.error('Error:', error.message);
      setTotaltime(0);
      setIsCheckIn(false);
}
  }
  const initialWeeklyData = async () => {
    try {
      const bulkLogData = await WeeklyReportApi(user_id,selectedOption["from_date"],selectedOption["to_date"])
      setWeeklyData(bulkLogData);
    }catch (error) {
          console.error('Error:', error.message);
    }
  }
      handleInitialCheck();
      initialWeeklyData();
  }, []);

  useEffect(() => {
    const SelectedDayData = async () => {
      try {
        const SelectedLogApi = await getCheckLogApi(user_id, selectedDate);
        setChecklogData(SelectedLogApi);
      }catch (error) {
        console.error('Error:', error.message);
  }
  }
  SelectedDayData()
}, [selectedDate]);

useEffect(() => {
  const SelectedDayData = async () => {
    try {
       const WeeklyDataApi = await WeeklyReportApi(user_id, selectedOption["from_date"], selectedOption["to_date"]);
      setWeeklyData(WeeklyDataApi);
    }catch (error) {
      console.error('Error:', error.message);
}
}
SelectedDayData()
}, [selectedOption]);
  return null;
}

export default CheckInOutToggle;
