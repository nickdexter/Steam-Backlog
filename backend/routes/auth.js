const passport = require('passport');
const express = require('express');
const app = express();
const router = express.Router();
const userService = require('../services/user.service');

app.get('/', (req, res) => {
    res.send("Logged in successfully");
});

// Go to steam to authenticate
router.get('/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
        // Login success, redirect user
        res.redirect('/');
    })

// Return and redirect user
router.get("/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    async (req, res) => {
        await userService.handleSteamLogin(req.user);
        res.redirect("http://localhost:5173");
    }
);

module.exports = router;