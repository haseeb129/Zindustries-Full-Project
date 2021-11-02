import React, { Component } from "react";
import "./Profile.css";
import Profile1 from "../../Assets/images/profilepic/profile1.png";
import Profile2 from "../../Assets/images/profilepic/profile2.png";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export class ProfileCarausal extends Component {
  render() {
    return (
      <div>
        <div
          style={{ backgroundRepeat: "no-repeat", backgroundColor: "#fafaf9" }}
          className="rn-featured-service-area pb--90  "
        >
          <div className="container">
            <div className="row-lg-12 pb--50 " style={{ textAlign: "center" }}>
              {/* <h3 style={{fontSize:"15px",color:"#5671FF"}}>TESTIMONIALS</h3> */}
              <h2 className="usesz">Who uses Z?</h2>
              <p>Hundreds of people like...</p>
            </div>
            <div className="cardresponsive">
              <Carousel
                style={{ paddingLeft: "110px" }}
                responsive={responsive}
                itemClass="carousel-padding-100-px"
                showDots={true}
              >
                <div className="container service service__style--8">
                  <div className="row justify-content-center align-items-center ">
                    <img
                      src={Profile1}
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <div>
                      <p
                        style={{
                          paddingLeft: "1rem",
                          lineHeight: "20px",
                          marginBottom: "5px",
                        }}
                      >
                        <b>JHON DOE</b>
                      </p>
                      <p style={{ paddingLeft: "1rem", lineHeight: "20px" }}>
                        Product Marketing
                        <br />
                        Specialist
                      </p>
                    </div>
                  </div>

                  <div className="row content text-center">
                    <p className="profilP">
                      2/3 of the managers say they don’t have proper means to
                      collect business knowledge from their employees.
                    </p>
                  </div>
                </div>

                <div className="container service service__style--8">
                  <div className="row justify-content-center align-items-center">
                    <img
                      src={Profile2}
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <div className="align-items-center">
                      {/* <h6 style={{ paddingLeft: "1rem" }}>JOHN DOE</h6> */}
                      <p
                        style={{
                          paddingLeft: "1rem",
                          lineHeight: "20px",
                          marginBottom: "5px",
                        }}
                      >
                        <b>JHON DOE</b>
                      </p>
                      <p style={{ paddingLeft: "1rem", lineHeight: "20px" }}>
                        Product Marketing
                        <br />
                        Specialist
                      </p>
                    </div>
                  </div>

                  <div className="row content text-center">
                    <p className="profilP">
                      2/3 of the managers say they don’t have proper means to
                      collect business knowledge from their employees.
                    </p>
                  </div>
                </div>

                <div className="container service service__style--8">
                  <div className="row justify-content-center align-items-center">
                    <img
                      src={Profile1}
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <div className="align-items-center">
                      {/* <h6 style={{ paddingLeft: "1rem" }}>JOHN DOE</h6> */}
                      <p
                        style={{
                          paddingLeft: "1rem",
                          lineHeight: "20px",
                          marginBottom: "5px",
                        }}
                      >
                        <b>JHON DOE</b>
                      </p>
                      <p style={{ paddingLeft: "1rem", lineHeight: "20px" }}>
                        Product Marketing
                        <br />
                        Specialist
                      </p>
                    </div>
                  </div>

                  <div className="row content text-center">
                    <p className="profilP">
                      2/3 of the managers say they don’t have proper means to
                      collect business knowledge from their employees.
                    </p>
                  </div>
                </div>

                <div className="container service service__style--8">
                  <div className="row justify-content-center align-items-center">
                    <img
                      src={Profile2}
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <div className="align-items-center">
                      {/* <h6 style={{ paddingLeft: "1rem" }}>JOHN DOE</h6> */}
                      <p
                        style={{
                          paddingLeft: "1rem",
                          lineHeight: "20px",
                          marginBottom: "5px",
                        }}
                      >
                        <b>JHON DOE</b>
                      </p>
                      <p style={{ paddingLeft: "1rem", lineHeight: "20px" }}>
                        Product Marketing
                        <br />
                        Specialist
                      </p>
                    </div>
                  </div>

                  <div className="row content text-center">
                    <p className="profilP">
                      2/3 of the managers say they don’t have proper means to
                      collect business knowledge from their employees.
                    </p>
                  </div>
                </div>

                <div className="container service service__style--8">
                  <div className="row justify-content-center align-items-center">
                    <img
                      src={Profile1}
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <div className="align-items-center">
                      {/* <h6 style={{ paddingLeft: "1rem" }}>JOHN DOE</h6> */}
                      <p
                        style={{
                          paddingLeft: "1rem",
                          lineHeight: "20px",
                          marginBottom: "5px",
                        }}
                      >
                        <b>JHON DOE</b>
                      </p>
                      <p style={{ paddingLeft: "1rem", lineHeight: "20px" }}>
                        Product Marketing
                        <br />
                        Specialist
                      </p>
                    </div>
                  </div>

                  <div className="row content text-center">
                    <p className="profilP">
                      2/3 of the managers say they don’t have proper means to
                      collect business knowledge from their employees.
                    </p>
                  </div>
                </div>

                <div className="container service service__style--8">
                  <div className="row justify-content-center align-items-center">
                    <img
                      src={Profile1}
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <div className="align-items-center">
                      {/* <h6 style={{ paddingLeft: "1rem" }}>JOHN DOE</h6> */}
                      <p
                        style={{
                          paddingLeft: "1rem",
                          lineHeight: "20px",
                          marginBottom: "5px",
                        }}
                      >
                        <b>JHON DOE</b>
                      </p>
                      <p style={{ paddingLeft: "1rem", lineHeight: "20px" }}>
                        Product Marketing
                        <br />
                        Specialist
                      </p>
                    </div>
                  </div>

                  <div className="row content text-center">
                    <p className="profilP">
                      2/3 of the managers say they don’t have proper means to
                      collect business knowledge from their employees.
                    </p>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    );
  }
}

export default ProfileCarausal;
