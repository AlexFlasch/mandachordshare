// code here heavily influenced by: https://github.com/cwilso/metronome
import SchedulerWorker from './scheduler.worker';
import { MILLISECONDS_PER_STEP } from '../state/constants';

import AudioSprites from './audio-sprites';
import { getInstrumentTypeForNote } from '../util/helpers';

const createAudioScheduler = () => {
  // init audio scheduler
  const audioCtx = new AudioContext();
  const stepsInQueue = [];
  const scheduleAheadTime = 0.25; // in seconds
  const scheduleLookahead = 10; // how far in advance to schedule the next step (amount of milliseconds)

  let nextStepTime = 0.0;
  let allSteps = Array(64)
    .fill(undefined)
    .map(() => []);
  let currentStepIndex = 0;
  let instruments = {
    bass: AudioSprites.horos,
    melody: AudioSprites.horos,
    percussion: AudioSprites.horos
  };

  const schedulerWorker = new SchedulerWorker();

  schedulerWorker.onmessage = e => {
    if (e.data === 'tick') {
      scheduler();
    }
  };
  schedulerWorker.addEventListener('message', schedulerWorker.onmessage);
  schedulerWorker.postMessage({ interval: scheduleLookahead });

  // end init

  const getNextStep = () => {
    const nextStep = allSteps[currentStepIndex % allSteps.length];
    currentStepIndex++;
    return nextStep;
  };

  const scheduleStep = (step, time) => {
    stepsInQueue.push({ step, time });

    // TODO: receive instrument updates via saga as well to play
    // notes when they're scheduled
    // const currentTime = audioCtx.currentTime;

    // step.forEach(note => {
    //   const instrument = getInstrumentTypeForNote(note.sound).toLowerCase();

    //   // schedule note to play at proper time (according to audio context's time)
    //   // time = time to play
    //   // currentTime = the time that this was scheduled
    //   // end up with a timeout with a delay that scheudles the note
    //   setTimeout(() => {
    //     instruments[instrument].play(note.sound);
    //   }, time - currentTime);
    // });
  };

  const scheduler = () => {
    let currentTime = audioCtx.currentTime;
    // play the note if the current time is equal to the next step in the queue
    if (stepsInQueue.length && currentTime >= stepsInQueue[0].time) {
      stepsInQueue[0].step.forEach(note => {
        const instrument = getInstrumentTypeForNote(note.sound).toLowerCase();

        instruments[instrument][note.sound](stepsInQueue[0].time);
      });

      // remove that step from the queue since its already been played
      stepsInQueue.splice(0, 1); // remove steps that have already played from queue
    }

    // look ahead to the next step to see if its time to schedule it
    while (nextStepTime < audioCtx.currentTime + scheduleAheadTime) {
      const nextStep = getNextStep();
      if (nextStep.length > 0) {
        scheduleStep(nextStep, nextStepTime);
      }
      nextStepTime += MILLISECONDS_PER_STEP / 1000; // convert the millisceonds to seconds (audioCtx.currentTime is in seconds)
    }

    currentTime = audioCtx.currentTime;
    // remove any steps from the queue after their time has passed
    // while (stepsInQueue.length && stepsInQueue[0].time < currentTime) {
    //   stepsInQueue.splice(0, 1); // remove steps that have already played from queue
    // }
  };

  const updateCurrentStep = () => {};

  const updateAllSteps = steps => {
    console.log(steps);
    allSteps = steps;
  };

  const updateInstruments = inst => (instruments = inst);

  const playPause = isPlaying => {
    if (isPlaying) {
      nextStepTime = audioCtx.currentTime;
      schedulerWorker.postMessage('play');
    } else {
      schedulerWorker.postMessage('pause');
    }
  };

  return {
    updateCurrentStep,
    updateAllSteps,
    updateInstruments,
    playPause
  };
};

export default createAudioScheduler;
