import { styled } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { Input } from './ui/Input';
import Button from './ui/Button';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('hi')}>Check In</Button>
        <Input type="number" placeholder="num guests" />
      </div>
    </>
  );
}

export default App;
