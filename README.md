# remote2020
A framework to present psychophysical stimuli in a peer-to-peer fashion.

At its most basic level, this framework allows the specification of actions (typically a timeline of displaying visual elements) for rendering on another device, possibly getting responses (etc.)

The use cases are very specific, and these are drilled into below:

1. Sensation & Perception Labs (in Optometry)
1. Remote psychophysics experiments
1. Leveraging of javascript libraries and integrating with hardware

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

There are a wealth of projects that allow simple "design and execution of psychology experiment on the web." For example: [Pavlovia](http://pavlovia.org), Gorilla, Lab.js, Testable, new Nakayama one (many more).

Their concernts are quite different. For our teaching labs, subjects are expected to participate in experiments, but needn't be involved in their creation.

## Sensation & perception labs

todo

## Remote psychophysics experiments

todo

## Integration

todo
