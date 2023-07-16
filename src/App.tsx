import GlobalStyles from './styles/GlobalStyles';
import { Input } from './ui/Input';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Row from './ui/Row';

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert('hi')}>Check In</Button>
              <Button variation="secondary" size="small" onClick={() => alert('hi')}>
                Check Out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Input type="number" placeholder="num guests" />
          </Row>
        </Row>
      </div>
    </>
  );
}

export default App;
