import { useState, memo } from 'react';

const InputPlayer = memo(({ id, onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(id, username);
  };

  return (
    <form onSubmit={handleSubmit} className="column">
      <label className="header">
        Username {id}:
        <input
          id={id}
          type="text"
          placeholder="GitHub username"
          autoComplete="off"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <button className="button" disabled={!username}>
        Submit
      </button>
    </form>
  );
});

export default InputPlayer;
