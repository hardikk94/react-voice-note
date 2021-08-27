import {useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import './voice-note-list.scss';
import VoiceNoteView from './../../component/voiceNoteView/voice-note-view';
import { voiceNoteListRequest } from '../../actions/voice-note-action'
import { useHistory } from "react-router-dom";
const VoiceNotesList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const list = useSelector((state) => state.voiceNotes.voiceNoteList)
    const isLoading = useSelector((state) => state.voiceNotes.isLoading)
    useEffect(() => {
        voiceNoteListRequest(dispatch)
    },[])

    const backToRecorder = () =>{
        history.push("/voice-recorder")
    }

    return (
        <div className="voice_list_wrapper">
            { list && list.length > 0 ? (
                list.map((notes) => {
                    return (
                        <VoiceNoteView                        
                            notes={notes}
                            key={notes.id}
                      />
                    )
                })
            ) : (
                <div className="no-list">
                    <span>No Voice Notes here...!! <input type="button" value="Back" id="back" name="back" className="btn_back" onClick={backToRecorder} /></span>
                </div>
            )                
        }
        </div>
    )
}

export default VoiceNotesList