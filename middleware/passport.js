// middleware/passport.js
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Bankverbindungen = require('../models/Bankverbindungen')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    //const user = await Bankverbindungen.findOne({ BankverbindungId: payload.id });
    const user = {
      "name": "name",
      "associateCompany": "givenname",
      "email": "email",
      "id": "65f575a8ec4f281b64e5e0ca"
    }
    if (user) {
      return done(null, user);
    } else {
      console.log("TCL: ", "error")
      return done(null, false, { message: 'Unauthorized' });
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
