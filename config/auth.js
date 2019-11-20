const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '815524578815-3nv29mn29tde9f465o0447arm5eu3bdl.apps.googleusercontent.com',
            clientSecret: 'DvzTotxtCsMFo8NcCXE_7r50',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true
        }, 
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};