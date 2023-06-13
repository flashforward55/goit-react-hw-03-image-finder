import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { imageUrl, imageTags } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <ModalContainer>
          <img src={imageUrl} alt={imageTags} />
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
