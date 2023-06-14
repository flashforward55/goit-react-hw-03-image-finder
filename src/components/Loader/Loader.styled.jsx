import styled from 'styled-components';

// Компонент Loader
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.loaderHeight}; /* Use the provided height prop */
`;
