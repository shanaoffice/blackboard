import React, { useState, useEffect, useRef, useContext } from "react";
import { CheckInOutContext } from "../CheckInOutContext";
import Timer from "./Timer";
import { formatTime } from "../utils/formatTime";

const Countdown = (props) => {
const [isRunning, setIsRunning] = useState(false);
const intervalRef = useRef(null);
const { isCheckIn } = React.useContext(CheckInOutContext);
const { totaltime } =useContext(CheckInOutContext);
const [seconds, setSeconds] = useState(totaltime);

  useEffect(() => {
    setSeconds(totaltime);
  }, [totaltime]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    else {
      setSeconds(seconds)
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isCheckIn) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [isCheckIn]);

  return (
    <>
      <div className="h3  text-center" style={{ zIndex: 1 }}>
        <Timer func={props.func} style={{ border: "2px solid green" }}/>
        {formatTime(seconds)}
      </div>
    </>
  );
}

export default Countdown;
