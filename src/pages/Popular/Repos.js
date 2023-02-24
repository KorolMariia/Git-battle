import { memo } from 'react';

const Repos = memo(({ repos }) => {
  return (
    <>
      <ul className="popular-list">
        {repos.map((repo, index) => (
          <li key={repo.id} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt="Avatar"
                />
              </li>
              <li>
                <a href={repo.html_url} trget="_blank">
                  {repo.name}
                </a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
});

export default Repos;
