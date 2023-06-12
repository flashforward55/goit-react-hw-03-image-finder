import PropTypes from 'prop-types';
import {
  ImageGalleryItemImage,
  ImageGalleryContainer,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image.largeImageURL);
  };

  return (
    <ImageGalleryContainer>
      <ImageGalleryItemImage
        src={image.webformatURL}
        alt=""
        onClick={handleClick}
      />
    </ImageGalleryContainer>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;