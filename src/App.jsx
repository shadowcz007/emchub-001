import { Routes, Route, Outlet, Link,useNavigate } from "react-router-dom";
import  { useState } from "react";

import Home from './pages/Home'
import ModelDetail from './pages/ModelDetail'
import Rtl from './pages/Rtl'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UploadModel from './pages/UploadModel'

import BgProfile from "./assets/images/bg-profile.jpg";

import GENLOGO from "./assets/images/00036-212406480.png"

export default function App() {

  const nav=useNavigate();
  const [custId,setCustId]=useState(localStorage.getItem('_emc_hub_custId')||'')

  return (
    <div>
      
      <div className="emc-hub-logo-div">
      <Link to="/">
        <div className="emc-hub-logo" style={{backgroundImage: "url(" + GENLOGO + ")" }}></div>
        </Link>
        <div style={{marginLeft: '18px'}}>
        <h1>EMC HUB</h1>
        <p className="emc-hub-logo-text">(infinity symbol), (square-shaped), (distinctive logo),3d,c4d,blender,uegel, generative art</p>
        </div>

     </div>
    
     
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" Component={(props) => <Layout {...props} custId={custId}/>}>
          <Route index element={<Home />} />
          <Route path="login" Component={(props) => <Login {...props} 

          custId={custId} 

          nav={(path,custId)=>{
            nav(path);
            setCustId(custId)
          }}/>} 

          // updateCustId={(custId)=>setCustId(custId)}
          
          />
          <Route path="uploadModel" element={<UploadModel />} />
          <Route path="signUp" Component={(props) => <SignUp {...props} nav={(path,custId)=>{
            nav(path);
            setCustId(custId)
          }}/>} />
          <Route path="modelDetail" element={<ModelDetail />} />
          
          {/* 
          <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </div>
  );
}



function Layout(props) {
  console.log('layout',props)
  return (
    <div >
      <nav className="emc-hub-nav" style={{ backgroundImage: "url(" + BgProfile + ")" }}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/uploadModel">Upload Model</Link>
          </li> */}
          <li>
            <Link to="/login" >{!props.custId?'Login':'Logout'}</Link>
          </li>
          
          {/* <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li> */}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}


function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}