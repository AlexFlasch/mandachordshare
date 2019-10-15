import {
  getInstrumentFromPosition,
  getInstrumentNoteFromPosition
} from './instruments';
import { noteRegex } from './helpers';

export const createInitialNoteState = () => {
  const steps = 64;
  const notesPerStep = 13;

  const notes = {};
  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < notesPerStep; j++) {
      const instrument = getInstrumentFromPosition(j);
      const instrumentNote = getInstrumentNoteFromPosition(j);

      notes[`${i}:${j}`] = {
        stepPos: i,
        notePos: j,
        isActive: false,
        sound: `${instrument}-${instrumentNote}`
      };
    }
  }
  return notes;
};

const emptyNoteState = createInitialNoteState();

const fastBassBeat = Object.keys(emptyNoteState).reduce((acc, key) => {
  const { step, note } = key.match(noteRegex).groups;

  if (parseInt(step, 10) % 2 === 0 && parseInt(note, 10) === 12) {
    return {
      ...acc,
      [key]: {
        ...emptyNoteState[key],
        isActive: true
      }
    };
  } else {
    return {
      ...acc,
      [key]: emptyNoteState[key]
    };
  }
}, {});

export { fastBassBeat };
