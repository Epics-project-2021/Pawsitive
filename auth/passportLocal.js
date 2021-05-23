const User = require('../database/Models/User');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email });
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect Username',
                        });
                    }
                    let isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, {
                            message: 'Incorrect Password',
                        });
                    }
                    return done(null, user);
                } catch (err) {
                    console.error(err.message);
                }
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
