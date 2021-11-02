import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import googleicn from '../Assets/images/bg/googicon.png'
import './Gmail.css'
import axios from '../AxiosInstance'
import jwt_decode from 'jwt-decode'

export default (props) => {
  const [googleProfile, setGoogleProfile] = useState({})

  const responseGoogle = (response) => {
    console.log('Response', response)
    console.log(response)
    axios
      .post('auth/googleLogin', {
        token: response.tokenId,
      })
      .then((res) => {
        console.log('This is Error', res.data)
        console.log('Response Sign Up', res)
        if (res.data.userObject) {
          localStorage.setItem(
            'userObject',
            JSON.stringify(res.data.userObject),
          )
          window.location = '/new'
        } else if (res.data.token) {
          localStorage.removeItem('userObject')
          localStorage.setItem('token', res.data.token)
          window.location = '/'
        }
        // const decoded = jwt_decode(res.data.token);
        // console.log(decoded)
        // props.history.push("/");

        // window.location.reload();
      })
      .catch((err) => {
        console.log('This is Error', err.response)
      })
  }
  const errorGoogle = (response) => {
    console.log('errorGoogle', response)
    console.log(response)
    // axios
    //   .post("http://localhost:6005/auth/googleLogin", {
    //     token: response.tokenId,
    //   })
    //   .then((res) => {
    //     console.log("This is Error", res.data.user);
    //     localStorage.setItem("usertoken", res.data.token);
    //     // const decoded = jwt_decode(res.data.token);
    //     // console.log(decoded)
    //     // props.history.push("/");

    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log("This is Error", err.response);
    //   });

    // axios({
    //   method: "POST",
    //   url: "http://localhost:5000/api/users/googleLogin",
    //   data: { token: response.tokenId },
    // })
    //   .then((res) => {
    //     console.log("This is Error", res.data.user);
    //     localStorage.setItem("usertoken", res.data.token);
    //     // const decoded = jwt_decode(res.data.token);
    //     // console.log(decoded)
    //     // props.history.push("/");

    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log("This is Error", err.response);
    //   });
  }

  return (
    <div className="login-page">
      <GoogleLogin
        autoLoad={false}
        clientId="1021816276499-k5bvq30ljcom2q1n12tbtkdtum185erc.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={errorGoogle}
        cookiePolicy={'single_host_origin'}
        className="btn btnGoogle"
        icon={false}
      >
        <div className="row align-items-center">
          <img src={googleicn} style={{ width: '40px' }} />
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            Log in with Google
          </span>
        </div>
      </GoogleLogin>
    </div>
  )
}
