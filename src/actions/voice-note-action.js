import * as type from '../constant/index';
export const voiceNoteListRequest = (data,dispatch) => {
    dispatch({
        type: type.VOICE_LIST_REQUESTED,
        payload : {
            ...data
            }
        })    
    }


export const voiceNoteAdd = (data,dispatch) => {
    dispatch({
        type: type.VOICE_ADD_REQUESTED,
        payload : {
            ...data
            }
        })    
    }

export const voiceNoteDelete = (data,dispatch) => {
    dispatch({
        type: type.VOICE_DELETE_REQUESTED,
        payload : {
            ...data
            }
        })    
    }