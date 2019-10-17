// import { Howl, Howler } from 'howler';
import { Player } from 'tone';

// import HorosInstruments from '../assets/sounds/Horos_Instrument_Pack.mp3';

const generateSprites = () => {
  const horosSource = '/static/Horos_Instrument_Pack.mp3';

  const horosPlayers = {
    'MELODY-1': new Player(horosSource).toMaster(),
    'MELODY-2': new Player(horosSource).toMaster(),
    'MELODY-3': new Player(horosSource).toMaster(),
    'MELODY-4': new Player(horosSource).toMaster(),
    'MELODY-5': new Player(horosSource).toMaster(),
    'BASS-1': new Player(horosSource).toMaster(),
    'BASS-2': new Player(horosSource).toMaster(),
    'BASS-3': new Player(horosSource).toMaster(),
    'BASS-4': new Player(horosSource).toMaster(),
    'BASS-5': new Player(horosSource).toMaster(),
    'PERCUSSION-1': new Player(horosSource).toMaster(),
    'PERCUSSION-2': new Player(horosSource).toMaster(),
    'PERCUSSION-3': new Player(horosSource).toMaster()
  };

  // change properties of each sprite to make sure they play the right part of the mp3
  const horosSprites = Object.keys(horosPlayers).reduce((acc, key, i) => {
    const playSprite = startTime => {
      horosPlayers[key].start(startTime, i, 0.9);
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
