import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRepos } from '../../api/api';
import Languages from './Languages';
import Repos from './Repos';
import SearchRepos from './SearchRepos';
import Loader from '../../Components/Loader';
import { languagesToLowerCase } from '../../utils';

const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);

  const urlLanguage = searchParams.get('lang');
  const urlName = searchParams.get('name');

  const loadRepos = useCallback(() => {
    setLoading(true);
    getRepos(urlLanguage, urlName || '')
      .then(({ data: { items } }) => {
        setRepos(items);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [urlLanguage, urlName]);

  useEffect(() => {
    if (!urlLanguage || !languagesToLowerCase.includes(urlLanguage)) {
      setSearchParams({ lang: 'all' });
    } else {
      loadRepos(urlLanguage, urlName);
    }
  }, [urlLanguage, urlName, setSearchParams, loadRepos]);

  const showRepos = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return repos.length ? (
      <Repos repos={repos} />
    ) : (
      <p className="noRepo">No repositories</p>
    );
  };

  return (
    <>
      <SearchRepos
        urlLanguage={urlLanguage}
        setSearchParams={setSearchParams}
      />
      <Languages urlLanguage={urlLanguage} setSearchParams={setSearchParams} />
      {showRepos()}
    </>
  );
};

export default Popular;
