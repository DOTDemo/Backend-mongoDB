"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var twitter = require('passport-twitter');
var TwitterStrategy = twitter.Strategy;
function setup(User, config) {
    config = config.default;
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL
    }, function (token, tokenSecret, profile, done) {
        User.findOne({
            'twitter.id_str': profile.id
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    username: profile.username,
                    role: 'user',
                    provider: 'twitter',
                    twitter: profile._json
                });
                user.save(function (err) {
                    if (err)
                        return done(err);
                    done(err, user);
                });
            }
            else {
                return done(err, user);
            }
        });
    }));
}
exports.setup = setup;
;
