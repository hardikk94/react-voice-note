import { Route } from 'react-router-dom';
import VoiceRecorder from './container/voice-recorder/voice-recorder';
import VoiceNotesList from './container/voice-note-list/voice-note-list';
import Header from './component/header/header';
import './App.css';
function App() {
  return (
    <div className="voice_main_wrapper">
      <Header />
      <Route path="/voice-recorder">
        <VoiceRecorder />
      </Route>
      <Route path="/voice-list">
        <VoiceNotesList />
      </Route>
      React Voice note
    </div>
  );
}

export default App;
