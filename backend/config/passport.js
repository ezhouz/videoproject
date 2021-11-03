const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const UploaderInfo = require('../db/models/uploaderInfo');

module.exports = function (passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await UploaderInfo.findOne({
            where: {id: jwt_payload.id}
        });
        if (!user) {
            return done('User does not exist', false);
        } else {
            done(null, user.toJSON());
        }
    }));
};
