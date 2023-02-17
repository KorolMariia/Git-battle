import { useSearchParams } from 'react-router-dom';

const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeLang = (index) => {
    const selectedIndexLang = languages.findIndex(
      (lang) => lang.toLowerCase() === searchParams.get('lang'),
    );
    const testIndexLang = selectedIndexLang !== -1 ? selectedIndexLang : 0;
    return index === testIndexLang ? 'active' : '';
  };

  const handleQuery = (event) => {
    event.preventDefault();
    setSearchParams({ lang: event.target.textContent.toLowerCase() });
  };

  return (
    <ul className="languages">
      {languages.map((language, index) => (
        <li className={activeLang(index)} key={index} onClick={handleQuery}>
          {language}
        </li>
      ))}
    </ul>
  );
};

export default Popular;
