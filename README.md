# Label Visualization

This repository contains the prototype of a React component for label visualization. 

## Use Case

In certain use cases, a natural language sentence contains labels, where each label spans one or more consecutive words and has a clear identity (i.e., a label type). For example, in the [CiRA project](www.cira.bth.se), the causal elements of a natural language sentence (e.g., the `cause` or `effect` portion of a sentence) are automatically annotated as shown.

![visualization of CiRA annotation](./figures/visualization-demo.PNG)

To visualize these labels, annotation tools like [brat](https://brat.nlplab.org/) had been used. However, this technology is fully based on jQuery and its integration into a modern, React-like web interface is not without difficulty. Hence, this project represents a reimplementation of the `brat` functionality in a React-ive way.

## Usage

### Use in another project

To use this visualization in another project, perform the following steps:

1. Copy the [labelvisualization](./vizdemo/src/packages/labelvisualization/) folder into your project.
2. Adjust the [labeltypes](./vizdemo/src/packages/labelvisualization/util/labeltypes.js) component. Every label type should contain a `label`, `short` (short version of the `label` name), `color` (as hex value), and `level` value.
3. Create a `LabelVisualizer` component, providing both a `text` as well as a list of `labels` (containing a `type` that corresponds to the `label` names as well as a `start` and `end` property representing its starting and ending character within the text.)

### Demonstration

To run a demo of the visualization, run `npm run start` from the [vizdemo](./vizdemo/) folder. It uses the [labeltypes](./vizdemo/src/packages/labelvisualization/util/labeltypes.js) from the CiRA project and renders some [mocked labels](./vizdemo/src/util/mocklabels.js) on top of a sentence.