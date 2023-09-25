import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';



const LoginForm = () => {


    return(
        <form >

        <div className="d-flex flex-row align-items-center justify-content-center">

          <p className="lead fw-normal mb-0 me-3">Create new account here</p>

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

        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

        <div className="d-flex justify-content-between mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <div className='text-center text-md-start mt-4 pt-2'>
          <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
          <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
        </div>
        </form>


    )
}

export default LoginForm;