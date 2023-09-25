import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import CreateIcon from '@mui/icons-material/Create';
import Header from "../../components/Header";
// import DataGridComponents from "../../components/DataGridComponents";
// import { DataGrid } from "@mui/x-data-grid";
// import students from "../../api/student"
// import { allStd } from "../../data/mockData";

const Allstd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
               colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            <CreateIcon/> 
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="ALL STUDENT" />
      <Box
        m="40px 0 0 0"
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
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* <DataGrid checkboxSelection rows={allStd} columns={columns} /> */}
        
        {/* <DataGridComponents /> */}
      </Box>
    </Box>
  );
};
export default Allstd;