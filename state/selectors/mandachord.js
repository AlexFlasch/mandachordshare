import { createSelector } from 'reselect';

const getIsPaused = (state) => state.mandachord.isPaused;

const isPausedSelector = createSelector(
    [getIsPaused],
    (isPaused) => isPaused
);

export default isPausedSelector;