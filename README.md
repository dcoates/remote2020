# remote2020
A framework to present psychophysical stimuli in a peer-to-peer fashion.

At its most basic level, this framework allows the specification of actions (typically a timeline of displaying visual elements) for rendering on another device, including getting responses.

The use cases are very specifics:

1. Optometry teaching labs (contrast sensitivity, dark adaptation, psychophysical methods)
1. Remote psychophysics experiments
1. Leveraging ofjavascript libraries and integrating with hardware

Requirements:
- For experiments in "low-level" vision:
  - control of timing
  - control of visual display
    - pixel-accurate
    - luminance/contrast levels
  - get responses

Why JavaScript?
- JavaScript really runs *everywhere*, (computers, phones, tablets), and is now built into all browsers, making it a robust choice. There are game toolkits, so it must have adequate capabilities. Previously, I wrote experiments in Python&PsychoPy, which I loved, but how to then distribute these to other computers? It's not trivial.

### Existing projects: Online Psychology Experiment-builders

There are a wealth of projects that allow simple "design and execution of psychology experiment on the web." For example: [Pavlovia](http://pavlovia.org), Gorilla, Lab.js, Testable, Tellab, etc.

I believe that our concerns are quite different from theirs. For our teaching labs, subjects are expected to be engaged in the data collection (gaining experience as both participant and experimenter), but needn't be involved in their creation.

## Sensation & perception labs

todo

## Remote psychophysics experiments

todo

## Integration

todo
