require('dotenv').config();
express = require('express');
app = express();
port = process.env.APP_PORT;

app.use(express.json());

const gameRoutes = require('./routes/game');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const libraryRoutes = require('./routes/library');

app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/library', libraryRoutes);

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})