import React, { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab, tabClasses } from '@mui/base/Tab';
import { tokens } from "../theme";
import { Box, useTheme } from '@mui/material';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from "mdb-react-ui-kit";
import GenericStaffPage from "../api/staffs/GenericStaffPage";
import StaffIdPut from '../api/staffs/StaffIdPut';
import { useParams } from 'react-router-dom';
import { normalizedDataApiMapp } from '../normalizedDataApiMapp';
import ImageUpload from "../api/imageuploaders/ImageUpload";
import CloudUpload from "../api/imageuploaders/CloudUpload";
import { UserContext } from '../UserContext';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

function Employee() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user_id } = useContext(UserContext);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [currentTab, setCurrentTab] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [IsDirty, setIsDirty] = useState(false);//

  // const staffsApiUrl = 'http://192.168.0.204:8001/employee/4321';
  const staffsApiUrl = `http://192.168.0.204:8001/employee/${user_id}`;
  console.log(user_id)

  const [updatedData, setUpdatedData] = useState(null);

  const [ActiveTab, setActiveTab] = useState('Summary');
  const [Id, setId] = useState(id); // Dynamic value
  const [apiUrl, setApiUrl] = useState();
  console.log(ActiveTab);

  useEffect(() => {
    const TabName = `employee.${ActiveTab}`
    const api = normalizedDataApiMapp(TabName, Id);
    setApiUrl(api);
  }, [ActiveTab])

  const handleEditClick = () => {
    setIsEditMode(true);
    setSuccessMessage("");
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setEditedValues({});
    setSuccessMessage("");
  };//

  const handleSaveClick = async () => {
    if (Object.keys(editedValues).length > 0) {
      try {
        const updatedData = await StaffIdPut(apiUrl, editedValues); // Replace 'id' with the actual id value
        console.log('Updated data:', updatedData);
        // <-----------------]
        // Api get logic here.
        // <-----------------]
        setUpdatedData(updatedData); // Update the data in the parent state
        console.log(updatedData);
        setSuccessMessage("Saved successfully!");
        setEditedValues({}); // Clear edited values if needed

      } catch (error) {
        console.log("Error updating data:", error);
        setSuccessMessage("Error updating data");
      }
    } else {
      setSuccessMessage("No changes to save.");
    }
  };

  const handleInputChange = (key, value) => {
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [key]: value,
    }));
    setIsDirty(true); // Mark that changes have been made
  };
  // end

  // const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [message, setMessage] = useState()

  //Image variable start.
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSaveChanges = async () => {
    const imageurl = await CloudUpload(selectedFile);
    console.log(imageurl)

    const message = await ImageUpload(apiUrl, imageurl);
    console.log(`/employee/${user_id}`);
    setMessage(message);

  }

  // Staffs variable.
  // const staffsApiUrl = (`/Staff/${id}`)
  const handleDataFetched = (fetchedData) => {
    setUsers(fetchedData);
    setImageUrl(fetchedData.Summary["Profile URL"]); // I have fetched data to change image url.
    console.log(fetchedData);
  };
  // end

  const renderSummaryTabContent = () => {
    return (
      <div className="row">
        <div className="col-md-2 text-center">
          <MDBCardImage
            src={imageUrl}
            alt="avatar"
            className="rounded-circle mb-2"
            style={{ width: '150px' }}
            fluid
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleShow}>
            <UploadIcon />Image Upload</Button>
        </div>
      </div>
    );
  };

  const renderTabPanelContent = () => {
    if (!users) {
      return <p>Loading...</p>;
    }

    return Object.entries(users).map(([sectionName, sectionData], index) => (
      <StyledTabPanel key={index} value={sectionName}>
        <MDBCardBody>
          {Object.entries(sectionData).map(([key, value], subIndex) => {
            if (key !== 'id' && key !== 'Profile URL') {
              return (
                <MDBListGroupItem key={subIndex} className="d-flex justify-content-between align-items-center p-1">
                  <MDBCardText>
                    {key}:
                  </MDBCardText>
                  {(isEditMode && role === 'admin') || (isEditMode && ActiveTab !== 'Reporting' && role !== 'admin') ? (
                    <input
                      type="text"
                      value={editedValues[key] || value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  ) : (
                    <MDBCardText>{value}</MDBCardText>
                  )}
                </MDBListGroupItem>
              );
            }
            return null; // Skip rendering for 'id' and 'Profile URL'
          })}
        </MDBCardBody>
      </StyledTabPanel>
    ));

  };


  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
    setId(users[newValue].id);
  };

  return (
    <>
      <div>
        <GenericStaffPage
          staffsApiUrl={staffsApiUrl}
          onDataFetched={handleDataFetched}
        />

        <Tabs value={ActiveTab} onChange={handleTabChange}>
          <StyledTabsList>
            {Object.keys(users).map((key, index) => (
              <StyledTab value={key}>{key}</StyledTab>
            ))}
          </StyledTabsList>
          <div>
            {/* Render avatar and image upload only in Summary tab */}
            {ActiveTab === 'Summary' && renderSummaryTabContent()}

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
              <MDBModalDialog >
                <MDBModalContent style={{ backgroundColor: colors.primary[400] }}>
                  <MDBModalHeader >
                    <MDBModalTitle>Image upload</MDBModalTitle>
                    <MDBBtn className='btn-close' color='white' onClick={toggleShow}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody className="d-flex flex-column align-items-center">
                    <MDBCardImage
                      src={imageUrl}
                      alt="avatar"
                      className="rounded-circle mb-2"
                      style={{ width: '150px' }}
                      fluid
                    />
                    <MDBModalFooter>
                      <MDBBtn color='secondary' onClick={toggleShow}>
                        Close
                      </MDBBtn>
                      <div className="btn btn-primary btn-sm text-center">
                        <label className="form-label text-white" htmlFor="customFile2">
                          Choose file
                        </label>
                        <input type="file" className="form-control d-none" id="customFile2" onChange={handleFileChange} />
                      </div>
                      <MDBBtn onClick={handleSaveChanges}>Save changes</MDBBtn>
                    </MDBModalFooter>
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
            {/*  */}

            <MDBListGroupItem className="w-100 p-3">
              <MDBCardText>{renderTabPanelContent()}</MDBCardText>
              {(isEditMode && role === 'admin') || (isEditMode && ActiveTab !== 'Reporting' && role !== 'admin') ? (
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveClick}
                    className="mr-2"
                    disabled={!IsDirty} // Disable the button if no changes have been made
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancelClick}
                    style={{ marginLeft: '1.4%' }}>Cancel</Button>
                  <p className="text-success mt-2">{IsDirty ? successMessage : ''}</p>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEditClick}
                  disabled={(role !== 'admin' && ActiveTab === 'Reporting')}>Edit</Button>
              )}
            </MDBListGroupItem>
          </div>
        </Tabs>
      </div>
    </>
  );
};
export default Employee;

