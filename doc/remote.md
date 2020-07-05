At its most basic level, (Remote Psychophysical Rendering) RPR is a language to specify actions (typically displaying visual elements) for rendering on another device, ideally with a generic distribution.

The use cases are very specific.

1. Sensation & Perception Labs 
1. Enable remote psychophysics experiments
1. Allow integration of a variety of hardware

Goals:
- Sufficient for experiment in "low-level" vision. Thus requirements:
  - control of timing
  - control of visual display
    - pixel-accurate
    - luminance/contrast levels

Why JavaScript?
- JavaScript really runs *everywhere*, (computers, phones, tablets), and is the basis of of the Web, so is a robust choice. Previously, I wrote experiments in Python&PsychoPy, which I loved, but how to then distribute these to other computers? It's not trivial.

### Existing projects: Online Psychology Experiment-builders

There are a wealth of projects that allow simple "design and execution of psychology experiment on the web." For example: [Pavlovia](http://pavlovia.org), Gorilla, Lab.js, Testable, new Nakayama one (many more).

Our needs are quite different. For our teaching labs, subjects are expected to participate in experiments, but needn't be involved in their creation.


|Psych Lab 101 for iPad|What|Cool|
|---|---|---|
|Isee | neat | Okay |
|1 | 2 | 3 |


Names:
- master/slave
- doctor/patient
- server/client
- super
