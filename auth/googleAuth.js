const GoogleStrategy = require('passport-google-oauth20');
const User = require('../database/Models/User');
const config = require('config');
const id = config.get('GOOGLE_CLIENT_ID');
const secret = config.get('GOOGLE_CLIENT_SECRET');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: id,
                clientSecret: secret,
                callbackURL: '/auth/google/callback',
            },
            (accessToken, refreshToken, profile, done) => {
                User.findOne({ email: profile.emails[0].value }).then(
                    (data) => {
                        if (data) {
                            return done(null, data);
                        } else {
                            // create a user
                            User({
                                email: profile.emails[0].value,
                                name: profile.displayName,
                                googleId: profile.id,
                                password: 'password',
                                provider: 'google',
                                isVerified: true,
                            }).save(function (err, data) {
                                if (err) console.log(err);
                                return done(null, data);
                            });
                        }
                    }
                );
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
