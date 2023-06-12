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
      searchQueryError: false,
      noResultsError: false, // Flag for no results error
    };
  }

  handleSearchSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();
    if (searchQuery === '') {
      this.setState({
        images: [],
        currentPage: 1,
        searchQueryError: true,
        noResultsError: false, // Reset the no results error flag
      });
    } else {
      this.setState(
        {
          images: [],
          currentPage: 1,
          searchQuery,
          searchQueryError: false,
          noResultsError: false, // Reset the no results error flag
        },
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
      if (response.data.hits.length === 0) {
        // No results found
        this.setState({ noResultsError: true });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      }
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
    const {
      images,
      isLoading,
      showModal,
      selectedImage,
      searchQueryError,
      noResultsError,
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchSubmit} isLoading={isLoading} />
        {searchQueryError && <p>Please enter a search term.</p>}
        {noResultsError && <p>No results found.</p>}
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
