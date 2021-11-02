import React, { Component, Fragment } from 'react'

import './Home.css'
import ScrollToTop from 'react-scroll-up'
import { FiChevronUp } from 'react-icons/fi'

import Header from '../component/header/HeaderHome'
import Footer from '../component/footer/Footer'
import Portfolio from '../component/HomeLayout/homeOne/Portfolio'

import { Link } from 'react-router-dom'

import 'react-multi-carousel/lib/styles.css'

import BlogContent from '../elements/blog/BlogContent'

import Helmet from '../component/common/Helmet'
import { BiBuildings } from 'react-icons/bi'

import { RiTeamLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { RiImageEditLine } from 'react-icons/ri'

import homepi from '../Assets/images/bg/bg-image-175.png'

import { BiRecycle } from 'react-icons/bi'
import { BiPaint } from 'react-icons/bi'
import paint from '../Assets/3Dprint.png'

import ProfileCarausal from '../component/Profilecarausal/ProfileCarausal'

class DigitalAgency extends Component {
  state = {
    position: 0,
    position1: 0,
    position2: 0,
  }
  componentDidMount() {
    console.log(window.Parallax)
    var scene = document.getElementById('scene')
    var parallaxInstance = new window.Parallax(scene, {
      relativeInput: true,
    })
  }
  showCoords = (event) => {
    var x = event.clientX
    var y = event.clientY
    this.setState({
      position: parseInt((x + y) / 100) + 10,
      positionY: parseInt(y / 7) + 10,
      positionY1: parseInt(y / 5) + 10,
      position1: parseInt((x + y) / 60) + 10,
      positionY2: parseInt(y / 3) + 10,
      position2: parseInt((x + y) / 40) + 10,
    })
  }
  render() {
    const {
      position,
      positionY,
      position1,
      positionY1,
      position2,
      positionY2,
    } = this.state
    // console.log(position + '%')
    // console.log(positionY + '%')
    const bgStyle = {
      backgroundPositionX: position2 + '%',
      backgroundPositionY: positionY2 + '%',
      transitionTimingFunction: 'ease-in',
      transition: '1s',
      // backgroundPositionY: "30%",
    }

    const bgStyle1 = {
      backgroundPositionX: position + '%',
      backgroundPositionY: positionY + '%',
      transitionTimingFunction: 'ease-in',
      transition: '.8s',
      // backgroundPositionY: "30%",
    }

    const bgStyle2 = {
      backgroundPositionX: position1 + '%',
      backgroundPositionY: positionY1 + '%',
      transitionTimingFunction: 'ease-in',
      transition: '.9s',
      // backgroundPositionY: "30%",
    }
    // const PostList = BlogContent.slice(0, 3);
    // let title = "About",
    //   description =
    //     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum,";
    return (
      <Fragment>
        <Helmet pageTitle="Digital Agency" />

        {/* Start Header Area  */}

        {/* End Header Area  */}

        {/* Main page effect*/}
        <div
          id="scene"
          className="page-effect"
          // onMouseMoveCapture={(event) => {
          //   this.showCoords(event)
          // }}
        >
          <div className="bg1" data-depth="0.6"></div>
          <div className="bg2" data-depth="0.4"></div>
          <div className="bg3" data-depth="0.2"></div>
        </div>
        <div className="childclass">
          <Header logo="light" />
          <div className="bgs pt--120">
            {/*style={bgStyle}*/}

            <h2 className="page-p">Create beautiful emails, fast.</h2>
            <h3
              style={{
                color: 'white',
                fontWeight: '400',
                paddingBottom: '1.5rem',
              }}
            >
              Z is the drag & drop you are looking for designing mobile
              responsive designs.
            </h3>
            <div className="strt-designbttn">
              <Link to="/sdviewer">
                <span className="strt-design-bttn">START MAKING</span>
              </Link>
            </div>
            {/* <span className="no-signup">No signup required</span> */}
            <div style={{ paddingTop: '2rem' }}>
              <img src={homepi} alt="" className="modalpic" />
            </div>
          </div>
        </div>

        {/* Start Slider Area   */}
        <div className="usage-require ptb--60">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-4 col-md-6 col-12"
                style={{ paddingTop: '2rem' }}
              >
                <div className="req-items">
                  <BiPaint
                    style={{ color: 'rgb(255 114 25)', fontSize: '100px' }}
                  />
                  <span className="items-t">Custom-Made</span>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12"
                style={{ paddingTop: '2rem' }}
              >
                <div className="req-items">
                  <img src={paint} style={{ width: '90px' }} />
                  <span className="items-t">Easy to 3D Print</span>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12"
                style={{ paddingTop: '2rem' }}
              >
                <div className="req-items">
                  <BiRecycle
                    style={{ color: 'rgb(255 114 25)', fontSize: '100px' }}
                  />
                  <span className="items-t">Sustainable Manufacturing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Service Area  */}
        <div className="service-area pt--120 pb--80 bg_color--1">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center service-style--3 mb--30">
                <h4 className="title">
                  Start with a beautiful, mobile-responsive template
                </h4>
                <p>
                  Start with a blank canvas to build your email from scratch
                  <br />
                  Or kickstart your design process with one of our ready-to-go
                  email templates.
                </p>
                <div className="discvr-d" style={{ paddingTop: '2rem' }}>
                  <Link>
                    <span className="browse-catlg">BROWSE CATALOG</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="favorit-heading">
            <div className="favorit-tp">
              <h2 className="page-p2">Most popular</h2>
              <p>Take a look at these customer favourites</p>
            </div>
          </div>
          <div className="portfolio-area bg_color--1">
            <div className="portfolio-sacousel-inner mb--55">
              <Link to="/products">
                <Portfolio />
              </Link>
            </div>
          </div>
        </div>
        {/* End Service Area  */}

        {/* Start Plan Area */}
        <div className="portfolio-area  bg_image pb--80">
          <div className="portfolio-sacousel-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center service-style--3 mb--70">
                    <h3 className="title" style={{ fontWeight: '500' }}>
                      Pick your plan
                    </h3>
                  </div>
                </div>
              </div>

              <div className="row ">
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12 text-center"
                  style={{ paddingTop: '1rem' }}
                >
                  <div className="deal-contain">
                    <CgProfile
                      style={{
                        color: '#d3d3d3',
                        fontSize: '100px',
                      }}
                    />
                    <h3>
                      <span style={{ color: '#ff5900', fontSize: '1.5rem' }}>
                        Z Pro
                      </span>
                      <br />
                      <span style={{ fontWeight: '500' }}>FREELANCER</span>
                      <br />
                      <p className="trail-stat-p">$ 9.99</p>
                    </h3>
                    <p className="enabl-p">Lite editor</p>
                    <p className="enabl-p">Export images</p>
                    <p className="disabl-p">
                      <del className="disabl-pt"> Unlimited emails</del>
                    </p>
                    <p className="disabl-p">
                      <del className="disabl-pt">User roles</del>
                    </p>
                    <p className="disabl-p">
                      <del className="disabl-pt">Brand restricted access</del>
                    </p>
                    <div className="plan-btn-d">
                      <Link to="/new">
                        <span className="plan-buttn2">Monthly</span>
                      </Link>
                    </div>

                    <p style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                      <u>Pricing</u>
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12 text-center"
                  style={{ paddingTop: '1rem' }}
                >
                  <div className="deal-contain">
                    <RiTeamLine
                      style={{
                        color: '#d3d3d3',
                        fontSize: '100px',
                      }}
                    />
                    <h3>
                      <span style={{ color: '#ff5900', fontSize: '1.5rem' }}>
                        Z Pro
                      </span>
                      <br />
                      <span style={{ fontWeight: '500' }}>TEAM</span>
                      <br />
                      <p className="trail-stat-p">$ 59.94</p>
                    </h3>
                    <p className="enabl-p">Lite editor</p>
                    <p className="enabl-p">Export images</p>
                    <p className="disabl-p">
                      <del className="disabl-pt"> Unlimited emails</del>
                    </p>
                    <p className="disabl-p">
                      <del className="disabl-pt">User roles</del>
                    </p>
                    <p className="disabl-p">
                      <del className="disabl-pt">Brand restricted access</del>
                    </p>
                    <div className="plan-btn-d">
                      <Link to="/new">
                        <span className="plan-buttn2"> Six Months</span>
                      </Link>
                    </div>

                    <p style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                      <u>Pricing</u>
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12 text-center"
                  style={{ paddingTop: '1rem' }}
                >
                  <div className="deal-contain">
                    <BiBuildings
                      style={{
                        color: '#d3d3d3',
                        fontSize: '100px',
                      }}
                    />
                    <h3>
                      <span style={{ color: '#ff5900', fontSize: '1.5rem' }}>
                        Z Pro
                      </span>
                      <br />
                      <span style={{ fontWeight: '500' }}>AGENCY</span>
                      <br />
                      <p className="trail-stat-p">$ 119.88</p>
                    </h3>
                    <p className="enabl-p">Lite editor</p>
                    <p className="enabl-p">Export images</p>
                    <p className="disabl-p">
                      <del className="disabl-pt"> Unlimited emails</del>
                    </p>
                    <p className="disabl-p">
                      <del className="disabl-pt">User roles</del>
                    </p>
                    <p className="disabl-p">
                      <del className="disabl-pt">Brand restricted access</del>
                    </p>
                    <div className="plan-btn-d">
                      {' '}
                      <Link to="/new">
                        <span className="plan-buttn2">Yearly</span>
                      </Link>
                    </div>

                    <p style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                      <u>Pricing</u>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Plan Area */}

        {/* Start About Area */}

        <div className="rn-testimonial-area ptb--120 bg_color--5">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-2 md-2 sm-2 col-12 text-center"
                style={{ paddingRight: '0px' }}
              >
                <RiImageEditLine
                  style={{ fontSize: '130px', color: '#c6c6c6' }}
                />
              </div>

              <div
                className="col-lg-6 md-6 sm-6 col-12"
                style={{ paddingLeft: '0px' }}
              >
                <h3 className="dicoverZ">Discover Z Industries:</h3>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#7e7b7b',
                  }}
                >
                  Learn more about us and our mission to decentralize
                  manufacturing.
                </p>
              </div>
              <div className="col-lg-4 md-4 sm-12 col-12">
                <div className="discvr-d" style={{ paddingTop: '2rem' }}>
                  <Link to="/about">
                    <span className="aboutus-btn-hm">About us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start trial Area */}
        <div className="rn-blog-area pt--120 pb--80 bg_color--1">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-12">
                <div className="section-title text-center service-style--3">
                  <h4>
                    Design in one place,
                    <br />
                    send anywhere
                  </h4>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="free-trial-buttn mt--20 text-center">
                  <div className="discvr-d" style={{ paddingTop: '2rem' }}>
                    <Link to="/resources">
                      <span className="disc-buttntrial">HOW TO USE IT</span>
                    </Link>
                  </div>
                  {/* <div className="discvr-d" style={{ paddingTop: '2rem' }}>
                    <Link>
                      <span className="disc-buttnexport">HOW TO EXPORT</span>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Trial Area */}

        {/* Start Footer Style  */}
        <Footer />
        {/* End Footer Style  */}
        {/* Start Back To Top */}
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>
        {/* End Back To Top */}
      </Fragment>
    )
  }
}

export default DigitalAgency
