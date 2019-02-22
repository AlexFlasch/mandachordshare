import { createSelector } from 'reselect';

import { MILLISECONDS_PER_NOTE } from '../constants';

// this regex will help us grab the step and note position of each note in the state
// since notes are stored in a flat object with each note having a key of `<step>:<note>`
const noteRegex = /(?<step>\d*):(?<note>\d*)/;

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
    Object.keys(mandachord.notes)
      .filter(
        noteId =>
          parseInt(noteId.match(noteRegex).groups.step, 10) ===
          Math.floor(mandachord.playbackTime / MILLISECONDS_PER_NOTE)
      )
      .reduce((obj, key) => {
        obj[key] = mandachord.notes[key];
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
  selectCurrentStep,
  (mandachord, currentStep) => {
    // console.log(activeNotesByStep(currentStep));
    const currentActiveNotesByStep = getActiveNotesInStep(
      mandachord,
      currentStep
    );
    console.log(
      'returning: ',
      Object.keys(currentActiveNotesByStep).reduce((obj, key) => {
        obj[key] = currentActiveNotesByStep[key];
        return obj;
      }, {})
    );
    return Object.keys(currentActiveNotesByStep).reduce((obj, key) => {
      obj[key] = currentActiveNotesByStep[key];
      return obj;
    }, {});
  }
);
