import React, { Component } from 'react'
import './loginNew.css'
import logicn from '../Assets/images/logo/logow.png'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import axios from '../AxiosInstance'
import Gmail from './Gmail'
import { Divider } from 'antd'
import { FlareSharp } from '@material-ui/icons'

export class loginNew extends Component {
  state = {
    email: '',
    password: '',

    emailpart: true,
    passwordpart: false,
    responseError: '',
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmitemailPart = (e) => {
    e.preventDefault()
    this.setState({ emailpart: false, passwordpart: true })
  }

  handleSubmitpasswordPart = (e) => {
    e.preventDefault()
    console.log('State', this.state)
    this.setState({ responseError: null })
    console.log('This is submit State', this.state)

    axios
      .post('auth/login', this.state)
      .then((res) => {
        console.log('Response Sign In', res)
        localStorage.setItem('token', res.data.token)
        window.location = '/'
      })
      .catch((err) => {
        console.log('Error sign In', err.response)
        this.setState({ responseError: err.response.data.message })
      })
  }
  render() {
    return (
      <div>
        <div
          className="row justify-content-center"
          style={{
            height: '100vh',
            backgroundColor: '#25303c',
            paddingTop: '8rem',
          }}
        >
          {this.state.emailpart && (
            <div className="email-prt">
              <div className="loginp_icon text-center">
                <Link to="/">
                  {' '}
                  <img src={logicn} alt="" style={{ width: '230px' }} />
                </Link>
              </div>
              <div className="login-wgogle">
                <Gmail />
              </div>
              <div className="login-dividr">
                <Divider style={{ color: '#9c99b6', fontSize: '15px' }}>
                  or
                </Divider>
              </div>
              <p className="login-guide">Log in with your email</p>
              <div className="inpt-f-login">
                <form
                  onSubmit={this.handleSubmitemailPart}
                  style={{ width: '355px' }}
                >
                  <input
                    required
                    id="outlined-email-input"
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="current-email"
                    className="email-field"
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <div style={{ marginTop: '1.5rem' }}>
                    <div className="accept-terms-txt">
                      Z Industries will use your data to personalize and improve
                      your experience and to provide you information about Z
                      Industries. You can change your preferences anytime. We
                      may use your data as described in our{' '}
                      <u className="pripolicy-lnk">Privacy Policy</u>.
                    </div>
                    <input
                      type="Submit"
                      value="CONTINUE"
                      className="login-cont-btn"
                    />
                  </div>

                  {this.state.responseError && (
                    <p className="alertText">{this.state.responseError}</p>
                  )}
                </form>
                <p className="signup-dr-lnk">
                  New to Z Industries?
                  <Link to="/signup" className="signup-lnk">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          )}

          {this.state.passwordpart && (
            <div className="password-prt">
              {this.state.responseError && (
                <span className="error-msg">{this.state.responseError}</span>
              )}
              <div className="loginp_icon text-center">
                <img src={logicn} alt="" style={{ width: '230px' }} />
              </div>
              <div className="login-wgogle">
                <Gmail />
              </div>
              <div className="login-dividr">
                <Divider style={{ color: '#9c99b6', fontSize: '15px' }}>
                  or
                </Divider>
              </div>
              <p className="login-guide">Enter your password</p>
              <div className="inpt-f-login">
                <form
                  onSubmit={this.handleSubmitpasswordPart}
                  style={{ width: '355px' }}
                >
                  <input
                    required
                    id="outlined-password-input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="password-field"
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <div style={{ marginTop: '1.5rem' }}>
                    <div className="accept-terms-txt">
                      Z Industries will use your data to personalize and improve
                      your experience and to provide you information about Z
                      Industries. You can change your preferences anytime. We
                      may use your data as described in our{' '}
                      <u className="pripolicy-lnk">Privacy Policy</u>.
                    </div>
                    <input
                      type="Submit"
                      value="CONTINUE"
                      className="login-cont-btn"
                    />
                  </div>
                </form>
                <p className="signup-dr-lnk">
                  New to Z Industries?
                  <Link to="/signup" className="signup-lnk">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default loginNew
