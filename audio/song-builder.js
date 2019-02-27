import { store } from '../pages/_app';
import { selectActiveNotes } from '../state/selectors/mandachord';
import { MILISECONDS_PER_STEP } from '../state/constants';
import {
  noteRegex,
  getAudioSpriteForNote,
  getPropertyDiff
} from '../util/helpers';

// there are always 16 steps per bar, and 4 bars, thus 64 steps total
const song = Array(64).fill([]);

let previousActiveNotes;

export default () => {
  const songGenerator = function*() {};

  const modifySong = activeNotes => {
    previousActiveNotes = activeNotes;

    // get difference between activeNotes and previousNotes 2d arrays

    const notesToRemove = getPropertyDiff(song, previousSong);

    Object.keys(activeNotes).forEach(noteId => {
      const note = activeNotes[noteId];
      const noteMatches = noteId.match(noteRegex);
      const stepPos = noteMatches.groups.step;

      song[stepPos].push({ noteId, sprite: note.sound });
    });
  };

  const playSong = () => {};

  const stopSong = () => {};

  const handlePlayPause = () => {
    const isPaused = store.getState().mandachord.isPaused;

    isPaused ? stopSong() : playSong();
  };

  const handleNoteChange = () => {
    const state = store.getState();
    const activeNotes = selectActiveNotes(state);

    modifySong(activeNotes);
  };

  store && store.subscribe(handlePlayPause);
  store && store.subscribe(handleNoteChange);
};
