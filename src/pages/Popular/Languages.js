import { memo } from 'react';
import { languages } from '../../utils/utils';

const Languages = memo(({ urlLanguage, setSearchParams }) => {
  return (
    <>
      <ul className="languages">
        {languages.map((language) => (
          <li
            key={language}
            className={urlLanguage === language.toLowerCase() ? 'active' : ''}
            onClick={() => setSearchParams({ lang: language.toLowerCase() })}
          >
            {language}
          </li>
        ))}
      </ul>
    </>
  );
});

export default Languages;
