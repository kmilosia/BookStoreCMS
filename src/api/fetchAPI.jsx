import { apiURL } from "./api-address";
export const fetchAll = ({address}) => {
    // return fetch('https://random-data-api.com/api/v2/beers?size=4')
    return fetch(`${apiURL}${address}`)
      .then(response => response.json());
  };