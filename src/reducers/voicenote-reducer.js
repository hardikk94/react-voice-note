import * as type from '../constant';
const initialState = {
    success: false,
    isLoading: false,    
    voiceNoteList: [],
    error:null,    
};

const VoiceNotes = (state = initialState,action) => {
    switch(action.type) {
        // voice list
        case type.VOICE_LIST_REQUESTED: {            
            return {
                ...state,     
                success:false,           
                isLoading: true,                                         
            };
        }
        case type.VOICE_LIST_COMPLETED: {
            return {
                ...state,     
                success:true,           
                isLoading: false,   
                voiceNoteList:action.payload.voiceNoteList                             
            };
        }

        case type.VOICE_LIST_ERROR: {
            return {
                ...state,      
                success:true,                     
                isLoading: false,  
                error:action.payload.error                              
            };
        }

        // add voice list
        case type.VOICE_ADD_REQUESTED: {
            return {
                ...state,    
                success:false,                       
                isLoading: true,                                
            };
        }
        case type.VOICE_ADD_COMPLETED: {
            return {
                ...state,   
                success:true,                        
                isLoading: false,                                            
            };
        }

          // delete voice list
        case type.VOICE_DELETE_REQUESTED: {
            return {
                ...state,    
                success:false,                       
                isLoading: true,                                
            };
        }
        case type.VOICE_DELETE_COMPLETED: {
            return {
                ...state,   
                success:true,                        
                isLoading: false,                                            
            };
        }
        default:
            return state;
    }
}

export default VoiceNotes
