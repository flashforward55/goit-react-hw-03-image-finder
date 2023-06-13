import React from 'react';
import PropTypes from 'prop-types';
import { Bars } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = ({ type, color, height, width, loaderHeight }) => (
  <LoaderWrapper loaderHeight={loaderHeight}>
    <Bars type={type} color={color} height={height} width={width} />
  </LoaderWrapper>
);

Loader.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  loaderHeight: PropTypes.string,
};

Loader.defaultProps = {
  type: 'TailSpin',
  color: '#3f51b5',
  height: '80',
  width: '80',
};

export default Loader;
