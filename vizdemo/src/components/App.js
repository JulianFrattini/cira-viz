import '../styles/App.css';

import LabelVisualizer from '../packages/labelvisualization/LabelVisualizer'
import mocklabels from "../util/mocklabels"

import CEGVisualizer from '../packages/graphvisualization/CEGVisualizer';
import mockceg from '../util/mockceg';
import mockceg2 from '../util/mockceg2';
import mockceg3 from '../util/mockceg3';

function App() {

  return (
    <div className="App">
      <h1>CiRA Sentence Visualization Demo</h1>

      <h2>Label Visualization</h2>
      <LabelVisualizer text="If the red button is pushed the system shuts down." labels={mocklabels}></LabelVisualizer>

      <h2>Cause-Effect Graph Visualization</h2>
      <CEGVisualizer ceg={mockceg3}></CEGVisualizer>
    </div>
  );
}

export default App;
