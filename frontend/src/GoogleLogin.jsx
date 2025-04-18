
import {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import {useNavigate} from 'react-router-dom';
    
function GoolgeLogin () {
	
    const navigate = useNavigate();
    const responseGoogle = async (authResult)=>{
        console.log("Google auth code:", authResult.code);
        try {

            if(authResult['code']){
                const result = await googleAuth(authResult.code);
                const {email,name,image} = result.data.user;
                const token = result.data.token;
                const obj = {email,name,image,token};
                localStorage.setItem('user-info',JSON.stringify(obj));
                
                console.log('result.data.user :',result.data.user);
                console.log(token); 
                navigate('/dashboard');
            }
            // console.log(authResult)
        } catch (error) {
            console.error('error while requesting google code',error);
            
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:'auth-code'
    })


    return (

        <div className="App">
            <button
            onClick={googleLogin}>
                Login With Google
            </button>

        </div>
    )
}

export default GoolgeLogin;
