import React, { useEffect, useContext } from 'react';
import { MDBContainer, MDBCol, MDBRow, } from 'mdb-react-ui-kit';
import '../App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginForm from '../forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="container-wrapper">
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow >
          <MDBCol col='10' md='6' >
            <img src="moneta__2_-removebg-preview.png" className="img-fluid" alt="Sampleimage" />
          </MDBCol>
          <MDBCol col='4' md='4' style={{ margin: "auto" }} >
            <LoginForm />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default Login;