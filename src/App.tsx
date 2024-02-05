import { GlobalStyles } from './components/GlobalStyles';
import MouseButtons from './components/MouseButtons';
import Screen from './components/Screen';
import Trackpad from './components/Trackpad';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Screen />
        <Trackpad />
        <MouseButtons />
      </div>
    </>
  );
};

export default App;
