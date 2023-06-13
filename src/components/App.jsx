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
const IMAGES_PER_PAGE = 15;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      images: [],
      currentPage: 1,
      totalHits: 0,
      isLoading: false,
      showModal: false,
      selectedImage: '',
      selectedTags: '',
      searchQueryError: false,
      noResultsError: false, // Flag for no results error
      errorFetchingImages: false,
      loaderHeight: '100vh', // Initial loader height
    };
  }

  handleSearchSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();
    if (searchQuery === '') {
      this.setState({
        images: [],
        currentPage: 1,
        totalHits: 0,
        searchQueryError: true,
        noResultsError: false, // Reset the no results error flag
      });
    } else {
      this.setState(
        {
          images: [],
          currentPage: 1,
          totalHits: 0,
          searchQuery,
          searchQueryError: false,
          noResultsError: false, // Reset the no results error flag
          loaderHeight: '100vh',
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
        `${BASE_URL}?q=${searchQuery}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${IMAGES_PER_PAGE}`
      );
      if (response.data.hits.length === 0) {
        // No results found
        this.setState({ noResultsError: true });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          totalHits: response.data.totalHits,
        }));
      }
    } catch (error) {
      this.setState({ errorFetchingImages: true });
      console.log('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
        isLoading: true,
      }),
      () => {
        const { currentPage, totalHits } = this.state;
        const totalPages = Math.ceil(totalHits / IMAGES_PER_PAGE);
        if (currentPage <= totalPages) {
          this.fetchImages(this.state.searchQuery);
        }
      }
    );
    this.setState({ loaderHeight: '5vh' }); // Update the loader height
  };

  handleImageClick = (imageUrl, imageTags) => {
    this.setState({
      selectedImage: imageUrl,
      selectedTags: imageTags,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '', selectedTags: '' });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      selectedImage,
      selectedTags,
      searchQueryError,
      noResultsError,
      errorFetchingImages,
      currentPage,
      totalHits,
      loaderHeight,
    } = this.state;

    const showLoadMoreButton =
      currentPage < Math.ceil(totalHits / IMAGES_PER_PAGE); // Check if there are more pages to load

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchSubmit} isLoading={isLoading} />
        {searchQueryError && <p>Please enter a search term.</p>}
        {noResultsError && <p>No results found.</p>}
        {errorFetchingImages && <p>Error fetching images.</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader height={loaderHeight} />}
        {showLoadMoreButton && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            imageUrl={selectedImage}
            imageTags={selectedTags}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </AppContainer>
    );
  }
}

export default App;
