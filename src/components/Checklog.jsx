import { useParams } from 'react-router-dom';
import { getCheckLogApi, WeeklyReportApi } from '../api/CheckinApi'
import DailyTable from './DailyTable';
import WeeklyTable from './WeeklyTable';
import React, { useState, useEffect, useContext } from 'react';
import { CheckInOutContext } from '../CheckInOutContext';

export default function CheckLog() {
    const { id } = useParams();
    const [dailyData, setDailyData] = useState();
    const [bulkData, setBulkData] = useState();
    const {selectedDate,selectedOption} = useContext(CheckInOutContext);

    useEffect(() => {
      const fetchDailyData = async () => {
        try {
          const data = await getCheckLogApi(id,selectedDate);
          setDailyData(data);
        } catch (error) {
          console.error('Error fetching daily data:', error);
        }
      }; 
      const fetchBulkData = async () => {
        try {
          const data = await WeeklyReportApi(id,selectedOption["from_date"],selectedOption["to_date"]);
          setBulkData(data);
        } catch (error) {
          console.error('Error fetching bulk data:', error);
        }
      };
      fetchDailyData();
      fetchBulkData();
    }, [selectedDate,selectedOption]);

    return (
        <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ flex: 2 }}>
        <DailyTable data={dailyData} />
      </div>
      <div style={{ flex: 2 }}>
       <WeeklyTable data={bulkData} />
       </div>
    </div>
          </>
      );
    }
