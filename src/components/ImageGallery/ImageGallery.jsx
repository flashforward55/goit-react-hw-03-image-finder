import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryContainer, ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ImageGalleryContainer>
        <ImageGalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={onImageClick}
            />
          ))}
        </ImageGalleryList>
      </ImageGalleryContainer>
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
