import PropTypes from 'prop-types';
import { ButtononLoadMore } from './Button.syled';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtononLoadMore type="button" onClick={onLoadMore}>
      Load more
    </ButtononLoadMore>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
