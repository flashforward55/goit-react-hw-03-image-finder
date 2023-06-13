import PropTypes from 'prop-types';
import { ButtononLoadMore, ButtonWrapper } from './Button.syled';

const Button = ({ onLoadMore }) => {
  return (
    <ButtonWrapper>
      <ButtononLoadMore type="button" onClick={onLoadMore}>
        Load more
      </ButtononLoadMore>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
