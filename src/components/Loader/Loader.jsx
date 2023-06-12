import React from 'react';
import PropTypes from 'prop-types';
import { Bars } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = ({ type, color, height, width }) => (
  <LoaderWrapper>
    <Bars type={type} color={color} height={height} width={width} />
  </LoaderWrapper>
);

Loader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Loader.defaultProps = {
  type: 'TailSpin',
  color: '#3f51b5',
  height: 80,
  width: 80,
};
