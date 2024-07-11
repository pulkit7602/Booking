import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import axios from "axios";
// import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const New = ({ inputs}) => {
  const [file, setFile] = useState("");
  const [info,setInfo]=useState({});
  const navigate= useNavigate();
  const [credentials, setCredentials]=useState({
    username: undefined,
    password: undefined
})
const {loading, error, dispatch}= useContext(AuthContext);

 // console.log(inputs);
 
  const handleChange= (e)=>{
    setInfo((prev)=>({
      ...prev,
      [e.target.id]:e.target.value
    }));
    
  }
const handleClick= async(e)=>{
  e.preventDefault();
  const data = new FormData()
  data.append("file",file)
  data.append("upload_preset","upload");
  try {
    const uploadRes= await axios.post("https://api.cloudinary.com/v1_1/dtphzu8xk/image/upload",data);
    const {url}= uploadRes.data;
    const newUser ={
      ...info,
      img:url,
    };
  //  console.log(newUser)
await axios.post("/auth/register",newUser);
// const {user}= useContext(AuthContext);
// console.log(newUser);
// navigate("/")
setCredentials({
  username: newUser.username,
  password: newUser.password
});
async function Login(){
  dispatch({type:"LOGIN_START"});
  try {
      const res= await axios.post("/auth/login",credentials);
      dispatch({type:"LOGIN_SUCCESS",payload: res.data.details});
      navigate("/");
  } catch (err) {
      dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
  }
}
setTimeout(Login, 2000);


  } catch (error) {
    console.log(error)
  }

}
  return (
    <div className="new">
 
      <div className="newContainer">
        <div className="top">
          <h1>Register</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder
                    
                  }
                  id={input.id} />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
