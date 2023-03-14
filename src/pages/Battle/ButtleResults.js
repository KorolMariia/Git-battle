import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PreviewPlayer from './PreviewPlayer';
import { battle } from '../../utils/api';
import useShowData from '../../utils/useShowData';
import { MdThumbDown } from 'react-icons/md';
import { GiTargetPrize } from 'react-icons/gi';

const ButtleResults = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const playerOne = queryParams.get('playerOne');
  const playerTwo = queryParams.get('playerTwo');
  const { data, fetchData, renderData } = useShowData();

  useEffect(() => {
    fetchData(battle([playerOne, playerTwo]));
  }, [playerOne, playerTwo]);

  const showPlayers = () => {
    const renderPlayer = ({ player, score }, index) => (
      <PreviewPlayer
        key={player.id}
        name={player.login}
        avatar={player.avatar_url}
      >
        <p className="playerStatus">
          {index ? (
            <>
              <MdThumbDown />
              Loser
            </>
          ) : (
            <>
              <GiTargetPrize />
              Winner
            </>
          )}
        </p>
        <p className="playerStatus">Score: {score}</p>
        <ul className="space-list-items">
          {player.location ? (
            <li>
              <span className="descPlayer">Location:</span> {player.location}
            </li>
          ) : null}
          {player.company ? (
            <li>
              <span className="descPlayer">Company:</span> {player.company}
            </li>
          ) : null}
          {player.followers ? (
            <li>
              <span className="descPlayer">Followers:</span> {player.followers}
            </li>
          ) : null}
          {player.following ? (
            <li>
              <span className="descPlayer">Following:</span> {player.following}
            </li>
          ) : null}
          {player.public_repos ? (
            <li>
              <span className="descPlayer">Public Repos: </span>
              {player.public_repos}
            </li>
          ) : null}
          <li>
            <a href={player.blog}>{player.blog}</a>
          </li>
        </ul>
      </PreviewPlayer>
    );

    return renderData(() => data.map(renderPlayer));
  };

  return (
    <>
      <section className="row">{showPlayers()}</section>
      <Link to="/battle" className="button">
        Go back
      </Link>
    </>
  );
};

export default ButtleResults;
