const GoogleStrategy = require('passport-google-oauth20')
const User = require('../database/Models/User')
const config = require("config");
const id = config.get("GOOGLE_CLIENT_ID")
const secret = config.get("GOOGLE_CLIENT_SECRET")


module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: id,
        clientSecret: secret,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile, done)=>{
        console.log(profile)

        const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            isVerified: true,
            provider: 'Google',
            email: profile.emails[0].value,
            password: null
        }

        try{
            let user = await User.findOne({googleId: profile.id})

            if(user){
                done(null, user)
            }
            else
            {
                user = await User.create(newUser)
                done(null, user)
            }
        }catch(err)
        {
            console.error(err)
        }
        
    }
    ))

    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}