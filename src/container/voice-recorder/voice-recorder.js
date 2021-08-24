import './voice-recorder.scss';
import microphoneIcon from '../../assets/images/ico_voice_record_active.svg';
import toastService, { toastType } from '../../services/toast.service';
import audioService from '../../services/audio-servic';
import { useState } from 'react';
const VoiceRecorder = () => {
    const [isRecordingStarted, recordingStarted] = useState(false)

    const startRecording = () => {
        recordingStarted(true)
        audioService.startRecording();
        toastService.showToast("Recording Started", toastType.info)
    }

    const stopRecording = () => {
        recordingStarted(false)
        audioService.stopRecording();
        toastService.showToast("Recording Stopped", toastType.info)
    }

    const submitRecording = () => {
        toastService.showToast("hello", toastType.info)
    }

    return (
        <div className="voice_recorder_wrapper">
            <div className="voice_form">
                <div className="voice_form_title">
                    <div className="first_part">Speak up your ideas</div>
                    <div className="second_part">Add your voice note and share to your friends{audioService.getTimerCount()}</div>
                </div>
                <input type="text" placeholder="Your voice note name here..." name="voiceNote" id="voiceNote" className="txt_input" />
                <div className="btn_row_recorder">
                    <button type="button" className="btn btn_record" name="btn_record" id="btn_record" onClick={isRecordingStarted ? stopRecording : startRecording}>
                        <img className="img_recording" src={microphoneIcon} draggable="false" />{isRecordingStarted ? 'Stop Recording' : 'Start Recording'}</button>
                    <button type="submit" className="btn btn_submit" name="btn_submit" id="btn_submit" onClick={submitRecording}>Submit Note</button>
                </div>
            </div>
        </div>

    )
}

export default VoiceRecorder