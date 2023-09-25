import { MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useState ,useContext} from 'react';
import LoginApi from "../api/LoginApi"
import ErrorPage from '../components/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginForm = (props) => {
  const {setIsLoggedIn,setUserToken,setRefresh_token, setRole} = useContext(UserContext);
  const [isError,setIsError] = useState(false);
  const [message,setMessage] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async(e)=> { //
    e.preventDefault();
    try {
      const loginSuccess = await LoginApi(formData, setIsError, setMessage);
      console.log(formData);
      if (loginSuccess) {
        // props.func("true");
        setIsLoggedIn(true);
        setUserToken(loginSuccess.access_token);
        setRefresh_token(loginSuccess.refresh_token);
        console.log(loginSuccess);
        localStorage.setItem('role', loginSuccess.role)
        setRole(loginSuccess.role);
        navigate('/home');
      } else {
        setIsError(true);
        setMessage("Some error occured. Please try again after sometimes!!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsError(true);
        setMessage("Invalid credentials. Please try again.");
    }
    
  }
  return(
      <>
      <div> {isError && <ErrorPage message={message} />}</div>
        <form onSubmit={submitHandler} >
        <div className="d-flex flex-row align-items-center justify-content-center">
          <p className="lead fw-normal mb-0 me-3">Sign in here</p>

          {/* <MDBBtn floating size='md' tag='a' className='me-2'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn floating size='md' tag='a'  className='me-2'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn floating size='md' tag='a'  className='me-2'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn> */}

        </div>

        <div className="divider d-flex align-items-center my-4">
          
        </div>

        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" name='email' onChange={handleInputChange}/>
        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name='password' onChange={handleInputChange}/>

        <div className="d-flex justify-content-between mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <div className='text-center text-md-start mt-4 pt-2'>
          <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
          {/* <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p> */}
        </div>
        

        </form>
        </>


    )
}

export default LoginForm;