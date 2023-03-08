import React from 'react'
import "./LoginContainer.scss"
import { useNavigate ,useSearchParams} from 'react-router-dom';
import { useEffect } from 'react';

const LoginModal = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const openGoogle = () => {
        // window.location.href = "http://ec2-15-165-122-126.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google"
        // const nextStep = async () => {
        //     await navigate("/oauth/redirect", { state: { url: "http://ec2-15-165-122-126.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google" } })
        // }
        
        const GOOGLE_CODE = searchParams.get("token")
        localStorage.setItem("token",GOOGLE_CODE)
        //navigate("/oauth/redirect");
        fetch(`http://ec2-15-165-122-126.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google`)
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem("token",data)
            //navigate("/oauth/redirect");
        })
        // 토큰 불러오고
    };
    useEffect(()=>{
        // setTimeout(()=>{
        //     navigate("/oauth/redirect",{replace:true})
        // })
    },[])
    return (
    <div className='login-container'>
        <div className='login-header'>
            <a className='login-link' href='/main'><span className='login-logo'>RSD</span></a>
        </div>
        <div className='login-bottom-container'>
            <span className='login-title'>RSD</span>        
            <button type="button" className='social-login-btn' onClick={openGoogle}><span>Google Play로 로그인</span></button>
        </div>
    </div>
  )
}

export default LoginModal