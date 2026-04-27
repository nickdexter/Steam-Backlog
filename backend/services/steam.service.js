const axios = require("axios");

const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function getOwnedGames(steam64id) {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`;
    try {
        const response = await axios.get(url, {
            params: {
                key: STEAM_API_KEY,
                steamid: steam64id,
                format: "json",
                include_appinfo: true
            }
        });

        return response.data.response.games;
    } catch (error) {
        console.error(error);
        return [];
    }

}

async function getPlayerAchievements(steam64id, gameid) {
    const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/`;
    try {
        const response = await axios.get(url, {
            params: {
                key: STEAM_API_KEY,
                steamid: steam64id,
                appid: gameid,
                format: "json",
            }
        });

        return response.data.response.games;
    } catch (error) {
        console.error(error);
        return [];
    }

}

module.exports = {
    getOwnedGames,
    getPlayerAchievements
};