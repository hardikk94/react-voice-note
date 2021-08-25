import './voice-note-list.scss';
import VoiceNoteView from './../../component/voiceNoteView/voice-note-view';
export const voiceNotesList = [{
    id:1,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},{
    id:2,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},{
    id:3,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},{
    id:4,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},
{
    id:4,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},
{
    id:4,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},
{
    id:4,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
},
{
    id:4,
    url:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    note:"test notes 1"
}]

const VoiceNotesList = () => {
    return (
        <div className="voice_list_wrapper">
            {
                voiceNotesList.map((notes) => {
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