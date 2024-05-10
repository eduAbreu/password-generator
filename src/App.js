import './App.css';
import { PasswordGenerator } from './PasswordGenerator/PasswordGenerator';
import styled from 'styled-components'

function App() {
  return (
    <MainComponent>
      <Container>
        <PasswordGenerator />
      </Container>
    </MainComponent>
  );
}

const MainComponent = styled.div`
  height: 100vh;
  background: #072341;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  background: #fff;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
`

export default App;
