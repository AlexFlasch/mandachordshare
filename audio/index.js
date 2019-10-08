import { Howl, Howler } from 'howler';

// import HorosInstruments from '../assets/sounds/Horos_Instrument_Pack.mp3';

const generateSprites = () => {
  const HorosInstruments = '/static/Horos_Instrument_Pack.mp3';

  Howler.volume = 1.0;

  const horosTimings = {
    'MELODY-1': [0, 900],
    'MELODY-2': [1000, 900],
    'MELODY-3': [2000, 900],
    'MELODY-4': [3000, 900],
    'MELODY-5': [4000, 900],
    'BASS-1': [5000, 900],
    'BASS-2': [6000, 900],
    'BASS-3': [7000, 900],
    'BASS-4': [8000, 900],
    'BASS-5': [9000, 900],
    'PERCUSSION-1': [10000, 900],
    'PERCUSSION-2': [11000, 900],
    'PERCUSSION-3': [12000, 900]
  };

  const HOROS = new Howl({
    src: [HorosInstruments],
    sprite: horosTimings
  });

  return {
    horos: HOROS
  };
};

export default (process.browser ? generateSprites() : {});
