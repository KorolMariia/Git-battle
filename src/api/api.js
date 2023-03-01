import axios from 'axios';

const gitHubAxios = axios.create({
  baseURL: 'https://api.github.com',
});

export const getRepos = (lang, userName) => {
  return gitHubAxios.get(
    window.encodeURI(
      `/search/repositories?q=stars:>1+language:${lang}+${userName}&sort=stars&order=desc&type=Repositories`,
    ),
  );
};

export const getPlayer = (username) => {
  return gitHubAxios.get(window.encodeURI(`users/${username}`));
};
