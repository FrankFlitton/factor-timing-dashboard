import styled from 'styled-components'

// Homebrew flex box auto layout

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  padding: 0 1rem !important;
  margin: 0 auto !important;
`;

const Row = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
  width: 100%;
  margin: -1rem !important;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  padding: 1rem 0rem !important;
  width: ${props => props.width ? props.width : 'auto'}
`;

export { Container, Row, Col }