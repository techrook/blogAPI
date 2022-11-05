// build dependecies
const express = require('express');
const  Passport  = require('passport');
const JWT = require('jsonwebtoken');
//local dependencies
require('dotenv').config();

const authrouter = express.Router(); 

// authenticate using the signup strategy 
authrouter.post(
    '/signup',
    Passport.authenticate('signup', {session: false}), async(req, res, next) =>{
        res.status(201).json({
            message: 'signup successful',
            user: req.user
        });
    }

);

// authenticate using the login strategy 
authrouter.post(
    '/login',
    async (req, res, next) =>{
        Passport.authenticate('login', async ( error, user, info) =>{
            try{
                if(error) {
                    return next(error)
                }
                if(!user){
                    const error = new Error('email or password is incorrect');
                    return next(error)
                }
                req.login(user, {session: false}, async(error) =>{
                    if(error) return next(error);
                    const body = { _id: user._id, email: user.email };
                    const token = JWT.sign({user: body}, process.env.JWT_SECRET, { expiresIn: '1h' })
                    return res.json({ token })
                }); 
            } catch(error){
                return next(error);
            }
        }
        )(req, res, next);
    }
);

module.exports = authrouter;