require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const session = require('express-session');
const passport = require('./config/passport');
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const gameRoutes = require('./routes/game');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const libraryRoutes = require('./routes/library');
const authRoutes = require('./routes/auth');

app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/library', libraryRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})