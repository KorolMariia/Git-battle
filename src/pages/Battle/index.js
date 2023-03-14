import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import InputPlayer from './InputPlayer';
import PreviewPlayer from './PreviewPlayer';
import Loader from '../../Components/Loader';
import { getPlayer } from '../../utils/api';
import { initialStatePlayers } from '../../utils/utils';

const Battle = () => {
  const [loading, setLoading] = useState({ 1: false, 2: false });
  const [error, setError] = useState(null);
  const [playersIds] = useState(['1', '2']);
  const [playersData, setPlayersData] = useState({
    1: { ...initialStatePlayers },
    2: { ...initialStatePlayers },
  });

  const handleSubmit = async (id, username) => {
    try {
      setLoading((prevState) => ({ ...prevState, [id]: true }));
      const data = await getPlayer(username);
      setPlayersData((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          username: username,
          avatar: data.avatar_url,
        },
      }));
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading((prevState) => ({ ...prevState, [id]: false }));
      if (error) {
        setError('');
      }
    }
  };

  const handleReset = (id) => {
    setPlayersData((prevState) => ({
      ...prevState,
      [id]: { ...initialStatePlayers },
    }));
  };

  const renderPlayer = (id) => {
    const { avatar, username } = playersData[id];
    if (avatar) {
      return (
        <PreviewPlayer key={id} name={username} avatar={avatar}>
          <button className="reset" onClick={() => handleReset(id)}>
            Reset
          </button>
        </PreviewPlayer>
      );
    } else {
      return loading[id] ? (
        <Loader key={id} />
      ) : (
        <InputPlayer key={id} id={id} onSubmit={handleSubmit} />
      );
    }
  };

  const showBattlePlayers = () => {
    return playersIds.map((id) => renderPlayer(id));
  };

  const showBattleButton = useMemo(() => {
    return (
      Object.values(playersData).every(({ avatar }) => avatar) && (
        <Link
          to={{
            pathname: '/battle/results',
            search: `?playerOne=${playersData[1].username}&playerTwo=${playersData[2].username}`,
          }}
          state={playersData}
          className="button"
        >
          Battle
        </Link>
      )
    );
  }, [playersData]);

  return (
    <>
      <section className="row">{showBattlePlayers()}</section>
      {showBattleButton}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Battle;
