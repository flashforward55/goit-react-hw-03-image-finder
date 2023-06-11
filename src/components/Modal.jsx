import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { Component } from 'react';

export class Modal extends Component {
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
    const { imageUrl } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <ModalContainer>
          <img src={imageUrl} alt="" />
        </ModalContainer>
      </Overlay>
    );
  }
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ModalContainer = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
