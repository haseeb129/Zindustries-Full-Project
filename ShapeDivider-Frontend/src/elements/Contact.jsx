import React, { Component } from 'react'
import PageHelmet from '../component/common/Helmet'
import { FiHeadphones, FiMail, FiMapPin } from 'react-icons/fi'
import GoogleMapReact from 'google-map-react'
import ContactTwo from '../elements/contact/ContactTwo'
import BrandTwo from '../elements/BrandTwo'
import ScrollToTop from 'react-scroll-up'
import { FiChevronUp } from 'react-icons/fi'
import Header from '../component/header/Header'
import Footer from '../component/footer/Footer'
import contactus from '../Assets/images/bg/bg-image-17.jpg'
const AnyReactComponent = ({ text }) => <div>{text}</div>

class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHelmet pageTitle="About" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
        />

        {/* Start Breadcrump Area */}
        {/* <div
          className="rn-page-title-area pt--120 pb--190 bg_image bg_image--17"
          data-black-overlay="6"
        > */}
        <div className="contact-us-title pt--80 ">
          <div
            className="row"
            style={{
              backgroundImage: `url(${contactus})`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="container">
              <div className="col-lg-12">
                <div className="rn-page-title text-right pt--150 pb--50">
                  <h2 className="title theme-gradient">Let's get in touch</h2>
                  <p>We'd love to hear from you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Breadcrump Area */}

        {/* Start Contact Page Area  */}
        <div
          className="rn-contact-page pb--120"
          style={{
            backgroundColor: '#f2f2f2',
          }}
        >
          <div className=".contact-top pt--30">
            <div className="inner text-center" style={{ height: '200px' }}>
              <h2>Contact us</h2>
              <span className="contact-top-spn">
                Feel free to contact us for any question about our products and
                services
              </span>
            </div>
          </div>
          <ContactTwo />
        </div>
        {/* End Contact Page Area  */}

        {/* Start Back To Top */}
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>
        {/* End Back To Top */}

        <Footer />
      </React.Fragment>
    )
  }
}
export default Contact
