import React, { Component } from 'react'
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa'
import Logo from '../../Assets/images/logo/logof.png'
import { Link } from 'react-router-dom'
const SocialShare = [
  {
    Social: <FaFacebookF style={{ fontSize: '25px' }} />,
    link: 'https://www.facebook.com/',
  },
  {
    Social: <FaLinkedinIn style={{ fontSize: '25px' }} />,
    link: 'https://www.linkedin.com/',
  },
  {
    Social: <FaInstagram style={{ fontSize: '25px' }} />,
    link: 'https://www.instagram.com/',
  },
  {
    Social: <FaTwitter style={{ fontSize: '25px' }} />,
    link: 'https://twitter.com/',
  },
]
class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer-area">
          <div className="footer-wrapper">
            {/* <div className="row align-items-end row--0">
              <div className="col-lg-12">
                <div className="footer-left">
                  <div className="inner text-center">
                    <h2>Follow us</h2>
                    <span>Stay in touch, follow us on:</span>
                    <div className="social-share-inner ">
                      <ul className="social-share social-style--2 d-flex justify-content-center liststyle mt--15">
                        {SocialShare.map((val, i) => (
                          <li key={i}>
                            <a href={`${val.link}`}>{val.Social}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row align-items-end row--0">
              <div className="col-lg-12">
                <div className="footer-right">
                  <div className="row">
                    <div className="logo">
                      <Link to="/">
                        <img
                          src={Logo}
                          style={{
                            width: '300px',
                            height: '100',
                            objectFit: 'contain',
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    {/* Start Single Widget  */}
                    <div className="col-lg-6 col-sm-6 col-12">
                      <div className="footer-link">
                        <h4>Quick Link</h4>
                        <ul className="ft-link">
                          <li>
                            <a href="/">Home</a>
                          </li>
                          <li>
                            <a href="/products">Products</a>
                          </li>
                          <li>
                            <a href="/resources">Resources</a>
                          </li>
                          <li>
                            <a href="/about">About</a>
                          </li>
                          <li>
                            <a href="/contact">Contact us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End Single Widget  */}
                    {/* Start Single Widget  */}
                    <div className="col-lg-6 col-sm-6 col-12 mt_mobile--30">
                      <div className="footer-link">
                        <h4>Say Hello</h4>
                        <ul className="ft-link">
                          <li>
                            <a href="mailto:admin@example.com">
                              admin@example.com
                            </a>
                          </li>
                          <li>
                            <a href="mailto:hr@example.com">hr@example.com</a>
                          </li>
                        </ul>

                        <div className="social-share-inner">
                          <ul className="social-share social-style--2 d-flex justify-content-start liststyle mt--15">
                            {SocialShare.map((val, i) => (
                              <li key={i}>
                                <a href={`${val.link}`}>{val.Social}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* End Single Widget  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}
export default Footer
