const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
// let analyser = audioCtx.createAnalyser()

const AudioContext = {
  getAudioContext() {
    return audioCtx
  },
}

export default AudioContext
