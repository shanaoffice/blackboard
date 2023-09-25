import React, { useState } from 'react';
import GenericGetAllData from '../api/students/GenericGetAllData';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme } from '@mui/material';
import { Link } from "react-router-dom";

const DataGridComponents = (props) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDataFetched = (fetchedData) => {
    const transformedColumns = Object.keys(fetchedData[0] || {}).map(
      (field, index) => {
        if (index === 1) {
          return {
            field,
            headerName: field,
            width: 100,

            renderCell: (params) => (
              // <Link to={`/${props.apiUrl}/${params.row.id}`}>
              //   {params.value}
              // </Link>
              <Link to={`/${props.apiUrl}/${params.row.id}`}>
                <img src={params.value} alt="" style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '55%',
                  objectFit: 'cover',
                }} />
              </Link>
            ),

          };
        }
        else {
          return {
            field,
            headerName: field,
            width: 150,
          };
        }
      }
    );

    const filteredColumns = transformedColumns.filter((column) => {
      const fieldType = typeof fetchedData[0][column.field];
      return fieldType !== 'object' && fieldType !== 'function' && column.field !== 'id';
    });

    setData(fetchedData);
    setColumns(filteredColumns);
  };

  return (
    <div style={{ height: 400 }}>
      <Box
        m="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <GenericGetAllData
          apiUrl={props.apiUrl}
          onDataFetched={handleDataFetched}
        />
        <DataGrid rows={data} columns={columns} />
      </Box>
    </div>
  );
};
export default DataGridComponents;