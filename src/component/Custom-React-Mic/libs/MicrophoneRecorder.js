import AudioContext from './AudioContext'
import { getParameter } from 'services/electron-storage.service'
import MediaStreamRecorder from 'msr'
import { Recorder } from './vmsg'
// import wasmURL from './vmsg.wasm';

let analyser
let audioCtx
let mediaRecorder
let chunks = []
let startTime
let stream
let mediaOptions
// let blobObject;
let onStartCallback
let onStopCallback
let onSaveCallback
let onDataCallback
let timeInterval
const shimURL = 'https://unpkg.com/wasm-polyfill.js@0.2.0/wasm-polyfill.js'
const wasmURL = 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

export class MicrophoneRecorder {
  constructor(onStart, onStop, onSave, onData, options) {
    onStartCallback = onStart
    onStopCallback = onStop
    onSaveCallback = onSave
    onDataCallback = onData
    mediaOptions = options
  }

  startRecording = async () => {
    // console.log('startRecording')
    startTime = Date.now()

    if (mediaRecorder) {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume()
      }

      if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume()
        return
      }

      if (audioCtx && mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start(10)
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)
        if (onStartCallback) {
          onStartCallback()
        }
      }
    } else {
      if (navigator.mediaDevices) {
        // console.log('getUserMedia supported.')
        const devices = await navigator.mediaDevices.enumerateDevices()
        const selectedDevice = devices.filter(device => {
          return device.label === getParameter('microphoneSelection')
        })
        if (selectedDevice && selectedDevice[0] && selectedDevice[0].deviceId) {
          const constraints = {
            audio: { deviceId: { exact: selectedDevice[0].deviceId } },
          }
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(str => {
              stream = str

              mediaRecorder = new MediaStreamRecorder(str)
              mediaRecorder.mimeType = mediaOptions.mimeType
              mediaRecorder.bufferSize = mediaOptions.bufferSize
              mediaRecorder.sampleRate = mediaOptions.sampleRate

              if (onStartCallback) {
                onStartCallback()
              }

              mediaRecorder.onstop = this.onStop
              mediaRecorder.ondataavailable = blob => {
                if (onDataCallback) {
                  onDataCallback()
                }
                if (blob) {
                  chunks.push(blob)
                  if (onDataCallback) {
                    onDataCallback(blob)
                  }
                }
              }

              audioCtx = AudioContext.getAudioContext()
              audioCtx.resume().then(() => {
                // analyser = AudioContext.getAnalyser()
                mediaRecorder.start(10)
                const sourceNode = audioCtx.createMediaStreamSource(stream)
                // sourceNode.connect(analyser)
              })
            })
            .catch(error => console.log(JSON.stringify(error, 2, null)))
        }
      } else {
        alert('Your browser does not support audio recording')
      }
    }
  }

  stopRecording() {
    // console.log('stopRecording')
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()

      stream.getAudioTracks().forEach(track => {
        track.stop()
      })
      mediaRecorder = null
      // AudioContext.resetAnalyser()
    }
  }

  onStop(evt) {
    const blob = new Blob(chunks, { type: mediaOptions.mimeType })
    chunks = []

    const blobObject = {
      blob: blob,
      startTime: startTime,
      stopTime: Date.now(),
      options: mediaOptions,
      blobURL: window.URL.createObjectURL(blob),
    }

    if (onStopCallback) {
      onStopCallback(blobObject)
    }
    if (onSaveCallback) {
      onSaveCallback(blobObject)
    }
  }
}

export class MicrophoneRecorderMp3 {
  constructor(onStart, onStop, onSave, onData, options) {
    onStartCallback = onStart
    onStopCallback = onStop
    onSaveCallback = onSave
    onDataCallback = onData
    mediaOptions = options
  }

  startRecording = async () => {
    startTime = Date.now()

    if (mediaRecorder) {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume()
      }

      if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume()
        return
      }

      if (audioCtx && mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start(10)
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)
        if (onStartCallback) {
          onStartCallback()
        }
      }
    } else if (navigator.mediaDevices) {
      // console.log('getUserMedia supported.');
      const devices = await navigator.mediaDevices.enumerateDevices()
      const selectedDevice = devices.filter(device => {
        return device.label === getParameter('microphoneSelection')
      })
      if (selectedDevice && selectedDevice[0] && selectedDevice[0].deviceId) {
        const constraints = {
          audio: { deviceId: { exact: selectedDevice[0].deviceId } },
        }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(async str => {
            stream = str
            const { recorderParams } = mediaOptions
            mediaRecorder = new Recorder({
              wasmURL,
              shimURL,
              ...recorderParams,
            })

            try {
              await mediaRecorder.init()

              if (onStartCallback) {
                onStartCallback()
              }

              audioCtx = AudioContext.getAudioContext()
              audioCtx.resume().then(() => {
                // analyser = AudioContext.getAnalyser();
                mediaRecorder.startRecording()
                if (onDataCallback) {
                  timeInterval = setInterval(onDataCallback, 10)
                }
                const sourceNode = audioCtx.createMediaStreamSource(stream)
                // sourceNode.connect(analyser);
              })
            } catch (error) {
              // console.log(JSON.stringify(error, 2, null))
            }
          })
          .catch(error => console.log(JSON.stringify(error, 2, null)))
      }
    } else {
      alert('Your browser does not support audio recording')
    }
  }

  stopRecording(blob) {
    if (mediaRecorder) {
      mediaRecorder.stopTracks()
      // AudioContext.resetAnalyser();
      this.onStop()
    }
  }

  async onStop() {
    try {
      const blob = await mediaRecorder.stopRecording()

      const blobObject = {
        blob,
        startTime,
        stopTime: Date.now(),
        options: mediaOptions,
        blobURL: window.URL.createObjectURL(blob),
      }

      mediaRecorder.close()
      mediaRecorder = null
      clearInterval(timeInterval)

      if (onStopCallback) {
        onStopCallback(blobObject)
      }
      if (onSaveCallback) {
        onSaveCallback(blobObject)
      }
    } catch (error) {
      // console.log('onStop', JSON.stringify(error, 2, null))
    }
  }
}
