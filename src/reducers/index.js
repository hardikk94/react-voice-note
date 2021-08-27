import { combineReducers } from "redux";
import VoiceNotes from './voicenote-reducer';
import player from './player-reducer';


const voiceNoteReducer = combineReducers({
    VoiceNotes,
    player,
});

export default voiceNoteReducer;
