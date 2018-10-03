import { inspect } from 'util';
import initialState from '../store/initial-state';
import {
    PLAY_PAUSE
} from '../action-types';

export default (prevState = initialState, action) => {
    console.log(`action: ${inspect(action)}`);
    switch (action.type) {
        case PLAY_PAUSE:
            console.log(`prevState: ${inspect(prevState)}`);
            console.log(`payload: ${inspect(action.payload)}`);
            return { ...prevState, isPaused: action.payload };
        default:
            return prevState;
    }
}