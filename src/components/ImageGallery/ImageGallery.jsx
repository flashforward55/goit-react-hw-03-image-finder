import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.images.length !== this.props.images.length) {
      this.smoothPageScrolling();
    }
  }
  smoothPageScrolling() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    const scrollAmount = cardHeight * 3.05;
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth',
    });
  }
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ImageGalleryList className="gallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={onImageClick}
          />
        ))}
      </ImageGalleryList>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
