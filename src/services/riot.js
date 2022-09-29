import axios from "axios";

const API_RIOT_URL = 'https://euw1.api.riotgames.com/';
const token = 'RGAPI-4b293c50-bdba-44d0-a34a-de898a08e916';
axios.defaults.headers.common['X-Riot-Token'] = token;
export default {

    lastMatches : async (data) => {
        const encryptedId = data.encryptedId;

        return await axios.get(`${API_RIOT_URL}/lol/match/v4/matchlists/by-account/${encryptedId}?endIndex=10&beginIndex=0`);
    },
    allMatches : async (data) => {
        const encryptedId = data.encryptedId;

        try {
          const res = await axios.get(`${API_RIOT_URL}/lol/match/v4/matchlists/by-account/${encryptedId}`);

          return res.data;
        } catch(e) {
          return e;
        }

    },
    oneMatch : async (data) => {
        const matchId = data.matchId;

        return await axios.get(`${API_RIOT_URL}/lol/match/v4/matches/${matchId}`);
    },
    summoner : async (data) => {
        const summonerName = data.account;

        try {
          const res = await axios.get(`${API_RIOT_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`);
          return res;
        } catch(e) {
          return e;
        }
    },

}
