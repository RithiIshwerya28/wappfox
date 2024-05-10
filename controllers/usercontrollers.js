const catchAsync = require('../utils/catchAsync');
const Auth = require('../services/token');

//https://paizatto.s3.ap-south-1.amazonaws.com/grafik8f29dc91-09d7-4a76-baab-6e493a7f48b8.png


const LoginDetails = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.email != '' && values.email != null && values.email != undefined && values.password != '' && values.password != null && values.password != undefined) {
      //const BankverbindungenDetails = await Bankverbindungen.findAll();
      //if (BankverbindungenDetails.length > 0) {
      const id = "65f575a8ec4f281b64e5e0ca";
      const token = Auth.getJWTToken(id)
      delete values.password
      res.send({
        success: true,
        code: 200,
        status: "Login Successfully",
        timestamp: new Date(),
        data: values,
        Token: token
      });
      // } else {
      //   const errcode = new Error("No Records Found");
      //   errcode.statusCode = 201;
      //   return next(errcode);
      // }
    } else {
      const errcode = new Error("All Field are Monitory");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});


const RegisterDetails = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.email && values.name && values.associateCompany && values.email.trim() !== '' && values.name.trim() !== '' && values.associateCompany.trim() !== '') {
      const id = "65f575a8ec4f281b64e5e0ca";
      const token = Auth.getJWTToken(id)
      res.send({
        success: true,
        code: 200,
        status: "Register Successfully",
        timestamp: new Date(),
        data: values,
        Token: token
      });
    } else {
      const errcode = new Error("All Field are Monitory");
      errcode.statusCode = 201;
      return next(errcode);
    }

  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});


const Password = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    const users = req.user;
    if (users.id != '' && users.id != null && users.id != undefined) {
      if (values.password && values.cpassword && values.password.trim() !== '' && values.cpassword.trim() !== '') {
        if (values.password === values.cpassword) {
          res.send({
            success: true,
            code: 200,
            status: "Password Successfully",
            timestamp: new Date(),
          });
        } else {
          const errcode = new Error("Password and Confirm Password Not match");
          errcode.statusCode = 201;
          return next(errcode);
        }
      } else {
        const errcode = new Error("All Field are Monitory");
        errcode.statusCode = 201;
        return next(errcode);
      }
    } else {
      const errcode = new Error("Id required to Update Password.");
      errcode.statusCode = 201;
      return next(errcode);
    }

  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});


const EmailVerfication = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.vcode && values.vcode.trim() !== '' && values.email && values.email.trim() !== '') {
      res.send({
        success: true,
        code: 200,
        status: "Verified Successfully",
        timestamp: new Date(),
      });
    } else {
      const errcode = new Error("All Field are Monitory");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});

const VerficationCode = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.vcode && values.vcode !== '' && values.vcode !== null && values.vcode !== undefined) {
      let vcode = (values.vcode).toString()
      if (vcode.length === 8) {
        if (values.vcode === "12345678") {
          res.send({
            success: true,
            code: 200,
            status: "Verified Successfully",
            timestamp: new Date(),
          });
        } else {
          const errcode = new Error("Please enter a valid code");
          errcode.statusCode = 201;
          return next(errcode);
        }
      } else {
        const errcode = new Error("Please enter a 8 digit");
        errcode.statusCode = 201;
        return next(errcode);
      }
    } else {
      const errcode = new Error("All Field are Monitory");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});


module.exports = {
  LoginDetails,
  RegisterDetails,
  EmailVerfication,
  VerficationCode,
  Password,
}