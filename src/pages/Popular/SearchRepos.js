import { useState, memo } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import * as yup from 'yup';

const validSearch = yup
  .string()
  .required('This field is required')
  .matches(/^[a-zA-Z]+$/gi, 'This field must contain only English letters');

const SearchRepos = memo(({ urlLanguage, setSearchParams }) => {
  const [searchName, setSearchName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValid = async () => {
    try {
      await validSearch.validate(searchName);
      setSearchParams({ lang: urlLanguage, name: searchName });
      setSearchName('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSearchName('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSearchName('');
    }
    if (event.key === 'Enter') {
      isValid();
    }
  };

  return (
    <>
      <div className="search-wrap">
        <input
          type="text"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
          className="searchTerm"
          placeholder="What repositories are you looking for?"
          onKeyDown={handleKeyDown}
          aria-describedby="search-error"
        />
        {errorMessage && <span id="search-error">{errorMessage}</span>}
        <button className="searchButton" onClick={isValid}>
          <BiSearchAlt />
        </button>
      </div>
    </>
  );
});

export default SearchRepos;
