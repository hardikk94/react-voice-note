import { MicrophoneRecorderMp3 } from './mp3-mic';
import audioURL from './../connected.wav';

export class AudioDetail {
    AudioRecordingLimit = 30
    mp3MicRecorder = null
    intervalCallback = null
    constructor() {
        this.mp3MicRecorder = new MicrophoneRecorderMp3();
    }

    startRecording = async () => {
        console.log('<=== start recording ===> ')
        this.mp3MicRecorder.startRecording();
        this.setPlayerInterval()
    }

    setPlayerInterval = async () => {
        //console.log('<=== setPlayerInterval start here ===> ')
        this.timerCount = 0       
        if (this.intervalCallback === null) {
            //console.log('<=== interval null here ===> ')            
            const sound = new Audio(audioURL)
            sound.play()
            this.intervalCallback = setInterval(async () => {
                console.log('<=== Timer is : ===> ', this.timerCount)
                if (this.timerCount >= this.AudioRecordingLimit) {
                    await this.stopRecording()
                    this.startRecording()
                } else {
                    this.timerCount++
                }
            }, 1000)
        }
    }


    stopRecording = async () => {
        console.log('<=== stop recording ===> ')
        let data = await this.mp3MicRecorder.stopRecording()
        this.clearAudioRecorderInterval()
        this.onStopHandler(data)
        return true
    }

    clearAudioRecorderInterval = () => {      
        if (this.intervalCallback) {
            clearInterval(this.intervalCallback)
            this.intervalCallback = null
        }
    }


    onStopHandler = async (recordedBlob) => {
        if (this.timerCount > 1) {
            var audio = new FormData()
            audio.append('file', recordedBlob.blob)
            audio.append('type', 'AUDIO')
            audio.append(
                'duration',
                this.timerCount > this.AudioRecordingLimit
                    ? this.AudioRecordingLimit
                    : this.timerCount
            )
        }
    }
}

export default  new AudioDetail();
