import { H1 } from './Headers'
import { Container, Row, Col } from './Grid'
import DateRange from './DateRange'
import FactorRange from './FactorRange'
import TableController from './TableController'
import { Provider } from '../state'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 100%;
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {

  return (
    <AppContainer>
      <Provider>
        <Container className="App">
          <Row justify="start">
            <Col>
              <H1>Factor Timing&emsp;</H1>
            </Col>
            <Col>
              <DateRange/>
            </Col>
          </Row>
          <Row width="100%">
            <FactorRange/>
          </Row>
          <TableController />
        </Container>
      </Provider>
    </AppContainer>
  );
}

export default App;
