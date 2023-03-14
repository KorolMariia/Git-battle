import { useState } from 'react';
import Loader from '../Components/Loader';

const useShowData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async (apiFunction) => {
    try {
      setLoading(true);
      const response = await apiFunction;
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderData = (renderItem) => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <p className="error">{error}</p>;
    }
    return data.length ? renderItem(data) : <p className="error">No repos</p>;
  };

  return { data, fetchData, renderData };
};

export default useShowData;
