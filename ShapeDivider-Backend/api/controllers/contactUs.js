const contactUs = require("../models/contactUs");
const nodemailer = require("nodemailer");
// const companyEmailAddress="haseeb129ciit@gmail.com"

module.exports.sentEmail = (req, res, next) => {
  console.log(req.body);
  const {
    email,
    name,
    reason_for_inquiry,
    writingAbout,
    subject,
    message,
  } = req.body;
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    var mailOptions = {
      from: process.env.email,
      to: `${email}`,
      subject: `${subject}`,
      html: emialTemplate(
        email,
        name,
        reason_for_inquiry,
        writingAbout,
        subject,
        message
      ),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("This is emial error ", error);
        res.status(400).json({
          message: "Provided information is invalid",
        });
      } else {
        console.log("Email sent aaaaaaaaaaaaaa: " + info.response);
        res.status(201).json({
          message: "Message sent please check your email ",
        });
      }
    });
  } catch {
    console.log("Error nikal aaya");
  }
};

const emialTemplate = (
  email,
  name,
  reason_for_inquiry,
  writingAbout,
  subject,
  message
) => {
  return `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>

    <link
      href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700"
      rel="stylesheet"
    />

    <style>
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }
      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      *[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }
      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }
    </style>
    <style>
      .bg_black {
        background: #000000;
      }
      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }

      .bg_darkGray {
        background-color: #a9a9a9;
      }
      .bg_custom {
        background-color: lightgray;
      }
      .email-section {
        padding: 2.5em;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Poppins", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      body {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      table {
      }
      /*LOGO*/

      .logo h1 {
        margin: 0;
      }
      .logo h1 a {
        color: black;
        font-size: 24px;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
      }

      /*HERO*/
      .hero {
        position: relative;
        z-index: 0;
      }

      .hero .text {
        color: rgba(0, 0, 0, 0.3);
      }
      .hero .text h2 {
        color: #000;
        font-size: 34px;
        margin-bottom: 0;
        font-weight: 200;
        line-height: 1.4;
      }
      .hero .text h3 {
        font-size: 24px;
        font-weight: 300;
      }
      .hero .text h2 span {
        font-weight: 600;
        color: #000;
      }

      .textformat {
        /* font-weight: 600; */
        color: #000;
      }

      .textformatBold {
        font-weight: 600;
        color: #000;
      }

      @media screen and (max-width: 500px) {
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
      word-break: break-all;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <!-- BEGIN BODY -->
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_darkGray"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <h1>Contact Us</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              valign="middle"
              b
              class="hero bg_custom"
              style="padding: 2em 0 4em 0"
            >
              <table
                class="textformat"
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td style="padding: 0 2.5em; padding-bottom: 3em">
                    <span class="textformatBold">Sender Email: </span>
                  </td>
                  <td colspan="2" style="padding: 0 2.5em; padding-bottom: 3em">
                    ${email}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 2.5em; padding-bottom: 3em">
                    <span class="textformatBold"> Name :</span> ${name}
                  </td>
                  <td colspan="2" style="padding: 0 2.5em; padding-bottom: 3em">
                    <span class="textformatBold">Reason For Inquiry: </span>
                    ${reason_for_inquiry}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 2.5em; padding-bottom: 3em">
                    <span class="textformatBold"> Subject :</span> ${subject}
                  </td>
                  <td colspan="2" style="padding: 0 2.5em; padding-bottom: 3em">
                    <span class="textformatBold"> Writing About:</span> ${writingAbout}
                  </td>
                </tr>
                <tr>
                  <td
                    class="textformatBold"
                    style="padding: 0 2.5em; padding-bottom: 3em"
                  >
                    Message :
                  </td>
                  <td colspan="2" style="padding: 0 2.5em; padding-bottom: 3em">
                  ${message}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end tr -->
          <!-- 1 Column Text + Button : END -->
        </table>
      </div>
    </center>
  </body>
</html>

    `;
};
