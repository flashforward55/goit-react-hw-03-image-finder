import PropTypes from 'prop-types';
import { ButtononLoadMore, ButtononLoadMoreFlex } from './Button.syled';

const Button = ({ onLoadMore }) => {
  return (
    <ButtononLoadMoreFlex>
      <ButtononLoadMore type="button" onClick={onLoadMore}>
        Load more
      </ButtononLoadMore>
    </ButtononLoadMoreFlex>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
