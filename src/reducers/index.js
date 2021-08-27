import { combineReducers } from "redux";
import voiceNotes from './voicenote-reducer';
import player from './player-reducer';


const reducer = combineReducers({
    voiceNotes,
    player,
});

export default reducer;
