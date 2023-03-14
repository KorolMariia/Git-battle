import axios from 'axios';
import { ACCESS_KEY } from '../config';

const handleError = (error) => console.error(error);

const gitHubAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${ACCESS_KEY}`,
  },
});

export const getPopularRepos = async (lang, userName) => {
  const { data } = await gitHubAxios.get(
    window.encodeURI(
      `/search/repositories?q=stars:>1+language:${lang}+${userName}&sort=stars&order=desc&type=Repositories`,
    ),
  );
  return data.items;
};

export const getPlayer = async (username) => {
  const { data } = await gitHubAxios.get(window.encodeURI(`users/${username}`));
  return data;
};

const getRepos = async (username) => {
  try {
    const { data } = await gitHubAxios.get(
      `/users/${username}/repos?per_page=100`,
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

const getStarCount = (repos) => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

const calculateScore = (player, repos) => {
  const followers = player.followers;
  const totalScore = getStarCount(repos);
  return followers + totalScore;
};

const getUserData = async (username) => {
  try {
    const [player, repos] = await Promise.all([
      getPlayer(username),
      getRepos(username),
    ]);
    return {
      player: player,
      score: calculateScore(player, repos),
    };
  } catch (error) {
    handleError(error);
  }
};

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

export const battle = async (players) => {
  const battlePlayers = await Promise.all(players.map(getUserData));
  return sortPlayers(battlePlayers);
};
