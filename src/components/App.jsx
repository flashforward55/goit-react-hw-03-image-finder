import React, { Component } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal';

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
    this.setState({ images: [], currentPage: 1 });
    this.fetchImages(e.target.elements.searchQuery.value);
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
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchSubmit} isLoading={isLoading} />
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

// Остальные компоненты остаются без изменений

export default App;
const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
