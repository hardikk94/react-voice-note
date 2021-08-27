import * as type from '../constant';
const initialState = {
   isPlaying:false,
   player:null,
   error:null
};

const Player = (state = initialState,action) => {
    switch(action.type) {      
        // add voice list
        case type.PLAYER_TOGGLE_REQUESTED: {
            return {
                ...state,    
                isPlaying:false,                                     
            };
        }
        case type.PLAYER_TOGGLE_COMPLETED: {
            return {
                ...state,   
                isPlaying:true,                        
                player: action.payload.player,                                            
            };
        }
        case type.PLAYER_TOGGLE_ERROR:{
            return {
                ...state,   
                isPlaying:false,                    
                error: action.payload.error,                                            
            };
        }
        default:
            return state;
    }
}

export default Player
