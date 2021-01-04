# remote2020
A framework to present psychophysical stimuli in a peer-to-peer fashion.

At its most basic level, this framework allows one device to specify actions (typically a timeline of displaying visual elements) to be precisely displayed in a browser window (ideally fullscreen) on another device, with a way to transmit behavioral responses.

There are several specific use cases:

1. Vision science teaching labs (contrast sensitivity, dark adaptation, psychophysical methods)
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
- JavaScript really runs *everywhere*, (computers, phones, tablets), and is now built into all browsers. There is a lot of infrastructure (web-based games, 3-D libraries, debugging tools, etc.) Previously, I wrote experiments in Python & PsychoPy, which I loved, but how to then distribute these to other computers? It's not trivial.

### Existing projects: Online Psychology Experiment-builders

There are a wealth of projects that allow simple design and execution of psychology experiment on the web. For example: [Pavlovia](http://pavlovia.org), Gorilla, Lab.js, Testable, Tellab, etc.

I believe that our concerns are quite different.
- For our teaching labs, students needn't *design* experiments, but they are expected to be heavily engaged in the testing experience, gaining experience as both subject and as an experimenter. Thus the peer-to-peer aspect is essential.
- Recruitment, saving data, etc., is not an issue. For us that can be done in a peer-to-peer, more ad-hoc fashion. In fact, it may be advantageous (for IRB approval, etc.) to NOT be hosted on a server.
- We wanted very precise control of the stimuli, which wasn't obvious in some of the existing web-based solutions. I'm not a fan (and don't always see the benefit) of the GUI tools. They seem great for 80% of what one might want to do, then the last 20% becomes painful or impossible. Thus I didn't mind a fully javascript solution, especially since the tools built into browsers are really impressive. 


| Them  | Us |
| ------------- | ------------- |
| <img src="doc/clouds_openloop.png?raw=true"></img>  | <img src="doc/pairs.png?raw=true"></img>  |

## Sensation & perception labs

todo

## Remote psychophysics experiments

todo

## Integration

todo
