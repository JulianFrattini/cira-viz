import '../styles/App.css';

import React  from 'react';

import LabelVisualizer from '../packages/labelvisualization/LabelVisualizer'
import mocklabels from "../util/sentences/s6/labels"

import CEGVisualizer from '../packages/graphvisualization/CEGVisualizer';
import mockceg from '../util/sentences/s6/ceg';

function App() {

  return (
    <div className="App">
      <h1>CiRA Sentence Visualization Demo</h1>

      <h2>Label Visualization</h2>
      <LabelVisualizer text="If an error is present and the debugger is active or an exception is triggered then a log entry will be created." labels={mocklabels}></LabelVisualizer>

      <h2>Cause-Effect Graph Visualization</h2>
      <CEGVisualizer ceg={mockceg}></CEGVisualizer>
    </div>
  );
}

export default App;
