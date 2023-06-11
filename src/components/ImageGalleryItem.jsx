import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image.largeImageURL);
  };

  return (
    <ImageGalleryItemContainer className="gallery-item">
      <ImageGalleryItemImage
        src={image.webformatURL}
        alt=""
        onClick={handleClick}
      />
    </ImageGalleryItemContainer>
  );
};

// Компонент ImageGalleryItem
const ImageGalleryItemContainer = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
const ImageGalleryItemImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
