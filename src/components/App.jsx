import React, { Component } from 'react';
import axios from 'axios';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

const API_KEY = '35140926-fd12774c1839d7d0854ca625c';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      images: [],
      currentPage: 1,
      isLoading: false,
      showModal: false,
      selectedImage: '',
      searchQueryError: false, // Флаг ошибки пустого поля поиска
    };
  }

  componentDidMount() {
    // Код, который выполняется после монтирования компонента
  }

  componentDidUpdate(prevProps, prevState) {
    // Код, который выполняется после обновления компонента
  }

  handleSearchSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim(); // Убираем лишние пробелы
    if (searchQuery === '') {
      // Если поле поиска пустое, устанавливаем флаг ошибки
      this.setState({ images: [], currentPage: 1, searchQueryError: true });
    } else {
      this.setState(
        { images: [], currentPage: 1, searchQuery, searchQueryError: false },
        () => {
          this.fetchImages(searchQuery);
        }
      );
    }
  };

  fetchImages = async searchQuery => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `${BASE_URL}?q=${searchQuery}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
      }));
    } catch (error) {
      console.log('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ currentPage: prevState.currentPage + 1 }),
      () => this.fetchImages(this.state.searchQuery)
    );
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, searchQueryError } =
      this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchSubmit} isLoading={isLoading} />
        {searchQueryError && <p>Please enter a search term.</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            imageUrl={selectedImage}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </AppContainer>
    );
  }
}

export default App;
