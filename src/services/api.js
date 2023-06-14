import axios from 'axios';

const API_KEY = '35140926-fd12774c1839d7d0854ca625c';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGES_PER_PAGE = 15;

export const fetchImagesFromServer = async (searchQuery, currentPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${IMAGES_PER_PAGE}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
};
