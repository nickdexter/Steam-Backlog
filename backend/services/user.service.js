const steamService = require('./steam.service');
const db = require('../utils/dbconn');

async function handleSteamLogin(profile) {
    const steam64id = profile.id;
    const name = profile.displayName;
    const avatar = profile.photos[2].value;

    // Check for existing user
    const userResult = await db.query(
        'SELECT * FROM "user" WHERE steam64id = $1',
        [steam64id]
    );

    // Add new user
    if (userResult.rowCount <= 0) {
        await db.query(
            'INSERT into "user" (steam64id, name, avatar) VALUES ($1, $2, $3)',
            [steam64id, name, avatar]
        );
    }

    // Add new games to db
    const games = await steamService.getOwnedGames(steam64id);

    for (const game of games) {
        // Add game to db of games
        await db.query(
            'INSERT INTO game (gameid, name) VALUES ($1, $2) ON CONFLICT (gameid) DO NOTHING',
            [game.appid, game.name]
        );

        // Add game to user's library
        await db.query(
            `INSERT INTO user_library (steam64id, gameid, status) VALUES ($1, $2, 'backlog') ON CONFLICT DO NOTHING`,
            [steam64id, game.appid]
        );
    }
}

module.exports = { handleSteamLogin };