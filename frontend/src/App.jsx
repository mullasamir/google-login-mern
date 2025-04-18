
import './App.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './Dashboard';
// import Register from './pages/Register';
import { useState } from 'react';
// import RefrshHandler from './RefrshHandler';
import NotFound from './PageNotFound';

function App() {

  const GoogleAuthWrapper = ()=>{

    return (
      <GoogleOAuthProvider clientId='862915480979-a8ca0gsj5f6c3592o6hnaq3ttbq45v82.apps.googleusercontent.com'>
        <GoogleLogin ></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }

	return (
		<BrowserRouter>
		   
			<Routes>
				<Route path="/login" element={<GoogleAuthWrapper/>}/>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        {/* <Route path="register" element={<Register/>}/> */}
        <Route path="*" element={<NotFound/>}/>
        <Route/>
			</Routes>
	</BrowserRouter>
	)
}

export default App
