// code here heavily influenced by: https://github.com/cwilso/metronome
import SchedulerWorker from './scheduler.worker';
import { MILLISECONDS_PER_STEP } from '../state/constants';

import { getInstrumentTypeForNote } from '../util/helpers';

const createAudioScheduler = () => {
  // init audio scheduler
  const audioCtx = new AudioContext();
  const stepsInQueue = [];
  const scheduleAheadTime = 0.1; // in milliseconds
  const scheduleLookahead = 0.25; // how far in advance to schedule the next step

  let nextStepTime = 0;
  let allSteps = [];
  let currentStep = 0;

  const schedulerWorker = new SchedulerWorker();

  schedulerWorker.onmessage = e => {
    if (e.data === 'tick') {
      console.log('tick! ', audioCtx.currentTime);
      scheduler();
    }
  };
  schedulerWorker.addEventListener('message', schedulerWorker.onmessage);
  schedulerWorker.postMessage({ interval: scheduleLookahead });

  // end init

  const scheduleStep = (step, time) => {
    stepsInQueue.push({ step, time });

    // TODO: receive instrument updates via saga as well to play
    // notes when they're scheduled
    allSteps[currentStep].forEach(note => {
      const instrument = getInstrumentTypeForNote(note.sound).toLowerCase();
      // instrumentSprites[instrument].play(note.sound);
    });
  };

  const scheduler = () => {
    while (nextStepTime < audioCtx.currentTime + scheduleAheadTime) {
      scheduleStep(allSteps[currentStep + 1], nextStepTime);
      nextStepTime += MILLISECONDS_PER_STEP;
    }
  };

  // const updateCurrentStep = step => (currentStep = step);
  const updateCurrentStep = () => {};

  const updateAllSteps = steps => (allSteps = steps);

  const playPause = isPlaying => {
    if (isPlaying) {
      nextStepTime = audioCtx.currentTime;
      schedulerWorker.postMessage('play');

      const currentTime = audioCtx.currentTime;
      while (stepsInQueue.length && stepsInQueue[0].time < currentTime) {
        currentStep = stepsInQueue[0].step;
        stepsInQueue.splice(0, 1); // remove step from queue
      }
    } else {
      schedulerWorker.postMessage('pause');
    }
  };

  return {
    updateCurrentStep,
    updateAllSteps,
    playPause
  };
};

export default createAudioScheduler;
