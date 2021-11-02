import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiMenu } from 'react-icons/fi'
import Logo from '../../Assets/images/logo/logof.png'
import auth from '../../elements/authService'

class Header extends Component {
  state = {
    userObject: auth.getCurrentUser(),
  }
  constructor(props) {
    super(props)
    this.menuTrigger = this.menuTrigger.bind(this)
    this.CLoseMenuTrigger = this.CLoseMenuTrigger.bind(this)
    //  this.subMetuTrigger = this.subMetuTrigger.bind(this);
    window.addEventListener('load', function () {
      console.log('All assets are loaded')
    })
  }

  menuTrigger() {
    document.querySelector('.header-wrapper').classList.toggle('menu-open')
  }

  CLoseMenuTrigger() {
    document.querySelector('.header-wrapper').classList.remove('menu-open')
  }

  render() {
    var elements = document.querySelectorAll('.has-droupdown > a')
    for (var i in elements) {
      if (elements.hasOwnProperty(i)) {
        elements[i].onclick = function () {
          if (this.parentElement.querySelector('.submenu')) {
            this.parentElement
              .querySelector('.submenu')
              .classList.toggle('active')
          }
          this.classList.toggle('open')
        }
      }
    }
    const { logo, color = 'default-color' } = this.props
    let logoUrl

    return (
      <header
        className={`header-area formobile-menu header--transparent ${color}`}
      >
        <div className="header-wrapper" id="header-wrapper">
          <div className="header-left">
            <div className="logo">
              <Link to="/">
                <img src={Logo} width="154px" height="38px" />
              </Link>
            </div>
          </div>
          <div className="header-right">
            <nav className="mainmenunav d-lg-block">
              <ul className="mainmenu">
                <li className="has-droupdown">
                  <Link to="/" style={{ color: '#e6e7eb' }}>
                    Home
                  </Link>
                </li>
                <li className="has-droupdown">
                  <Link to="/products" style={{ color: '#e6e7eb' }}>
                    Products
                  </Link>
                </li>
                <li className="has-droupdown">
                  <Link to="/resources" style={{ color: '#e6e7eb' }}>
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/about" style={{ color: '#e6e7eb' }}>
                    About
                  </Link>
                </li>

                <li>
                  <Link to="/contact" style={{ color: '#e6e7eb' }}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {!this.state.userObject && (
              <div className="header-btn">
                <Link to="/login" className="rn-btn1">
                  <span className="lgoin-btn">LOG IN</span>
                </Link>
              </div>
            )}

            {this.state.userObject && (
              <div className="header-btn">
                <Link to="/customerpanel">
                  <span className="lgoin-btn">Dashboard</span>
                </Link>
              </div>
            )}
            {this.state.userObject && (
              <div
                className="header-btn"
                onClick={() => {
                  auth.logout()
                  window.location = '/resources'
                }}
              >
                <span className="lgoin-btn">LOG OUT</span>
              </div>
            )}
            {/* Start Humberger Menu  */}
            <div className="humberger-menu d-block d-lg-none pl--20">
              <span
                onClick={this.menuTrigger}
                className="menutrigger text-white"
              >
                <FiMenu />
              </span>
            </div>
            {/* End Humberger Menu  */}
            <div className="close-menu d-block d-lg-none">
              <span onClick={this.CLoseMenuTrigger} className="closeTrigger">
                <FiX />
              </span>
            </div>
            <div className="underlin-headr"></div>
          </div>
        </div>
      </header>
    )
  }
}
export default Header
