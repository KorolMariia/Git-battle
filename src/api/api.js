import axios from 'axios';

const gitHubAxios = axios.create({
  baseURL: 'https://api.github.com/search',
});

export const getRepos = (lang, userName) => {
  return gitHubAxios.get(
    window.encodeURI(
      `/repositories?q=stars:>1+language:${lang}+${userName}&sort=stars&order=desc&type=Repositories`,
    ),
  );
};
