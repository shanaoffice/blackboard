import axios from "axios"

const LoginApi=async(formData, setIsError, setMessage)=>{
        const response = await axios.post("/login",formData);
        if (response.status===200){
        localStorage.clear();
        localStorage.setItem('user-token', response.data.access_token);
        localStorage.setItem('refresh_token',response.data.refresh_token)
        localStorage.setItem("isLoggedIn",true);
        return response.data
        }
        else{
            setIsError(true);
            setMessage("An error occurred while logging in. Please try again later.");
            return false
        }
    }
export default LoginApi;


// const [user, setUser] = useState(() => {
//     if (localStorage.getItem("tokens")) {
//       let tokens = JSON.parse(localStorage.getItem("tokens"));
//       return jwt_decode(tokens.access_token);
//     }
//     return null;
//   });