const greenAccent = {
  100: "#0f2922",
  200: "#1e5245",
  300: "#2e7c67",
  400: "#3da58a",
  500: "#4cceac",
  600: "#70d8bd",
  700: "#94e2cd",
  800: "#b7ebde",
  900: "#dbf5ee",
};

const primary = {
  100: "#d0d1d5",
  200: "#a1a4ab",
  300: "#727681",
  400: "#1F2A40",
  500: "#141b2d",
  600: "#101624",
  700: "#0c101b",
  800: "#080b12",
  900: "#040509",
};

const grey = {
  100: "#141414",
  200: "#292929",
  300: "#3d3d3d",
  400: "#525252",
  500: "#666666",
  600: "#858585",
  700: "#a3a3a3",
  800: "#c2c2c2",
  900: "#e0e0e0",
};

const StyledTab = styled(Tab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  &:hover {
  background - color: ${greenAccent[500]};
  }

    &:focus {
    color: #fff;
    outline: 3px solid ${greenAccent[500]};
  }

    &.${tabClasses.selected} {
      background - color: #fff;
    color: ${greenAccent[500]};
  }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
    cursor: not-allowed;
  }
    `;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
   width: 100%;
   font-family: IBM Plex Sans, sans-serif;
   font-size: 0.875rem;
   padding: 20px 12px;
   background: ${theme.palette.mode === 'dark' ? primary[600] : '#fff'};
   border: 1px solid ${theme.palette.mode === 'dark' ? primary[700] : primary[200]};
   border-radius: 12px;
   opacity: 0.6;
   .tab-panel-content {
   overflow - y: auto;
  }
  `,
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${primary[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? primary[700] : primary[100]};
  background: ${theme.palette.mode === 'dark' ? primary[500] : grey[700]};
  border: 1px solid ${theme.palette.mode === 'dark' ? primary[700] : primary[100]};
  `,
);