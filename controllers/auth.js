//build dependenies
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//local dependencies
const UserModel = require('../models/user');

// middle ware function to extract secret_token for authorization
passport.use(
    new JWTstrategy (
        {
            secretOrKey:process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async(token, done) =>{
            try{
                return done(null, token.user);
            } catch(error) {
                done(error);
            }
        }
    )
);
// middleware signup function
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) =>{
            try {
                const user = await UserModel.create({email, password});

                return done(null,user )
            } catch(error) {
                return done(error)
            }
        }
    )
);
//middleware login function
passport.use(
    'login',
    new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'   
    },
    async (email, password, done) => {
        try{
            const user = await UserModel.findOne({ email });

            if(!user) {
                return done(null, false, { message: 'User not found' }); 
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }

            return done(null, user, { message: `${user} your logged in` })
        } catch (error){
            return done(error)
        }
    }
    )
);