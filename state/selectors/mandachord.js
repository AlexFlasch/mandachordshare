import { createSelector } from 'reselect';

import { MILLISECONDS_PER_STEP } from '../constants';
import { noteRegex, getAudioSpriteForNote } from '../../util/helpers';

// helper functions
const getActiveNotesInStep = (mandachord, step) => {
  const keys = Object.keys(step);
  const notesInStep = keys.filter(note => step[note].isActive);
  const notesObj = notesInStep.reduce((obj, key) => {
    obj[key] = mandachord.notes[key];
    return obj;
  }, {});

  return notesObj;
};

// selectors
export const mandachordSelector = state => state.mandachord;

export const selectCurrentStep = createSelector(
  mandachordSelector,
  mandachord =>
    Math.floor((mandachord.playbackTime % (MILLISECONDS_PER_STEP * 64)) / 64)
);

export const selectNotesInCurrentStep = createSelector(
  mandachordSelector,
  mandachord =>
    Object.keys(mandachord.notes)
      .filter(
        noteId =>
          parseInt(noteId.match(noteRegex).groups.step, 10) ===
          Math.floor(mandachord.playbackTime / MILLISECONDS_PER_STEP)
      )
      .reduce((obj, key) => {
        obj[key] = mandachord.notes[key];
        return obj;
      }, {})
);

export const selectActiveNotes = createSelector(
  mandachordSelector,
  mandachord =>
    Object.keys(mandachord.notes)
      .filter(noteId => mandachord.notes[noteId].isActive)
      .reduce((obj, key) => {
        obj[key] = mandachord.notes[key];
        return obj;
      }, {})
);

export const selectActiveNotesAsAudioSprites = createSelector(
  selectActiveNotes,
  activeNotes =>
    Object.keys(activeNotes).reduce((obj, key) => {
      const notePos = key.match(noteRegex).groups.note;
      obj[key] = getAudioSpriteForNote('horos', notePos); // horos hardcoded for now
      return obj;
    }, {})
);

export const selectNotesByStep = step =>
  createSelector(
    mandachordSelector,
    mandachord =>
      Object.keys(mandachord.notes)
        .filter(noteId => noteId.match(noteRegex).groups.step === step)
        .reduce((obj, key) => {
          obj[key] = mandachord.notes[key];
          return obj;
        }, {})
  );

export const selectActiveNotesByCurrentStep = createSelector(
  mandachordSelector,
  selectNotesInCurrentStep,
  (mandachord, currentStep) => {
    // console.log(activeNotesByStep(currentStep));
    const currentActiveNotesByStep = getActiveNotesInStep(
      mandachord,
      currentStep
    );
    return Object.keys(currentActiveNotesByStep).reduce((obj, key) => {
      obj[key] = currentActiveNotesByStep[key];
      return obj;
    }, {});
  }
);
