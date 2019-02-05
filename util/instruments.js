import { BASS, MELODY, PERCUSSION } from '../state/constants';

export const getInstrumentFromPosition = position => {
  // position is along the vertical axis of the mandachord
  // 0 < position < 5 = melody
  // 5 <= position < 10 = bass
  // 10 <= position < 13 = percussion
  if (position >= 0 && position < 5) {
    return MELODY;
  } else if (position >= 5 && position < 10) {
    return BASS;
  } else if (position >= 10 && position < 13) {
    return PERCUSSION;
  }
};

export const getInstrumentNoteFromPosition = position => {
  const instrument = getInstrumentFromPosition(position);

  switch (instrument) {
    case MELODY:
      return position + 1;

    case BASS:
      return position - 5 + 1;

    case PERCUSSION:
      return position - 10 + 1;
  }
};
