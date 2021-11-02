import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { GoLocation } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import axios from "../../AxiosInstance";

class ContactTwo extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    reportABug: false,
    requestACustomDesign: false,
    createAcase: false,
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckBox = (e) => {
    let check = this.state[e.target.name];
    this.setState({ [e.target.name]: !check });
    console.log("CheckBox", e.target.name, e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("State", this.state);
    // this.setState({ responseError: null });
    // console.log("This is submit State", this.state);
    this.setState({ responseMessage: null });
    axios
      .post("contactus/sentEmail", this.state)
      .then((res) => {
        console.log("Response contactus", res);
        this.setState({
          responseMessage: {
            message: "Message Sent Successful",
            class: "text-success",
          },
        });
      })
      .catch((err) => {
        console.log("Error sign In", err.response);
        this.setState({
          responseMessage: {
            message: "Message Sent Failed",
            class: "text-danger",
          },
        });

        // this.setState({ responseError: err.response.data.message });
      });
  };

  render() {
    return (
      <div className="contact-form--1">
        <div className="container form-wraper">
          <div className="row row--35 align-items-start">
            <div
              className="col-lg-9 order-1 order-lg-1"
              style={{ paddingRight: "0px" }}
            >
              <div className="form-wrapper">
                <div className="contact-form-container">
                  {" "}
                  <form
                    style={{ padding: "8% 7% 8% 7%" }}
                    onSubmit={this.handleSubmit}
                  >
                    <label htmlFor="item01" style={{ fontSize: "1rem" }}>
                      {" "}
                      YOUR NAME AND SURNAME
                      <span style={{ color: "blue" }}> *</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="item01"
                      value={this.state.rnName}
                      onChange={this.handleInputChange}
                      style={{ backgroundColor: "whitesmoke" }}
                    />
                    <label htmlFor="item02" style={{ fontSize: "1rem" }}>
                      YOUR EMAIL<span style={{ color: "blue" }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="email"
                      id="item02"
                      onChange={this.handleInputChange}
                      style={{ backgroundColor: "whitesmoke" }}
                    />
                    <label htmlFor="item03" style={{ fontSize: "1rem" }}>
                      REASON FOR INQUIRY{" "}
                      <span style={{ color: "blue" }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="reason_for_inquiry"
                      id="item05"
                      onChange={this.handleInputChange}
                      style={{ backgroundColor: "whitesmoke" }}
                    />
                    <label style={{ fontSize: "1rem" }}>
                      WRITING ABOUT <span style={{ color: "blue" }}>*</span>
                    </label>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        <FormControlLabel
                          value="reportBug"
                          control={<Radio color="primary" />}
                          label="Report a bug"
                          name="reportABug"
                        />
                        <FormControlLabel
                          value="createcase"
                          control={<Radio color="primary" />}
                          label="Create a case"
                          name="requestACustomDesign"
                        />
                        <FormControlLabel
                          value="custmDesign"
                          control={<Radio color="primary" />}
                          label="Request a custom Design"
                          name="createAcase"
                        />
                      </RadioGroup>
                    </FormControl>
                    <label htmlFor="item05" style={{ fontSize: "1rem" }}>
                      SUBJECT <span style={{ color: "blue" }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="subject"
                      id="item05"
                      value={this.state.rnSubject}
                      onChange={this.handleInputChange}
                      style={{ backgroundColor: "whitesmoke" }}
                    />
                    <label htmlFor="item06" style={{ fontSize: "1rem" }}>
                      YOUR MESSAGE <span style={{ color: "blue" }}>*</span>
                    </label>
                    <textarea
                      required
                      type="text"
                      id="item06"
                      name="message"
                      value={this.state.rnMessage}
                      onChange={this.handleInputChange}
                      style={{ backgroundColor: "whitesmoke" }}
                    />
                    {this.state.responseMessage && (
                      <span className={this.state.responseMessage.class}>
                        {this.state.responseMessage.message}
                      </span>
                    )}

                    <div className="d-flex justify-content-end">
                      {" "}
                      <button
                        className="btn btn-primary"
                        type="submit"
                        value="submit"
                        name="submit"
                        id="mc-embedded-subscribe"
                        style={{
                          borderRadius: "20px",
                          width: "85px",
                          backgroundColor: "#15aaa9",
                          border: "none",
                          color: "white",
                        }}
                      >
                        SEND
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 order-2 order-lg-2"
              style={{ paddingLeft: "0px" }}
            >
              <div className="form-side-query">
                {/*className=thumbnail mb_md--30 mb_sm--30*/}
                {/* <img src="/assets/images/about/about-6.jpg" alt="trydo" /> */}
                <div className="need-answr">
                  <div style={{ textAlign: "center" }}>
                    <TiMessages className="query-icn" />
                  </div>

                  <br />
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <span className="query-spn">
                      Need an answer immediately?
                    </span>
                    <p className="query-p">
                      You can find answers to common questions on the{" "}
                      <Link>
                        <u>Help Center</u>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="need-answr">
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <GoLocation className="query-icn" />
                  </div>

                  <br />
                  <div style={{ textAlign: "center" }}>
                    <span className="query-spn">Where we are</span>
                    <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                      <br />
                      MailUp, inc.
                    </span>
                    <p className="query-p">
                      450 Townsend St. 1st Floor San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                <div className="need-answr">
                  <div style={{ textAlign: "center" }}>
                    <ImProfile className="query-icn" />
                  </div>

                  <br />
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <span className="query-spn">Who we are</span>
                    <p className="query-p1">
                      BEE is a startup within a larger company. The company's
                      name is MailUp, Inc., a US-based corporation that is part
                      of the Italy-based MailUp Group.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactTwo;
