import React from 'react'
import './Support.css'
import Helmet from '../component/common/Helmet'
import Header from '../component/header/HeaderHome1'
import Footer from '../component/footer/FooterThree'
import { Link } from 'react-router-dom'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiOutlineImport } from 'react-icons/ai'
import { BiTransferAlt } from 'react-icons/bi'
import { AiOutlineProject } from 'react-icons/ai'
import { BiGitMerge } from 'react-icons/bi'
import { ImInsertTemplate } from 'react-icons/im'
import { FaUserFriends } from 'react-icons/fa'
import Button from '@material-ui/core/Button'

function Support() {
  return (
    <div>
      <Helmet pageTitle="Digital Agency" />

      <Header logo="light" />
      <div className="page-strt pt--120">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '35px' }}>Support</h2>
          <p className="supprt-strt-p">
            To start, try searching by keywords...
          </p>
          <div style={{ paddingBottom: '2rem' }}>
            <form style={{ height: '44px' }}>
              <input
                className="searchfield"
                placeholder="What do you need help with?"
              />
              <Button
                style={{
                  backgroundColor: '#ff5900',
                  color: 'white',
                  height: '100%',
                  borderRadius: '0px 10px 10px 0px',
                  verticalAlign: 'baseline',
                }}
              >
                Search
              </Button>
            </form>
          </div>
          {/* <p className="supprt-strt-p2">OR BROWSE THESE POPULAR TOPICS</p> */}
        </div>
      </div>
      <div className="search-bytopics ptb--120">
        <div className="search-bytopics-heding text-center">
          <h2 className="abutzplugin">
            FAQs about <span style={{ color: '#ff5900' }}>Z</span>
          </h2>
          <p>
            Need more help?
            <Link>
              <u style={{ color: '#ff5900' }}>Search the full help site</u>
            </Link>
            &nbsp; or&nbsp;
            <Link>
              <u style={{ color: '#ff5900' }}>open a ticket</u>
            </Link>
          </p>
        </div>
        <div className="topics-tosearch">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <AiOutlineImport className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    How do I import my messag from Z?
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <BiGitMerge className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Merge tags & Special links settings
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <BiTransferAlt className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    How do I transfer a message to another app?
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <ImInsertTemplate className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    How do I add a new template to the catalog?
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <AiOutlineProject className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Managing projects
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <FaUserFriends className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Multi-user support in Z
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="search-bytopics pb--120">
        <div className="search-bytopics-heding text-center">
          <h2 className="abutzplugin">
            FAQs about <span style={{ color: '#ff5900' }}>Z</span> Plugin
          </h2>
          <p>
            Need more help?
            <Link>
              <u style={{ color: '#ff5900' }}>BEE Plugin technical docs</u>
            </Link>
            &nbsp; or&nbsp;
            <Link>
              <u style={{ color: '#ff5900' }}>open a ticket</u>
            </Link>
          </p>
        </div>
        <div className="topics-tosearch">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Initializing the plugin
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Configuring the editor
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Displaying the editor
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Server-side settings
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Font management
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Roles and permissions{' '}
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20 ">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>

                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Display conditions
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-12" style={{ paddingTop: '20px' }}>
                <div className="topics-div ptb--20">
                  <span>
                    <AiOutlineSetting className="topics-div-icn" />
                  </span>
                  <span className="topics-div-cnt justify-content-center align-self-center">
                    Frequently asked questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fnd-yrproject text-center ptb--80">
        <div className="container">
          {' '}
          <h3 className="h3cnt">Any confusion about the Z Products?</h3>
          <p style={{ fontSize: '25px' }}>
            We created a{' '}
            <span style={{ fontWeight: '600' }}>"Find your product"</span>page
            where you can discover the differences
          </p>
          <div className="discvr-d" style={{ paddingTop: '2rem' }}>
            <Link to="/products">
              <span className="browse-catlg1">FIND YOUR PRODUCT</span>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Support
