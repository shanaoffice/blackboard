import {useContext, useState} from 'react';
import Countdown from './Countdown';
import { CheckInOutContext } from '../CheckInOutContext';
import WeeklyTable from './WeeklyTable';
import CheckInOutToggle from './CheckInOutToggle';
import DailyTable from './DailyTable'

export default function LogTable() {
const {checklogData,weeklyData} = useContext(CheckInOutContext);
const [isCheckedIn,setIsCheckedIn] = useState("initial")

  return (
    <>
    <div style={{ height: 400 }}>
    <div>
      <CheckInOutToggle />
      <Countdown func={setIsCheckedIn} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' ,  }}>
  <div style={{ flex: 2 ,justifyContent: 'center'}}>
    <DailyTable data={checklogData} />
  </div>
  <div style={{ flex: 2 ,justifyContent: 'center'}}>
    <WeeklyTable data={weeklyData} />
  </div>
</div>
  </div>

      </>
  );
}

