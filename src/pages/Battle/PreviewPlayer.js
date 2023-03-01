import { memo } from 'react';

const PreviewPlayer = memo(({ children, name, avatar }) => {
  return (
    <div className="column">
      <img className="avatar" src={avatar} alt="Avatar" />
      <h2 className="username">{name}</h2>
      {children}
    </div>
  );
});

export default PreviewPlayer;
