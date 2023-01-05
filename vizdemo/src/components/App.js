import '../styles/App.css';

import LabelVisualizer from '../packages/labelvisualization/LabelVisualizer'
import mocklabels from "../util/mocklabels"

function App() {

  return (
    <div className="App">
      <h1>Label Visualization Demo</h1>
      <LabelVisualizer text="If the red button is pushed the system shuts down." labels={mocklabels}></LabelVisualizer>
    </div>
  );
}

export default App;
