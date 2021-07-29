const Userauth = require("../models/user");
const bcrypt = require('bcrypt');
const multer = require("multer");
const jwt = require('jsonwebtoken');
const config = require('../config');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const _protected = require("../middleware/protected");
const Posts = require("../models/post");
const Invoice = require("./Invoice");
const stripe = require('stripe')('sk_test_51Hl55bIegwU8Nf3FJPWiFlqTMNN3hQ3xJQQr3saOIUNyaiEunPRz4xMFCdPxspWQ48NvZK0LxNbiNxTr10wD3EkI00oZTpc3jy');
global.myvar;
global.email;
const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))
module.exports = (app) => {
  app.post('/signup', (req, res) => {
    Userauth.find({ email: req.body.email })
      .exec().then((user) => {
        if (user.length >= 1) {
          return res.status(422).send({
            message: "email already exists"
          })
        } else {
          bcrypt.hash(req.body.password, 10, ((err, hash) => {
            if (err) {
              return res.status(400).send({
                message: err
              })
            } else {
              const User = new Userauth({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                age: req.body.age,
                userphoto: req.body.userphoto
              })
              User.save().then((data) => {
                const token = jwt.sign(
                  { email: data.email, id: data._id },
                  config.jwt_token,
                  { expiresIn: "48d" }
                )
                transporter.sendMail({
                  to: data.email,
                  from: "raghav@orak.in",
                  subject: "SIGNUP SUCCESS",
                  html: `
                                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
      </style>
      <![endif]-->
      <style type="text/css">
      body, p, div {
      font-family: verdana,geneva,sans-serif;
      font-size: 16px;
      }
      body {
      color: #516775;
      }
      body a {
      color: #993300;
      text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      }
      img.max-width {
      max-width: 100% !important;
      }
      .column.of-2 {
      width: 50%;
      }
      .column.of-3 {
      width: 33.333%;
      }
      .column.of-4 {
      width: 25%;
      }
      @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
      text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
      text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
      font-size: 80% !important;
      padding: 5px 0;
      }
      table.wrapper-mobile {
      width: 100% !important;
      table-layout: fixed;
      }
      img.max-width {
      height: auto !important;
      max-width: 100% !important;
      }
      a.bulletproof-button {
      display: block !important;
      width: auto !important;
      font-size: 80%;
      padding-left: 0 !important;
      padding-right: 0 !important;
      }
      .columns {
      width: 100% !important;
      }
      .column {
      display: block !important;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      }
      }
      </style>
      <!--user entered Head Start-->
      <!--End Head user entered-->
      </head>
      <body>
      <center class="wrapper" data-link-color="#993300" data-body-style="font-size:16px; font-family:verdana,geneva,sans-serif; color:#516775; background-color:#F9F5F2;">
      <div class="webkit">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#F9F5F2">
      <tbody><tr>
        <td valign="top" bgcolor="#F9F5F2" width="100%">
          <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
            <tbody><tr>
              <td width="100%">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tbody><tr>
                    <td>
                      <!--[if mso]>
      <center>
      <table><tr><td width="600">
      <![endif]-->
                              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                <tbody><tr>
                                  <td role="modules-container" style="padding:0px 0px 0px 0px; color:#516775; text-align:left;" bgcolor="#F9F5F2" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tbody><tr>
      <td role="module-content">
      <p>Signup Success</p>
      </td>
      </tr>
      </tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4UqFsRLozLcypAAv4CeoFS">
      <tbody><tr>
      <td style="font-size:6px; line-height:10px; padding:30px 0px 0px 0px;" valign="top" align="center">
      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;" src="https://guidemic.in/wp-content/uploads/2020/10/cropped-guidemic-transperant-3.png" alt="Ingrid & Anders" width="300" data-responsive="true" data-proportionally-constrained="false">
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="iqe7juSSgLbdm3gXWExpsY">
      <tbody><tr>
      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
      </td>
      </tr>
      </tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="eUYR8ZuwyTirQCAuyEc98X">
      <tbody><tr>
      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.motivationalliance.org%2Fwp-content%2Fuploads%2F2016%2F01%2FSuccess-graphic.jpg&f=1&nofb=1" alt="" width="600" data-responsive="true" data-proportionally-constrained="false">
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8VquPM2ZMj7RJRhAUE6wmF">
      <tbody><tr>
      <td style="background-color:#ffffff; padding:50px 0px 10px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff"><div><div style="font-family: inherit; text-align: center"><span style="color: #516775; font-size: 28px; font-family: georgia,serif"><strong>Welcome to Guidemic</strong></span></div><div></div></div></td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="keQHYG1b1ztewxwhDtuCpS">
      <tbody><tr>
      <td style="background-color:#ffffff; padding:10px 40px 20px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff"><div><div style="font-family: inherit; text-align: center"><span style="font-family: verdana,geneva,sans-serif">Login  to your Account and explore products </span></div>
      <ul>
      <li style="text-align: inherit">Categorized products</li>
      <li style="text-align: inherit"><span style="font-family: verdana,geneva,sans-serif">Reporting Technology</span></li>
      <li style="text-align: inherit"><span style="font-family: verdana,geneva,sans-serif">Unlimited technology</span></li>
      <li style="text-align: inherit"><span style="font-family: verdana,geneva,sans-serif"></span></li>
      <li style="text-align: inherit"><span style="font-family: verdana,geneva,sans-serif">Refer your friends</span></li>
      </ul><div></div></div></td>
      </tr>
      </tbody></table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%" data-muid="hthYAt191yTdg6FPWYKodF"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 40px 0px; background-color:#ffffff;"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#993300" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a style="background-color:#993300; border:1px solid #993300; border-color:#993300; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-family:verdana,geneva,sans-serif; font-size:16px; font-weight:normal; letter-spacing:1px; line-height:30px; padding:12px 20px 12px 20px; text-align:center; text-decoration:none; border-style:solid;" href="" target="_blank">Join VIP</a></td></tr></tbody></table></td></tr></tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="h5Act64miE4yjzNnz1YMGs">
      <tbody><tr>
      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="jw3c3eYnz3qZ2aqby3rNPX">
      <tbody><tr>
      <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
      <tbody><tr>
        <td style="padding:0px 0px 10px 0px;" bgcolor="#ffffff"></td>
      </tr>
      </tbody></table>
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="noXVUxSTfKbdSVM2Xrua2t">
      <tbody><tr>
      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="vh6t2nbGK2ApVEk1CB3r5A">
      <tbody><tr>
      <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor=""><div><div style="font-family: inherit; text-align: center"><span style="color: #993300; font-size: 28px; font-family: georgia,serif"><strong>Hungry for style inspiration?</strong></span></div><div></div></div></td>
      </tr>
      </tbody></table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%" data-muid="fpvvts1C82XMqQzTjscA1Z"><tbody><tr><td align="center" class="outer-td" style="padding:20px 0px 0px 0px;" bgcolor=""><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#993300" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a style="background-color:#993300; border:1px solid #993300; border-color:#993300; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-family:verdana,geneva,sans-serif; font-size:16px; font-weight:normal; letter-spacing:1px; line-height:30px; padding:12px 20px 12px 20px; text-align:center; text-decoration:none; border-style:solid;" href="" target="_blank">Start Shopping!</a></td></tr></tbody></table></td></tr></tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="51LxsNyTDYV3Xp5k5vET2o">
      <tbody><tr>
      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="noLZCGp2Fg6viPoP15ufF1">
      <tbody><tr>
      <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
      <tbody><tr>
        <td style="padding:0px 0px 10px 0px;" bgcolor="#ffffff"></td>
      </tr>
      </tbody></table>
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="aQTmVGoZvs6GLJLWsiastG">
      <tbody><tr>
      <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
      </td>
      </tr>
      </tbody></table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="sLpvVMcymGiSrXMXabUBds">
      <tbody>
      <tr>
      <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px; background-color:#f9f5f2;" align="center">
      <table align="center">
        <tbody>
          <tr><td style="padding: 0px 5px;">
      <a role="social-icon-link" href="https://www.facebook.com/" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
      <img role="social-icon" alt="Facebook" title="Facebook" src="https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
      </td><td style="padding: 0px 5px;">
      <a role="social-icon-link" href="https://twitter.com/" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
      <img role="social-icon" alt="Twitter" title="Twitter" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
      </td><td style="padding: 0px 5px;">
      <a role="social-icon-link" href="https://www.instagram.com/" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
      <img role="social-icon" alt="Instagram" title="Instagram" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
      </td><td style="padding: 0px 5px;">
      <a role="social-icon-link" href="https://www.pinterest.com/sendgrid/" target="_blank" alt="Pinterest" title="Pinterest" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
      <img role="social-icon" alt="Pinterest" title="Pinterest" src="https://marketing-image-production.s3.amazonaws.com/social/white/pinterest.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
      </td></tr>
        </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table><div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:center;" data-muid="mQ1u1Awkou7szvSGChCGcV">
      <div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;">{{Sender_Name}}</p><p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span></p></div>
      <p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="eAq5DwvRYWV4D7T3oBCXhH">
      <tbody><tr>
      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
      </td>
      </tr>
      </tbody></table></td>
                                </tr>
                              </tbody></table>
                              <!--[if mso]>
                            </td>
                          </tr>
                        </table>
                      </center>
                      <![endif]-->
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr>
      </tbody></table>
      </div>
      </center>
      </body></html> 
                                    `
                })
                return res.status(200).send({
                  message: "signed up successfully",
                  user: data,
                  token: token
                })
              }).catch((error) => {
                return res.status(420).send({
                  message: error
                });
              });
            }
          }));
        }
      })
  });
  app.delete('/:userId', _protected, (req, res) => {
    Userauth.remove({ _id: req.params.userId }).exec().then((data) => {
      res.status(200).send({
        message: "user deleted successfully"
      })
    }).catch((err) => {
      return res.status(500).send({
        message: err || "something went wrong while deleting user"
      })
    })
  })
  app.post('/login', (req, res, next) => {
    Userauth.find({ email: req.body.email }).exec().then(user => {
      if (user.length < 1) {
        return res.status(404).send({
          message: "Email Does not exists"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(500).send({
            message: "Authentication Failed"
          })
        }
        if (result) {
          const token = jwt.sign(
            { email: user[0].email, id: user[0]._id },
            config.jwt_token,
            { expiresIn: "48d" }
          )
          // console.log('auth success', token)
          return res.status(200).send({
            message: "Auth successfull",
            token: token,
            user: user[0]
          })
        }
        return res.status(500).send({
          message: "Authentication Failed"
        })

      })
    }).catch()
  })

  app.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        return res.status(500).send({
          message: "error sending reset password link"
        })
      }
      const token = buffer.toString('hex')
      Userauth.findOne({ email: req.body.email }).then((data) => {
        if (!data) {
          return res.status(422).send({
            message: "user does not exist"
          })
        } else {
          data.resetToken = token;
          data.expireToken = Date.now() + 3600000
          data.save().then((result) => {
            transporter.sendMail({
              to: data.email,
              from: "raghav@orak.in",
              subject: "password reset request",
              html: `
              <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!-- NAME: 1 COLUMN -->
  <!--[if gte mso 15]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reset Your Vtyuva Password</title>
  <!--[if !mso]>
      <!-- -->
  <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:768px){
          .templateContainer{
              width:600px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          body,table,td,p,a,li,blockquote{
              -webkit-text-size-adjust:none !important;
          }
  
  }   @media only screen and (max-width: 480px){
          body{
              width:100% !important;
              min-width:100% !important;
          }
  
  }   @media only screen and (max-width: 480px){
          #bodyCell{
              padding-top:10px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImage{
              width:100% !important;
          }
  
  }   @media only screen and (max-width: 480px){
         
   .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
              max-width:100% !important;
              width:100% !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnBoxedTextContentContainer{
              min-width:100% !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImageGroupContent{
              padding:9px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnCaptionLeftContentOuter
   .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
              padding-top:9px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImageCardTopImageContent,.mcnCaptionBlockInner
   .mcnCaptionTopContent:last-child .mcnTextContent{
              padding-top:18px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImageCardBottomImageContent{
              padding-bottom:9px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImageGroupBlockInner{
              padding-top:0 !important;
              padding-bottom:0 !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImageGroupBlockOuter{
              padding-top:9px !important;
              padding-bottom:9px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnTextContent,.mcnBoxedTextContentColumn{
              padding-right:18px !important;
              padding-left:18px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
              padding-right:18px !important;
              padding-bottom:0 !important;
              padding-left:18px !important;
          }
  
  }   @media only screen and (max-width: 480px){
          .mcpreview-image-uploader{
              display:none !important;
              width:100% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Heading 1
      @tip Make the first-level headings larger in size for better readability
   on small screens.
      */
          h1{
              /*@editable*/font-size:20px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Heading 2
      @tip Make the second-level headings larger in size for better
   readability on small screens.
      */
          h2{
              /*@editable*/font-size:20px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Heading 3
      @tip Make the third-level headings larger in size for better readability
   on small screens.
      */
          h3{
              /*@editable*/font-size:18px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Heading 4
      @tip Make the fourth-level headings larger in size for better
   readability on small screens.
      */
          h4{
              /*@editable*/font-size:16px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Boxed Text
      @tip Make the boxed text larger in size for better readability on small
   screens. We recommend a font size of at least 16px.
      */
          .mcnBoxedTextContentContainer
   .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
              /*@editable*/font-size:16px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Preheader Visibility
      @tip Set the visibility of the email's preheader on small screens. You
   can hide it to save space.
      */
          #templatePreheader{
              /*@editable*/display:block !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Preheader Text
      @tip Make the preheader text larger in size for better readability on
   small screens.
      */
          #templatePreheader .mcnTextContent,#templatePreheader
   .mcnTextContent p{
              /*@editable*/font-size:12px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Header Text
      @tip Make the header text larger in size for better readability on small
   screens.
      */
          #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
              /*@editable*/font-size:16px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Body Text
      @tip Make the body text larger in size for better readability on small
   screens. We recommend a font size of at least 16px.
      */
          #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
              /*@editable*/font-size:16px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }   @media only screen and (max-width: 480px){
      /*
      @tab Mobile Styles
      @section Footer Text
      @tip Make the footer content text larger in size for better readability
   on small screens.
      */
          #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
              /*@editable*/font-size:12px !important;
              /*@editable*/line-height:150% !important;
          }
  
  }
  </style>
</head>

<body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 background-color: #fed149; height: 100%; margin: 0; padding: 0; width: 100%">
  <center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; background-color: #fed149; height: 100%; margin: 0; padding: 0; width:
 100%" width="100%">
      <tr>
        <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
 height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
          <!-- BEGIN TEMPLATE // -->
          <!--[if gte mso 9]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                <tr>
                  <td align="center" valign="top" width="600" style="width:600px;">
                  <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
 600px; border: 0" width="100%">
            <tr>
              <td id="templatePreheader" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;
 border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnTextContent" style='mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
 color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px;
 line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
 padding-bottom: 9px; padding-left: 18px;' valign="top">
                                <a href="https://www.lingoapp.com" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
 font-weight: normal; text-decoration: none" target="_blank" title="Vtyuva is the best way to communicate with your fellow friends">
                                  <img align="none" alt="Vtyuva is the best way to communicate with your fellow friends" height="32" src="https://static.lingoapp.com/assets/images/email/lingo-logo.png" style="-ms-interpolation-mode: bicubic; border: 0; outline: none;
 text-decoration: none; height: auto; width: 107px; height: 32px; margin: 0px;" width="107" />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td id="templateHeader" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
 border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
                  <tbody class="mcnImageBlockOuter">
                    <tr>
                      <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnImageContent" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
 padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                <a class="" href="https://www.lingoapp.com" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
 #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                  <a class="" href="https://www.lingoapp.com/" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
 #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                    <img align="center" alt="Forgot your password?" class="mcnImage" src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
 text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
 0; display: inline !important; vertical-align: bottom;" width="600"></img>
                                  </a>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td id="templateBody" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
 border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnTextContent" style='mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
 color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
 line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
 padding-bottom: 9px; padding-left: 18px;' valign="top">

                                <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
 sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
 125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
 padding: 0'><span style="text-transform:uppercase">Forgot</span></h1>


                                <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
 sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
 125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
 padding: 0'><span style="text-transform:uppercase">your password?</span></h2>

                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnTextContent" style='mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
 color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
 line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
 padding-bottom: 9px; padding-left: 18px;' valign="top">Not to worry, we got you! Let’s get you a new password.
                                <br></br>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 min-width:100%;" width="100%">
                  <tbody class="mcnButtonBlockOuter">
                    <tr>
                      <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody class="mcnButtonBlockOuter">
                            <tr>
                              <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 border-collapse: separate !important;border-radius: 48px;background-color:
 #F57153;">
                                  <tbody>
                                    <tr>
                                      <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
 exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
 font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
 padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
                                     <h5>Token: ${token}</h5>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnImageBlockOuter">
                    <tr>
                      <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnImageContent" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
 padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td id="templateFooter" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;
 border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="center" bgcolor="#F7F7FF" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
 100%; background:#F7F7FF; margin:auto; text-align:left; max-width:600px;
 font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                          <tr>
                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%">

                              <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
 font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
 letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
 0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>What
 is Vtyuva?</h3>

                              <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
 font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
 text-align: left; text-align: left; font-size: 14px; '>Vtyuva is the leading social media application for vtu .
                              </p>
                              <div style="padding-bottom: 18px;">
                                <a href="https://www.vtyuva.com" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none;
 font-size: 14px; color:#F57153; text-decoration:none;" target="_blank" title="Learn more about Vtyuva">Learn More ❯</a>
                              </div>
                            </td>
                          </tr>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
 padding-bottom: 24px; padding-left: 18px; color: #7F6925; font-family: 'Asap',
 Helvetica, sans-serif; font-size: 12px;" valign="top">
                                <div style="text-align: center;">Made with
                                  <a href="https://vtyuva.com/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:
 none" target="_blank">
                                    <img align="none" alt="Heart icon" height="10" src="https://static.lingoapp.com/assets/images/email/made-with-heart.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
 text-decoration: none; width: 10px; height: 10px; margin: 0px;" width="10" />
                                  </a>by
                                  <a href="https://thenounproject.com/" style="mso-line-height-rule: exactly;
 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #f57153;
 font-weight: normal; text-decoration: none; color:#7F6925;" target="_blank" title="Vtyuva">vtyuva  </a>Bangalore, Karnataka</div>
                              </td>
                            </tr>
                            <tbody></tbody>
                          </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="12" style="border-collapse:
 collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust:
 100%; -webkit-text-size-adjust: 100%; ">
                          <tbody>
                            <tr>
                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%">
                                <a href="https://twitter.com/@lingo_app" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                  <img alt="twitter" height="32" src="https://static.lingoapp.com/assets/images/email/twitter-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration:
 none" width="32" />
                                </a>
                              </td>
                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%">
                                <a href="https://www.instagram.com/lingo_app/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:
 none" target="_blank">
                                  <img alt="Instagram" height="32" src="https://static.lingoapp.com/assets/images/email/instagram-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
 text-decoration: none" width="32" />
                                </a>
                              </td>
                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%">
                                <a href="https://medium.com/@lingo_app" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                  <img alt="medium" height="32" src="https://static.lingoapp.com/assets/images/email/medium-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none" width="32" />
                                </a>
                              </td>
                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%">
                                <a href="https://www.facebook.com/Lingoapp/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
 -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                  <img alt="facebook" height="32" src="https://static.lingoapp.com/assets/images/email/facebook-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
 text-decoration: none" width="32" />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
          <!--[if gte mso 9]>
                  </td>
                </tr>
              </table>
            <![endif]-->
          <!-- // END TEMPLATE -->
        </td>
      </tr>
    </table>
  </center>
</body>

</html>
                 `
            }).then((es) => {
              // console.log(token)
              res.send({
                message: "check your email to get a token",
              })
            })
          })
        }
      })
    })
  })

  app.post('/new-password', (req, res) => {
    // console.log(req.body)
    const senToken = req.body.token
    Userauth.findOne({ resetToken: senToken, expireToken: { $gt: Date.now() } }).then((ress) => {
      if (!ress) {
        return res.status(422).send({
          message: "session expired"
        })
      } else {
        const newpassword = req.body.password
        bcrypt.hash(newpassword, 12, ((err, hash) => {
          if (err) {
            return res.status(500).send({
              message: "error updating password"
            })
          } else {
            ress.password = hash;
            ress.resetToken = undefined;
            ress.expireToken = undefined;
            ress.save().then((saved) => {
              res.status(200).send({
                message: "password updated successfully"
              })
            })
          }
        }))
      }
    })
  })


  app.get('/user/:userId', _protected, (req, res) => {
    Userauth.findOne({ _id: req.params.userId }).select("-password")
      .then((user) => {
        Posts.find({ postedBy: req.params.userId }).populate("postedBy", "_id username userphoto").populate("comments", "likes").sort("-createdAt").exec((err, userposts) => {
          if (err) {
            return res.status(500).send({
              message: "error retreiving posts by this user" || err
            })
          } else {
            res.status(200).send({ user, userposts })
          }
        })
      }).catch((errb) => {
        return res.status(404).send({
          message: "user not found" || errb
        })
      })
  })

  app.put('/follow', _protected, (req, res) => {
    Userauth.findByIdAndUpdate(req.body.followid, {
      $push: { followers: req.user._id }
    }, { new: true }, (errorr, result) => {
      if (errorr) {
        return res.status(422).send({
          message: "something went wrong" || errorr
        })
      }
      Userauth.findByIdAndUpdate(req.user._id, {
        $push: { following: req.body.followid }
      }, { new: true }).then(data => {
        res.send(data);
      }).catch(errorrx => {
        return res.status(422).send({
          message: "something went wrong" || errorrx
        })
      })
    })
  })

  app.put('/unfollow', _protected, (req, res) => {
    Userauth.findByIdAndUpdate(req.body.followid, {
      $pull: { followers: req.user._id }
    }, { new: true }, (errorr, result) => {
      if (errorr) {
        return res.status(422).send({
          message: "something went wrong" || errorr
        })
      }
      Userauth.findByIdAndUpdate(req.user._id, {
        $pull: { following: req.body.followid }
      }, { new: true }).then(data => {
        res.send(data);
      }).catch(errorrx => {
        return res.status(422).send({
          message: "something went wrong" || errorrx
        })
      })
    })
  })

  app.put('/user/update', _protected, (req, res) => {
    if (!req.body) {
      res.status(500).send({
        message: "fields cannot be empty fill up your problem to update your ticket"
      })
    } else {
      Userauth.findByIdAndUpdate(req.user._id, {
        username: req.body.username,
        tagline: req.body.tagline,
        userphoto: req.body.userphoto
      }, { new: true })
        .then(data => {
          if (!data) {
            return res.status(404).send({
              message: "user not found with id " + req.user._id
            });
          }
          res.send(data);
          // console.log(data)
        }).catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "user not found with id " + req.user._id
            });
          }
          return res.status(500).send({
            message: "Something wrong updating user with id " + req.user._id
          });
        });
    }
  })
  app.put('/updateuser/:userId', (req, res) => {
    Userauth.findByIdAndUpdate(req.params.userId, {
      phoneNumber: req.body.number,
      userphoto: req.body.userphoto,
      verified: true
    }, { new: true })
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: "user not found with id " + req.params.userId
          });
        }
        res.send(data);
        // console.log(data)
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "user not found with id " + req.params.userId
          });
        }
        return res.status(500).send({
          message: "Something wrong updating user with id " + req.params.userId
        });
      });
  })
  app.put('/updateonlinestatus', _protected, (req, res) => {
    Userauth.findByIdAndUpdate(req.user._id, {
      Online: req.body.isonline
    }, { new: true }).then(data => {
      if (!data) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      res.status(200).send(data);
      // console.log(data)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating user with id " + req.params.userId
      });
    })
  })
  app.get('/allusers', _protected, (req, res) => {
    Userauth.find().then((data) => {
      res.send(data);
      // console.log(data);
    }).catch((err) => {
      return res.status(500).send({
        message: err.message || "Something wrong while recieving the postss."
      })
    })
  })

  app.get('/followinglist', _protected, (req, res) => {
    Userauth.find({ _id: req.user._id }).exec().then(data => {
      data.map((list) => {
        if (list.following != [null]) {
          data.map((result => {
            Userauth.find({ _id: result.following }).exec().then((following) => {
              // console.log(data)
              res.send(following);
            }).catch((err) => {
              return res.status(500).send({
                errM: 'something went wrong while looking for the following list'
              })
            })
          })
          )
        }
        else {
          return res.status(500).send({
            message: "you are not following anyone"
          })
        }
      })
    }).catch((err => {
      return res.status(500).send({
        errM: 'something went wrong while looking for the following list'
      })
    }))
  })

  app.get('/followerslist', _protected, (req, res) => {
    Userauth.find({ _id: req.user._id }).exec().then(data => {
      data.map((list) => {
        if (list.followers != [null]) {
          data.map((result => {
            Userauth.find({ _id: result.followers }).exec().then((followers) => {
              // console.log(followers);
              res.send(followers);
            }).catch((err) => {
              return res.status(500).send({
                errM: 'something went wrong while looking for the followers list'
              })
            })
          })
          )
        }
        else {
          return res.status(500).send({
            message: "you dont have  any followers "
          })
        }
      })
    }).catch((err => {
      return res.status(500).send({
        errM: 'something went wrong while looking for the followers list'
      })
    }))
  })

  app.put('/notifytoken', _protected, (req, res) => {
    Userauth.findByIdAndUpdate(req.user._id, {
      notifytoken: req.body.notifytoken
    }, { new: true }).then(data => {
      if (!data) {
        return res.status(404).send({
          message: "user not found with id " + req.user._id
        });
      }
      res.send(data);
      // console.log(data);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.user._id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating usertoken with id " + req.user._id
      });
    })
  })
  app.get('/users/searchbyusername/:searchParam', _protected, (req, res) => {
    Userauth.find({ username: req.params.searchParam }).exec().then(data => {
      res.send(data);
      // console.log(data)
    }).catch(erre => {
      return res.status(404).send({
        err: erre
      })
    })
  })

  app.get('/users/searchbyemail/:searchParam', _protected, (req, res) => {
    Userauth.find({ email: req.params.searchParam.toLowerCase() }).exec().then(data => {
      res.send(data);
      // console.log(data)
    }).catch(erre => {
      return res.status(404).send({
        err: erre
      })
    })
  })

  app.get('/users/searchbyusn/:searchParam', _protected, (req, res) => {
    Userauth.find({ usn: req.params.searchParam.toLowerCase() }).exec().then(data => {
      res.send(data);
      // console.log(data)
    }).catch(erre => {
      return res.status(404).send({
        err: erre
      })
    })
  })
  app.post('/payment-sheet', _protected, async (req, res) => {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' }
    );
    const paymentInten = await stripe.paymentIntents.create({
      amount: 1052,
      currency: 'inr',
      customer: customer.id,
      receipt_email: req.body.metadata.email,
      // metadata: req.body.metadata.user,
      description: req.body.metadata.PackageName
    });
    const email = req.body.metadata.email;
    global.email = email;
    res.json({
      paymentIntent: paymentInten.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      extrainfo: paymentInten,
      receipt_email: email
    });

  });

  app.post('/webhook', (request, response) => {
    const event = request.body;
    // Handle the event
    console.log(request.body)
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        global.myvar = paymentIntent;
        console.log(global.myvar);
        response.json({ log: paymentIntent });
        break;
    }
    // console.log(payment_suceed)
    // response.send(payment_succeed);
  });

  app.post('/create-invoice', _protected, (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Please fill every fields"
      });
    }
    const invoice = new Invoice({
      paymentIntent: global.myvar,
      issuedto: req.user._id
    })
    invoice.save()
      .then(data => {
        res.send(data);
        transporter.sendMail({
          to: global.email,
          from: "raghav@orak.in",
          subject: "Invoice Bill",
          html: `
              <!DOCTYPE html>
<html> 
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="https://www.sparksuite.com/images/logo.png" style="width: 100%; max-width: 300px" />
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2015<br />
									Due: February 1, 2015
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>Website design</td>

					<td>$300.00</td>
				</tr>

				<tr class="item">
					<td>Hosting (3 months)</td>

					<td>$75.00</td>
				</tr>

				<tr class="item last">
					<td>Domain name (1 year)</td>

					<td>$10.00</td>
				</tr>

				<tr class="total">
					<td></td>

					<td>Total: $385.00</td>
				</tr>
			</table>
		</div>
	</body>
</html>
              `
        }).then(r => {
          res.status(200).send({
            message: "check your email to get a token",
          })
        })
      }).catch(err => {
        console.log(err);
        res.status(500).send({
          message: err.message || "Something wrong while creating the invoice"
        });
      });
  })

  app.get('/retrieve-invoice', _protected, (req, res) => {
    Invoice.find({ issuedto: req.user._id }).exec().then((data) => {
      if (data.length < 1) {
        return res.status(404).send({
          message: " Nothing exists"
        })
      } else {
        res.status(200).send({ data })
      }
    }).catch(e => {
      res.status(500).send({
        message: "sorry, unhandled error occured"
      })
    })
  })
};

