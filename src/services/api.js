import axios from 'axios';

const API_KEY = '35140926-fd12774c1839d7d0854ca625c';
const BASE_URL = 'https://pixabay.com/api/';
export const IMAGES_PER_PAGE = 15;

export const fetchImagesFromServer = async (searchQuery, currentPage) => {
  try {
    const params = {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: IMAGES_PER_PAGE,
    };

    const queryString = new URLSearchParams(params).toString();
    const imageUrl = `${BASE_URL}?${queryString}`;

    const response = await axios.get(imageUrl);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
};
