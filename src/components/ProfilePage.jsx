import React, { useState } from "react";
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
import ImageUpload from "../api/imageuploaders/ImageUpload";
import CloudUpload from "../api/imageuploaders/CloudUpload";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import GenericStaffPage from "../api/staffs/GenericStaffPage";
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
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

    const message = await ImageUpload(imageurl, id);
    console.log(`/Staff/${id}`);
    setMessage(message);
    window.location.reload();
  }

  // Staffs variable.
  const staffsApiUrl = (`/Staff/${id}`)
  const handleDataFetched = (fetchedData) => {
    setUsers(fetchedData);
    setImageUrl(fetchedData.Summary["Profile URL"]); // I have fetched data to change image url.
    console.log(fetchedData);
  };
  // end
  return (
    <>
      <div>
        <GenericStaffPage
          staffsApiUrl={staffsApiUrl}
          onDataFetched={handleDataFetched}
        />
        <section
          style={{ backgroundColor: "secondary", overflow: "auto", height: "600px" }}
        >
          <MDBContainer className="py-5" style={{ marginTop: "-5%" }}>

            {/* style={{ marginTop: "-9.3%" }} */}
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb
                  className="rounded-3 p-3 mb-4">
                  <Box>
                    <Typography
                      variant="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                    </Typography>
                  </Box>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4 p-3" >
                  {/* style={{ borderRadius: "13px" }} */}
                  <MDBCardBody className="text-center" >
                    {/* style={{ borderRadius: "10px", marginTop: "-0.1%", height: "347px" }} */}
                    <MDBCardImage
                      src={imageUrl} //I have put in the imageUrl, Finally showing in the image profile page. 
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "140px" }}
                      fluid
                    />
                    {/* grade */}
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" style={{ color: "#2e7c67" }}> Grade</MDBCardText>
                      <MDBCardText>{users["Grade"]}{" "}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" style={{ color: "#2e7c67" }}> Section</MDBCardText>
                      <MDBCardText>{users["Section"]}{" "}</MDBCardText>
                    </MDBListGroupItem>

                    <div className="d-flex justify-content-center mb-1">
                      <MDBBtn
                        onClick={toggleShow}
                        type="button"
                        class="btn btn-primary"
                      >
                        Image upload
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                {/* Model start  style={{ backgroundColor: colors.primary[400] }}*/}
                <>
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
                </>
                {/* Modal start end */}
                <MDBCol md="6" lg="12">
                  <MDBCard className="mb-4" style={{ overflow: "auto", height: "330px", scrollbar: "hidden" }}>
                    <MDBCardBody className="p-0">
                      <MDBListGroup flush className="rounded-3">

                        {users && users["Address Details"] ? (
                          <MDBListGroup flush className="rounded-5">
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-4">
                              <MDBCardText>
                                <Box>
                                  <Typography
                                    variant="h6"
                                    color={colors.grey[100]}
                                    sx={{ m: "1px 0 0 0" }}
                                  >
                                    Address Details
                                  </Typography>
                                </Box>
                              </MDBCardText>
                            </MDBListGroupItem>

                            {Object.entries(users["Address Details"]).map(([key, value]) => (
                              <MDBListGroupItem
                                key={key}
                                className="d-flex justify-content-between align-items-center p-3"
                              >
                                <MDBCardText className="text-muted">
                                  {key}
                                </MDBCardText>
                                <MDBCardText>{value}</MDBCardText>
                              </MDBListGroupItem>
                            ))}
                          </MDBListGroup>
                        ) : (<p>Loading Address Details...</p>)}

                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBCol>

              <MDBCol lg="8">
                <MDBCard className="mb-4" active style={{ overflow: "auto", height: "345px", marginLeft: "-1.5%" }}>
                  <MDBCardBody>
                    {/* start */}
                    {users && users["Generic Details"] ? (
                      <MDBListGroup flush className="rounded-5">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-4">
                          <MDBCardText>
                            <Box>
                              <Typography
                                variant="h6"
                                color={colors.grey[100]}
                                sx={{ m: "1px 0 0 0" }}
                              >
                                Staff Details
                              </Typography>
                            </Box>
                          </MDBCardText>
                        </MDBListGroupItem>

                        {Object.entries(users["Generic Details"]).map(([key, value]) => (
                          <MDBListGroupItem
                            key={key}
                            className="d-flex justify-content-between align-items-center p-3"
                          >
                            <MDBCardText className="text-muted" style={{ color: "#2e7c67" }}>
                              {key}
                            </MDBCardText>
                            <MDBCardText>{value}</MDBCardText>
                          </MDBListGroupItem>
                        ))}

                      </MDBListGroup>
                    ) : (<p>Loading Address Details...</p>)}

                    {/* end */}
                    {/* <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" > Section</MDBCardText>
                      <MDBCardText>{users["Employee No."]}{" "}</MDBCardText>
                    </MDBListGroupItem>
                    <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" > Academic Year</MDBCardText>
                      <MDBCardText>{users["Academic Year"]}{" "}</MDBCardText>
                    </MDBListGroupItem>
                    <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" > Achievements </MDBCardText>
                      <MDBCardText>{users["Achievements"]}{" "}</MDBCardText>
                    </MDBListGroupItem>
                    <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" > Remarks </MDBCardText>
                      <MDBCardText>{users["Remarks"]}{" "}</MDBCardText>
                    </MDBListGroupItem>
                    <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" > Contact Number </MDBCardText>
                      <MDBCardText>{users["Contact Number"]}{" "}</MDBCardText>
                    </MDBListGroupItem>
                    <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-left  p-2">
                      <MDBCardText className="text-muted" > Email ID </MDBCardText>
                      <MDBCardText>{users["Email ID"]}{" "}</MDBCardText>
                    </MDBListGroupItem> */}
                  </MDBCardBody>
                </MDBCard>
                <MDBRow>
                  {/* I have start the code */}
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-lg-0" style={{ overflow: "auto", height: "315px", marginLeft: "-3%", marginTop: "-3%" }}>
                      <MDBCardBody className="p-0">
                        <MDBListGroup flush className="rounded-3">

                          {users && users["Profile Details"] ? (
                            <MDBListGroup flush className="rounded-5">
                              <MDBListGroupItem className="d-flex justify-content-between align-items-center p-4">
                                <MDBCardText>
                                  <Box>
                                    <Typography
                                      variant="h6"
                                      color={colors.grey[100]}
                                      sx={{ m: "1px 0 0 0" }}
                                    >
                                      Profile Details
                                    </Typography>
                                  </Box>
                                </MDBCardText>
                              </MDBListGroupItem>

                              {Object.entries(users["Profile Details"]).map(([key, value]) => (
                                <MDBListGroupItem
                                  key={key}
                                  className="d-flex justify-content-between align-items-center p-3"
                                >
                                  <MDBCardText className="text-muted" style={{ color: "#2e7c67" }}>
                                    {key}
                                  </MDBCardText>
                                  <MDBCardText>{value}</MDBCardText>
                                </MDBListGroupItem>
                              ))}

                            </MDBListGroup>
                          ) : (<p>Loading Address Details...</p>)}

                        </MDBListGroup>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  {/* end */}

                  <MDBCol md="6" >
                    <MDBCard className="mb-4 mb-md-0" style={{ marginLeft: "-3%", marginTop: "-3%" }}>
                      <MDBCardBody style={{ marginTop: "-3%" }}>
                        <MDBCardText className="mb-4">
                          <Box>
                            <Typography
                              variant="h6"
                              color={colors.grey[100]}
                              sx={{ m: "1px 0 0 0" }}
                            >
                              Assignment data
                            </Typography>
                          </Box>

                        </MDBCardText>
                        <MDBCardText
                          className="mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          English
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            bgColor="warning"
                            width={80}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Mathematics
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            bgColor="info"
                            width={72}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Science
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            bgColor="success"
                            width={89}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Geography
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            bgColor="danger"
                            width={55}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          History
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

      </div>
    </>
  );
};
export default ProfilePage;