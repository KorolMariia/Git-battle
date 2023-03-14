import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPopularRepos } from '../../utils/api';
import useShowData from '../../utils/useShowData';
import Languages from './Languages';
import Repos from './Repos';
import SearchRepos from './SearchRepos';
import { languagesToLowerCase } from '../../utils/utils';

const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlLanguage = searchParams.get('lang');
  const urlName = searchParams.get('name');
  const { fetchData, renderData } = useShowData();

  useEffect(() => {
    if (!urlLanguage || !languagesToLowerCase.includes(urlLanguage)) {
      setSearchParams({ lang: 'all' });
    } else {
      fetchData(getPopularRepos(urlLanguage, urlName || ''));
    }
  }, [urlLanguage, urlName, setSearchParams]);

  const showRepos = () => {
    return renderData((repos) => <Repos repos={repos} />);
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
