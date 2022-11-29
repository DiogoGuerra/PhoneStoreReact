import { useEffect, useState } from "react";

const FetchDetails = (id) => {
  const [details, setDetails] = useState([]);
  const API_URL = "https://front-test-api.herokuapp.com/api/product";

  const fetchDataFromAPI = () => {
    return fetch(API_URL + "/" + id)
      .then((response) => response.json())
      .then((responseData) => setDetails(responseData));
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return details;
};

export default FetchDetails;
