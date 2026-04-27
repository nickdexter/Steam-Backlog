const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const APP_PORT = process.env.APP_PORT;
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const db = require("../utils/dbconn");

passport.use(new SteamStrategy({
    returnURL: `http://localhost:${APP_PORT}/auth/steam/return`,
    realm: `http://localhost:${APP_PORT}`,
    apiKey: STEAM_API_KEY,
}, (identifier, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id); // steam64id
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query(
            'SELECT * FROM "user" WHERE steam64id = $1',
            [id]
        );

        done(null, result.rows[0] || null);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;