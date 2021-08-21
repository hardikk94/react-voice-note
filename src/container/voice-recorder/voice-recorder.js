import './voice-recorder.scss';
const VoiceRecorder = () => {
    return (
        <div className="voice_recorder_wrapper">
            <div className="voice_form">
                <div className="title">
                    <div className="first_part">Speak up your ideas</div>
                    <div className="second_part">Add your voice note and share to your friends</div>
                </div>
                <input type="text" placeholder="Your voice note name here..." name="voiceNote" id="voiceNote" className="txt_input" />
                <div className="btn_row_recorder">
                    <button type="button" className="btn btn_record" name="btn_record" id="btn_record">Start Recording</button>
                    <button type="submit" className="btn btn_submit" name="btn_submit" id="btn_submit">Submit Note</button>
                </div>                
            </div>
        </div>

    )
}

export default VoiceRecorder