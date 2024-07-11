import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import { userInputs } from "./formSource.js";

function App() {
  // console.log(userInputs);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/New" element= {<New inputs={userInputs} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
