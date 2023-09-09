import { Strategy } from 'passport-jwt'
import { ExtractJwt } from "passport-jwt"
import config from '../utils/config.js'
import passport from "passport"
import User from '../models/User.js'


var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.KEY


export default (passport) => {
  passport.use(new Strategy(opts,async (jwt_payload, done) => {
    try{
      const user =await User.findOne({email:jwt_payload.email})
      if(user){
        done(null,user)
      }else{
        done(null,false)
      }
    }catch(e){
      done(e,false)
    }

  }))
}
