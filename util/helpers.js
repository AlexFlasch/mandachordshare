import audioSprites from '../audio/audio-sprites';

// this regex will help us grab the step and note position of each note in the state
// since notes are stored in a flat object with each note having a key of `<step>:<note>`
export const noteRegex = /(?<step>\d*):(?<note>\d*)/;
const instrumentRegex = /(?<instrument>.*)-/;

export const getAudioSpriteForNote = (instrument, notePos) => {
  // hardcode horos instrument for now, as that's the only properly recorded instrument pack
  instrument = 'horos';

  return Object.keys(audioSprites[instrument]._sprite)[notePos];
};

export const getInstrumentTypeForNote = note => {
  return note.match(instrumentRegex).groups.instrument;
};

export const playAudioSpriteForNote = (instrument, sprite) => {
  // hardcode horos instrument for now, as that's the only properly recorded instrument pack
  instrument = 'horos';

  audioSprites[instrument].play(sprite);
};
