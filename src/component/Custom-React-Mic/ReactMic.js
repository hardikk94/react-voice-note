import React, { Component } from 'react'
import { string, number, bool, func, oneOf, object } from 'prop-types'
import {
  MicrophoneRecorder,
  MicrophoneRecorderMp3,
} from './libs/MicrophoneRecorder'
// import AudioContext           from './libs/AudioContext';
import AudioPlayer from './libs/AudioPlayer'
// import Visualizer from './libs/Visualizer'

export default class ReactMic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      microphoneRecorder: null,
      // canvas: null,
      // canvasCtx: null,
    }
  }

  componentDidMount() {
    const {
      onSave,
      onStop,
      onStart,
      onData,
      audioElem,
      audioBitsPerSecond,
      mimeType,
      bufferSize,
      recorderParams,
      sampleRate,
    } = this.props
    // const { visualizer } = this.refs
    // const canvas = visualizer
    // const canvasCtx = canvas.getContext('2d')
    const options = {
      audioBitsPerSecond: audioBitsPerSecond,
      mimeType: mimeType,
      bufferSize: bufferSize,
      sampleRate: sampleRate,
      recorderParams: recorderParams,
    }

    if (audioElem) {
      AudioPlayer.create(audioElem)

      // this.setState(
      //   {
      //     canvas: canvas,
      //     canvasCtx: canvasCtx,
      //   },
      //   () => {
      //     this.visualize()
      //   }
      // )
    } else {
      const Recorder =
        this.props.mimeType === 'audio/mp3'
          ? MicrophoneRecorderMp3
          : MicrophoneRecorder
      this.setState(
        {
          microphoneRecorder: new Recorder(
            onStart,
            onStop,
            onSave,
            onData,
            options
          ),
          // canvas: canvas,
          // canvasCtx: canvasCtx,
        }
        // () => {
        //   this.visualize()
        // }
      )
    }
  }

  // visualize = () => {
  //   // const self = this;
  //   const {
  //     backgroundColor,
  //     strokeColor,
  //     width,
  //     height,
  //     visualSetting,
  //   } = this.props
  //   const { canvas, canvasCtx } = this.state

  //   if (visualSetting === 'sinewave') {
  //     Visualizer.visualizeSineWave(
  //       canvasCtx,
  //       canvas,
  //       width,
  //       height,
  //       backgroundColor,
  //       strokeColor
  //     )
  //   } else if (visualSetting === 'frequencyBars') {
  //     Visualizer.visualizeFrequencyBars(
  //       canvasCtx,
  //       canvas,
  //       width,
  //       height,
  //       backgroundColor,
  //       strokeColor
  //     )
  //   } else if (visualSetting === 'frequencyCircles') {
  //     Visualizer.visualizeFrequencyCircles(
  //       canvasCtx,
  //       canvas,
  //       width,
  //       height,
  //       backgroundColor,
  //       strokeColor
  //     )
  //   }
  // }

  clear() {
    // const { width, height } = this.props
    // const { canvasCtx } = this.state
    // canvasCtx.clearRect(0, 0, width, height)
  }

  render() {
    const { record, onStop, width, height } = this.props
    // eslint-disable-next-line
    const { microphoneRecorder, canvasCtx } = this.state

    if (record) {
      if (microphoneRecorder) {
        microphoneRecorder.startRecording()
      }
    } else {
      if (microphoneRecorder) {
        microphoneRecorder.stopRecording(onStop)
        this.clear()
      }
    }
    return null

    // return (
    //   <canvas
    //     ref="visualizer"
    //     height={height}
    //     width={width}
    //     className={this.props.className}
    //   ></canvas>
    // )
  }
}

ReactMic.propTypes = {
  backgroundColor: string,
  strokeColor: string,
  className: string,
  audioBitsPerSecond: number,
  mimeType: string,
  height: number,
  record: bool.isRequired,
  onStop: func,
  onData: func,
  bufferSize: oneOf([0, 256, 512, 1024, 2048, 4096, 8192, 16384]),
  sampleRate: number,
  recorderParams: object,
}

ReactMic.defaultProps = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: '#000000',
  className: 'visualizer',
  audioBitsPerSecond: 128000,
  mimeType: 'audio/wav',
  record: false,
  width: 640,
  height: 100,
  visualSetting: 'sinewave',
  recorderParams: {},
}
