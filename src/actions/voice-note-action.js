import * as type from '../constant/index';
import indexDBService from '../services/local-storage';
import toastService, { toastType } from '../services/toast.service';
export const voiceNoteListRequest = (dispatch) => {
    dispatch({type: type.VOICE_LIST_REQUESTED})
    const successCallback = (list) => {        
        setTimeout(() => {                           
                dispatch({ type: type.VOICE_LIST_COMPLETED,payload: {
                    voiceNoteList:list
                }})        
        }, 2000)
    }
    indexDBService.fetchVoiceNotes(successCallback)
}

export const voiceNoteAdd = (data, dispatch) => {
    dispatch({ type: type.VOICE_ADD_REQUESTED })
    const successCallback = (isAdded) => {
        setTimeout(() => {
            if (isAdded) {
                toastService.showToast("Voice note Added Successfully !!", toastType.info)
                dispatch({ type: type.VOICE_ADD_COMPLETED })
            } else {
                toastService.showToast("Voice note Added Successfully !!", toastType.info)
                dispatch({ type: type.VOICE_LIST_ERROR, payload: { error: "There some error in DB" } })
            }
        }, 2000)
    }
    indexDBService.createVoiceNotes(data.note, data.file, successCallback)
}

export const voiceNoteDelete = (data, dispatch) => {
    dispatch({
        type: type.VOICE_DELETE_REQUESTED,
        payload: {
            ...data
        }
    })
}