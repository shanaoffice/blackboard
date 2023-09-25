import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';
import { getDatesForWeek } from './utils/dateUtils'

export const CheckInOutContext = createContext();

export const CheckInOutProvider = ({ children }) => {
const weekDates = getDatesForWeek()
const [isCheckIn, setIsCheckIn] = useState(() => {const storedValue = localStorage.getItem('isCheckIn');
  return storedValue ? JSON.parse(storedValue) : false;},false);
const [totaltime, setTotaltime] = useState(0);
const currentDate = dayjs(new Date()).format('DD-MM-YYYY')
const [selectedDate, setSelectedDate] = useState(currentDate);
const [selectedOption, setSelectedOption] = useState({ from_date: weekDates[0],to_date: weekDates[6] });

const toggleCheckIn = () => {
    setIsCheckIn(prevState => !prevState);
    localStorage.setItem('isCheckIn', JSON.stringify(!isCheckIn));
  };

const [isLoggedIn] = useState(() => {const storedValue = localStorage.getItem('isLoggedIn');
  return storedValue ? JSON.parse(storedValue) : false;});

const [checklogData,setChecklogData] = useState(null);
const [weeklyData, setWeeklyData] = useState(null);

  return (
    <CheckInOutContext.Provider value={{ isCheckIn,setIsCheckIn, toggleCheckIn, isLoggedIn, checklogData,setChecklogData, weeklyData, setWeeklyData, totaltime, setTotaltime,selectedDate, setSelectedDate,selectedOption, setSelectedOption}}>
      {children}
    </CheckInOutContext.Provider>
  );
};