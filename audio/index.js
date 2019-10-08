import { Howl, Howler } from 'howler';

// import HorosInstruments from '../assets/sounds/Horos_Instrument_Pack.mp3';

const HorosInstruments = '/static/Horos_Instrument_Pack.mp3';

Howler.volume = 1.0;

const horosTimings = {
  'MELODY-1': [360, 700],
  'MELODY-2': [1035, 2030],
  'MELODY-3': [2035, 3030],
  'MELODY-4': [3035, 4030],
  'MELODY-5': [4035, 5030],
  'BASS-1': [5035, 6030],
  'BASS-2': [6035, 7030],
  'BASS-3': [7035, 8030],
  'BASS-4': [8035, 9030],
  'BASS-5': [9035, 10030],
  'PERCUSSION-1': [10035, 11030],
  'PERCUSSION-2': [11035, 12030],
  'PERCUSSION-3': [12035, 13000]
};

const HOROS = new Howl({
  src: [HorosInstruments],
  sprite: horosTimings
});

HOROS.play('MELODY-1');

export default {
  horos: HOROS
};
