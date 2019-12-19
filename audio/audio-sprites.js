// import { Howl, Howler } from 'howler';
import { Player } from 'tone';

// import HorosInstruments from '../assets/sounds/Horos_Instrument_Pack.mp3';

const generateSprites = () => {
  const horosSource = '/static/Horos_Instrument_Pack.mp3';

  const horosPlayer = new Player(horosSource).toMaster();

  // change properties of each sprite to make sure they play the right part of the mp3
  const horosSprites = [...new Array(13)].reduce((acc, key, i) => {
    const playSprite = startTime => {
      // the @ in the offset quantizes the note to the Transport grid
      horosPlayer.start(startTime, `@${i}`, 0.9);
    };
    return {
      ...acc,
      [key]: playSprite
    };
  }, {});

  return {
    horos: horosSprites
  };
};

export default (process.browser ? generateSprites() : {});
