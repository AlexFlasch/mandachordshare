import { createSelector } from 'reselect';

import { MILLISECONDS_PER_NOTE } from '../constants';

// this regex will help us grab the step and note position of each note in the state
// since notes are stored in a flat object with each note having a key of `<step>:<note>`
const noteRegex = /(?<step>\d*):(?<note>\d*)/;

export const mandachordSelector = state => state.mandachord;

// export const selectCurrentStep = createSelector(
//   mandachordSelector,
//   mandachord =>
//     Object.keys(mandachord.notes)
//       .filter(
//         noteId =>
//           noteId.match(noteRegex).groups.step ===
//           Math.floor(mandachord.playbackTime / MILLISECONDS_PER_NOTE)
//       )
//       .reduce((obj, key) => {
//         obj[key] = mandachord.notes[key];
//         return obj;
//       }, {})
// );

export const selectCurrentStep = createSelector(
  mandachordSelector,
  mandachord => {
    const keys = Object.keys(mandachord.notes);
    const currentNotes = keys.filter(
      noteId =>
        parseInt(noteId.match(noteRegex).groups.step, 10) ===
        Math.floor(mandachord.playbackTime / MILLISECONDS_PER_NOTE)
    );
    const returnObj = currentNotes.reduce((obj, key) => {
      obj[key] = mandachord.notes[key];
      return obj;
    }, {});
    return returnObj;
  }
);

// export const selectNotesByStep = step =>
//   createSelector(
//     mandachordSelector,
//     mandachord =>
//       Object.keys(mandachord.notes)
//         .filter(noteId => noteId.match(noteRegex).groups.step === step)
//         .reduce((obj, key) => {
//           obj[key] = mandachord.notes[key];
//           return obj;
//         }, {})
//   );

export const selectNotesByStep = step =>
  createSelector(
    mandachordSelector,
    mandachord => {
      const keys = Object.keys(mandachord.notes);
      const currentNotes = keys.filter(
        noteId => noteId.match(noteRegex).groups.step === step
      );
      const currentNotesObj = currentNotes.reduce((obj, key) => {
        obj[key] = mandachord.notes[key];
        return obj;
      }, {});

      return currentNotesObj;
    }
  );

export const selectActiveNotesByStep = step =>
  createSelector(
    selectNotesByStep(step),
    notesByStep =>
      Object.keys(notesByStep)
        .filter(note => notesByStep[note].isActive)
        .reduce((obj, key) => {
          obj[key] = notesByStep.notes[key];
          return obj;
        }, {})
  );

// export const selectActiveNotesByCurrentStep = createSelector(
//   selectNotesByStep(selectCurrentStep),
//   currentNotesByStep =>
//     Object.keys(currentNotesByStep)
//       .filter(note => currentNotesByStep[note].isActive)
//       .reduce((obj, key) => {
//         debugger;
//         obj[key] = currentNotesByStep[key];
//         return obj;
//       }, {})
// );

export const selectActiveNotesByCurrentStep = createSelector(
  selectCurrentStep,
  currentNotesByStep => {
    const keys = Object.keys(currentNotesByStep);
    const currentActiveNotes = keys.filter(
      note => currentNotesByStep[note].isActive
    );
    const activeNotesObj = currentActiveNotes.reduce((obj, key) => {
      obj[key] = currentNotesByStep[key];
      return obj;
    }, {});

    return activeNotesObj;
  }
);
