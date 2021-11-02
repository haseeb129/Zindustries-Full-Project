import React, { Component } from 'react'
import PageHelmet from '../component/common/Helmet'
import Breadcrumb from '../elements/common/Breadcrumb'
import CounterOne from '../elements/counters/CounterOne'
import Testimonial from '../elements/Testimonial'
import BrandTwo from '../elements/BrandTwo'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import ScrollToTop from 'react-scroll-up'
import { FiChevronUp } from 'react-icons/fi'
import Header from '../component/header/Header'
import Footer from '../component/footer/FooterThree'
import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import aboutus from '../Assets/images/bg/bg-image-17.jpg'

class About extends Component {
  render() {
    let title = 'Z Industries ecosystem',
      description =
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going.'
    return (
      <React.Fragment>
        <PageHelmet pageTitle="About" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* Start Breadcrump Area */}
        {/* <Breadcrumb title={"About"} /> */}
        <div className="about-us-title ptb--80">
          <div
            class="row"
            style={{
              backgroundImage: `url(${aboutus})`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            {' '}
            <div className="col-lg-12">
              <div className=".contact-top" style={{ padding: '0px 10px' }}>
                <div
                  className="inner text-right pt--50"
                  style={{ height: '400px' }}
                >
                  <h2 className="wrZin">We are Z Industries</h2>
                  <span style={{ fontSize: '1.7rem', lineHeight: '23px' }}>
                    Welcome to beautiful, fast services
                  </span>
                  <p className="aboutus-p">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End Breadcrump Area */}

        {/* Start About Area  */}
        <div className="rn-about-area ptb--120 bg_color--1">
          <div className="rn-about-wrapper">
            <div className="container">
              <div className="row row--35 align-items-center">
                <div className="col-lg-7">
                  <div className="about-inner inner">
                    <div className="section-title">
                      <h3 className="title">{title}</h3>
                      <p className="description">{description}</p>
                    </div>
                    <div className="row mt--30">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="about-us-list">
                          <h3 className="title">Who we are</h3>
                          <p>
                            There are many vtions of passages of Lorem Ipsum
                            available, but the majority have suffered.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="about-us-list">
                          <h3 className="title">Who we are</h3>
                          <p>
                            There are many vtions of passages of Lorem Ipsum
                            available, but the majority have suffered.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="thumbnail">
                    <img
                      className="w-100"
                      src="/assets/images/bg/bg-image-172.png"
                      alt="About Images"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End About Area  */}

        {/* Start About Area2  */}
        <div
          className="rn-about-area ptb--120 "
          style={{ background: 'rgb(242, 242, 242)' }}
        >
          <div className="rn-about-wrapper">
            <div className="container">
              <div className="row row--35 align-items-center">
                <div className="col-lg-5 order-2 order-lg-1">
                  <div className="thumbnail">
                    <img
                      className="w-100"
                      src="/assets/images/bg/bg-image-173.png"
                      alt="About Images"
                    />
                  </div>
                </div>
                <div classNmae="col-lg-1"></div>
                <div className="col-lg-6 order-1 order-lg-2">
                  <div className="about-inner inner">
                    <div className="section-title">
                      <h3 className="title">{title}</h3>
                      <p className="description">{description}</p>
                    </div>
                    <div className="section-title ptb--120">
                      <p className="description">{description}</p>
                    </div>
                    <div className="row mt--30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End About Area2  */}

        <div className="rn-pricing-table-area ptb--120 bg_color--5">
          <div className="row">
            <div className="col-lg-12">
              <div className="container">
                {' '}
                <div className="section-title service-style--3 text-center mb--25">
                  <h2 className="title">Press Kit</h2>
                  <p>
                    You can find everything in this handy press kit. And if
                    there's something you can't find,
                    <Link>
                      <u style={{ fontWeight: '300' }}>contact us!</u>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Start PRicing Table Area  */}
            <div className="col-lg-2 col-md-3"></div>
            <div
              className="col-lg-3 col-md-4 col-12"
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <div className="rn-pricing" style={{ border: 'none' }}>
                <div className="pricing-table-inner">
                  <div className="pricing-header">
                    <img
                      src="/assets/images/bg/ico-bee.png"
                      alt="About Images"
                      style={{ maxWidth: '130px' }}
                    />
                  </div>
                  <div className="pricing-body text-center">
                    <h4 style={{ color: '#b7b7b9' }}>ZIndustries</h4>
                    <ul className="list-style--1">
                      <li>
                        <FiCheck /> 5 PPC Campaigns
                      </li>
                      <li>
                        <FiCheck /> Digital Marketing
                      </li>
                      <li>
                        <FiCheck /> Marketing Agency
                      </li>
                      <li>
                        <FiCheck /> Seo Friendly
                      </li>
                      <li>
                        <FiCheck /> UI/UX designs
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer">
                    <a
                      className="rn-btn"
                      href="#pricing"
                      style={{ border: ' 2px solid #acacac', color: 'skyblue' }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End PRicing Table Area  */}

            {/* Start PRicing Table Area  */}
            <div
              className="col-lg-3 col-md-4 col-12"
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <div className="rn-pricing " style={{ border: 'none' }}>
                <div className="pricing-table-inner">
                  <div className="pricing-header">
                    <img
                      src="/assets/images/bg/ico-bee.png"
                      alt="About Images"
                      style={{ maxWidth: '130px' }}
                    />
                  </div>
                  <div className="pricing-body text-center">
                    <h4 style={{ color: '#b7b7b9' }}>ZProducts</h4>
                    <ul className="list-style--1">
                      <li>
                        <FiCheck /> 5 PPC Campaigns
                      </li>
                      <li>
                        <FiCheck /> Digital Marketing
                      </li>
                      <li>
                        <FiCheck /> Marketing Agency
                      </li>
                      <li>
                        <FiCheck /> Seo Friendly
                      </li>
                      <li>
                        <FiCheck /> UI/UX designs
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer">
                    <a
                      className="rn-btn"
                      href="#pricing"
                      style={{ border: ' 2px solid #acacac', color: 'skyblue' }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End PRicing Table Area  */}

            {/* Start PRicing Table Area  */}
            <div
              className="col-lg-3 col-md-4 col-12"
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <div className="rn-pricing" style={{ border: 'none' }}>
                <div className="pricing-table-inner">
                  <div className="pricing-header">
                    <img
                      src="/assets/images/bg/ico-paper.png"
                      alt="About Images"
                      style={{ maxWidth: '130px' }}
                    />
                  </div>
                  <div className="pricing-body text-center">
                    <h4 style={{ color: '#b7b7b9' }}>Documents</h4>
                    <ul className="list-style--1">
                      <li>
                        <FiCheck /> 5 PPC Campaigns
                      </li>
                      <li>
                        <FiCheck /> Digital Marketing
                      </li>
                      <li>
                        <FiCheck /> Marketing Agency
                      </li>
                      <li>
                        <FiCheck /> Seo Friendly
                      </li>
                      <li>
                        <FiCheck /> UI/UX designs
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer">
                    <a
                      className="rn-btn"
                      href="#pricing"
                      style={{ border: ' 2px solid #acacac', color: 'skyblue' }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End PRicing Table Area  */}
            <div className="col-lg-2 col-md-3"></div>
          </div>
        </div>

        {/* Start Team Area  */}

        {/* End Team Area  */}

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
export default About
