const catchAsync = require('../utils/catchAsync');
const Bankverbindungen = require('../models/Bankverbindungen');

const getBankverbindungen = catchAsync(async (req, res, next) => {
  try {
    const BankverbindungenDetails = await Bankverbindungen.findAll();
    if (BankverbindungenDetails.length > 0) {
      res.send({
        success: true,
        code: 200,
        status: "Data Retrieved successfully",
        timestamp: new Date(),
        data: BankverbindungenDetails
      });
    } else {
      const errcode = new Error("No Records Found");
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

const AddBankverbindungen = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.Bic && values.Zahlungstyp) {
      //const BankverbindungenDetails = await Bankverbindungen.findAll();
      //if (BankverbindungenDetails.length > 0) {
      const BankverbindungenDetails = await Bankverbindungen.create(values);
      if (BankverbindungenDetails) {
        res.send({
          success: true,
          code: 200,
          status: "Data Successfully",
          timestamp: new Date(),
          data: BankverbindungenDetails
        });

      } else {
        const errcode = new Error("No Records Found");
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
  getBankverbindungen,
  AddBankverbindungen,
}