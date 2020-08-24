#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from __future__ import division

from psychopy import visual, event, core
import numpy as np
import numpy.random as random

win = visual.Window((600, 600), allowGUI=False, winType='pyglet')

ndots=100
    
dotPatch = visual.ElementArrayStim(
    win=win,
    units="pix",
    nElements=100,
    elementTex=None,
    elementMask="raisedCos")

fixation= visual.TextStim(win, text='+', pos=(0, 0))
trialClock =core.Clock()

for n in np.arange(5):

    locs = random.uniform(-300,300,size=(ndots,2) )
    s = random.uniform(3,40,size=(ndots) )
    dotPatch.xys=locs
    dotPatch.sizes=s

    fixation.draw()
    win.flip()  
    result=event.waitKeys()

    for nflips in np.arange(20):
        fixation.draw()
        win.flip()  

    for nflips in np.arange(30):
        dotPatch.draw()
        win.flip()  

win.close()
core.quit()

# The contents of this file are in the public domain.
