import { createSelector } from 'reselect';

const mandachordSelector = state => state.mandachord;

const selectNotesByStep = step =>
  createSelector(
    mandachordSelector,
    mandachord =>
      Object.keys(mandachord.notes)
        .filter(noteId => noteId[0] === step)
        .reduce((obj, key) => {
          obj[key] = mandachord.notes[key];
          return obj;
        }, {})
  );

const selectActiveNotesByStep = step =>
  createSelector(
    selectNotesByStep,
    notesByStep => notesByStep.filter(note => note.isActive)
  );
