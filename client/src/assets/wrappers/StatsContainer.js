import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 2rem;
  display: grid;
  row-gap: 2rem;
  margin-left: 3rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export default Wrapper;
