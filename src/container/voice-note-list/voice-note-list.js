import {useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import './voice-note-list.scss';
import VoiceNoteView from './../../component/voiceNoteView/voice-note-view';
import { voiceNoteListRequest } from '../../actions/voice-note-action'

const VoiceNotesList = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.voiceNotes.voiceNoteList)
    useEffect(() => {
        voiceNoteListRequest(dispatch)
    },[])
    return (
        <div className="voice_list_wrapper">
            {
                list.map((notes) => {
                    return (
                        <VoiceNoteView                        
                            notes={notes}
                            key={notes.id}
                      />
                    )
                })
            }
        </div>
    )
}

export default VoiceNotesList