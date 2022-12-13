import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31174976-e4ea20c1e3f3139c1b6ab1378';
axios.defaults.baseURL = BASE_URL;
export const fetchImages = (searchInput, page) => {
  return axios
    .get(
      `${BASE_URL}?q=${searchInput}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&`
    )
    .then(response => response.data);
};
