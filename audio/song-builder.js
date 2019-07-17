import { store } from '../pages/_app';
import {
  selectActiveNotes,
  selectCurrentStep,
  selectActiveNotesAsAudioSprites
} from '../state/selectors/mandachord';
import {
  TOGGLE_NOTE,
  PLAY_PAUSE,
  UPDATE_PLAYBACK_TIME
} from '../state/action-types';
import { MILLISECONDS_PER_STEP } from '../state/constants';
import {
  noteRegex,
  playAudioSpriteForNote,
  getAudioSpriteForNote
} from '../util/helpers';

let isPlaying = false;
let songPlayInterval;
// there are always 16 steps per bar, and 4 bars, thus 64 steps total
// fill the empty 64 spaces in the array with undefined, and convert
// those to empty arrays. Cannot fill with empty arrays directly with
// .fill() since it will fill each element with a reference to the same
// array specified in .fill()
let activeAudioSprites = Array(64)
  .fill(undefined)
  .map(_ => []);
let currentStep = 0;

const filteredSubscriber = (store, actionType, listener) => () => {
  if (store.getState().mandachord.lastAction === actionType) {
    listener();
  }
};

export default () => {
  const songGenerator = function*() {
    while (true) {
      if (activeAudioSprites[currentStep].length > 0) {
        yield playAudioSpriteForNote('horos', activeAudioSprites[currentStep]);
      } else yield;
    }
  };

  const playSong = () => {
    isPlaying = true;

    songPlayInterval = setInterval(() => {
      songGenerator().next();
    }, MILLISECONDS_PER_STEP);
  };

  const stopSong = () => {
    isPlaying = false;

    clearInterval(songPlayInterval);
  };

  const handlePlayPause = () => {
    const isPaused = store.getState().mandachord.isPaused;

    isPaused ? stopSong() : playSong();
  };

  const handleNoteChange = () => {
    const state = store.getState();

    const sprites = selectActiveNotesAsAudioSprites(state);
    const { lastToggledNote, lastToggledState } = state.mandachord;
    const lastToggledNotePos = lastToggledNote.match(noteRegex).groups.note;

    // convert object storing all active note audio sprites into
    // a 2d array containing all audio sprites that need to play
    // on each step. Each sub-array represents all audio sprites
    // for a single step.
    const index = lastToggledNote.match(noteRegex).groups.step;
    // TODO: only modify the last toggled note. currently this will only work with adding notes
    // notes will not be able to be removed
    if (lastToggledState) {
      activeAudioSprites[index].push(sprites[lastToggledNote]);
    } else {
      activeAudioSprites[index] = activeAudioSprites[index].filter(
        s => s !== getAudioSpriteForNote('horos', lastToggledNotePos)
      );
    }
  };

  const handleStepChange = () => {
    const state = store.getState();

    currentStep = selectCurrentStep(state);
    console.log('currentStep: ', currentStep);
  };

  store &&
    store.subscribe(filteredSubscriber(store, PLAY_PAUSE, handlePlayPause));
  store &&
    store.subscribe(filteredSubscriber(store, TOGGLE_NOTE, handleNoteChange));
  store &&
    store.subscribe(
      filteredSubscriber(store, UPDATE_PLAYBACK_TIME, handleStepChange)
    );
};
