import '../styles/App.css';

import LabelVisualizer from './LabelVisualizer'

function App() {
  return (
    <div className="App">
      <h1>Label Visualization Demo</h1>
      <LabelVisualizer text="If the red button is pushed the system shuts down."></LabelVisualizer>
    </div>
  );
}

export default App;
