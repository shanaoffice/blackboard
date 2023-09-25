import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn, userToken } = useContext(UserContext);

  const checkUserToken = () => {
    if (!userToken) {
      navigate('/');
    } 
  };

  useEffect(() => {
    checkUserToken();
  }, [userToken]); 

  return (
    <React.Fragment>
      {isLoggedIn ? props.children : null}
    </React.Fragment>
  );
};

export default ProtectedRoute;

  




// const ProtectedRoute = (props) => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
//     let refreshInterval;
//     const checkUserToken = () => {
//         const userToken = localStorage.getItem('user-token');
//         if (!userToken || userToken === 'undefined') {
//           localStorage.setItem("isLoggedIn",false);
//           navigate('/');
//         } else {
//           const decodedToken = jwt_decode(userToken);
//           const tokenExpiration = new Date(decodedToken.exp * 1000);
//           if (tokenExpiration < new Date()) {
//             refreshTokens();          
//           } else {
//             localStorage.setItem("isLoggedIn",true);
//             localStorage.setItem("user_id",decodedToken.user_id);
//             const newExpirationTimestamp = decodedToken.exp * 1000;
//             const newTimeUntilExpiration = newExpirationTimestamp - Date.now();
//             setTimeout(refreshTokens, newTimeUntilExpiration-60000 ); 
//           }
//         }
//       };
//       let isRefreshing = false;

//       const refreshTokens = async () => {
//         console.log('hi')
//         if (isRefreshing) {
//           return;
//         }
//         isRefreshing = true;
//         let refreshInterval;
//         try {
//           const refreshToken = localStorage.getItem('refresh_token');
//           console.log("i am printed anytime");
//           const response = await axios.post('/token/refresh', {"refresh": refreshToken });
//           if (response.data.access) {
//             setIsLoggedIn(true);
//             const newToken = response.data.access;
//             const newTokenData = jwt_decode(newToken);
//             localStorage.setItem('user-token', newToken);
//             localStorage.setItem("refresh_token",response.data.refresh);
//             const newExpirationTimestamp = newTokenData.exp * 1000;
//             const newTimeUntilExpiration = newExpirationTimestamp - Date.now();
//             if (isLoggedIn){
//             clearInterval(refreshInterval);
//               refreshInterval = setInterval(() => refreshTokens(), newTimeUntilExpiration - 60000);
//             };
//           }
//           else if (response.data.code==="token_not_valid"){
//             localStorage.setItem("isLoggedIn",false);
//             localStorage.removeItem('user-token');
//             localStorage.removeItem('refresh_token');
//             navigate('/');
//           }
//         } catch (error) {
//           localStorage.setItem("isLoggedIn",false);
//             localStorage.removeItem('user-token'); 
//             localStorage.removeItem('refresh_token');

//             navigate('/'); 
//         }
//         finally {
//           isRefreshing = false;
//         }
//       };
      
//       useEffect(() => {
//         checkUserToken();
//         return () => {
//           clearInterval(refreshInterval);
//         };
//       }, []);
//     return (
//         <React.Fragment>
//             {
//                 isLoggedIn ? props.children : null
//             }
//         </React.Fragment>
//     );
// }
// export default ProtectedRoute;