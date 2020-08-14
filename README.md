# remote2020
A framework to present psychophysical stimuli in a peer-to-peer fashion.

At its most basic level, this framework allows the specification of actions (typically a timeline of displaying visual elements) for rendering on another device, and potentially gathering behavioral responses.

There are several speficic use cases:

1. Optometry teaching labs (contrast sensitivity, dark adaptation, psychophysical methods)
1. Remote psychophysics experiments
1. Leveraging of javascript libraries and integrating with hardware

Requirements:
- For experiments in "low-level" vision:
  - Good control of timing of display elements
  - Good control of visual display
    - pixel-accurate
    - best possible luminance/contrast levels
  - Get responses

Why JavaScript?
- JavaScript really runs *everywhere*, (computers, phones, tablets), and is now built into all browsers, making it a robust choice. There is now a lot of infrastructure (web-based games, 3-D libraries, etc.) Previously, I wrote experiments in Python & PsychoPy, which I loved, but how to then distribute these to other computers? It's not trivial.

### Existing projects: Online Psychology Experiment-builders

There are a wealth of projects that allow simple "design and execution of psychology experiment on the web." For example: [Pavlovia](http://pavlovia.org), Gorilla, Lab.js, Testable, Tellab, etc.

I believe that our concerns are quite different. For our teaching labs, both participants are expected to be engaged in the data collection (gaining experience as both subject and as an experimenter), but needn't be involved in their creation.. Thus the peer-to-peer aspect is essential. We also wanted very precise control of the stimuli, which wasn't obvious in some of the existing solutions. Also, I'm not a fan (and don't always see the benefit) of the graphical building; it seems great for 80% of what needs to be done, then the last 20% is painful or impossible. Thus I didn't mind a fully javascript solution, especially since the tools built into browsers are so mature.

## Sensation & perception labs

todo

## Remote psychophysics experiments

todo

## Integration

todo
