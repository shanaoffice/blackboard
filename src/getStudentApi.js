// import axios from "axios";

// const baseURL = "http://192.168.0.111:8000/School";
// // const stdclURL = "http://192.168.0.115:8000/get/StudentList";

// export default function getStudentApi() {
//   const [post, setPost] = React.useState(null);

//   React.useEffect(() => {
//     console.log("I am Here")
//     axios.get(baseURL).then((response) => {
//       setPost(response.data);
      
//       console.log(post);
//     });
//   }, []);

//   if (!post) return null;
//   return (
//     <div></div>
//   );
// }