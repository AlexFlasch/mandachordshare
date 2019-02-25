import { store } from '../pages/_app';
import { selectActiveNotes } from '../state/selectors/mandachord';
import { MILISECONDS_PER_STEP } from '../state/constants';
import { noteRegex, getAudioSpriteForNote } from '../util/helpers';

const copySong = prevSong => prevSong.map(step => step.map(note => note));

// there are always 16 steps per bar, and 4 bars, thus 64 steps total
const song = [].fill([], 0, 63);
const previousSong = copySong(song);

export default () => {
  const songGenerator = function*() {};

  const modfiySong = activeNotes => {
    previousSong = copySong(song);

    // find the notes that need to be removed
    const notesToBeRemoved = previousSong.map((step, i) =>
      step.filter(note => song[i].includes)
    );

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

  store.subscribe(handlePlayPause);
  store.subscribe(handleNoteChange);
};
