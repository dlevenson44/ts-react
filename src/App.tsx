import React from 'react';
import './App.css';
import Title from './components/Title';

// JSX vs TSX in action
// const App = ({ message }) => <div className="App">{message}</div>
const App: React.SFC<{ message: string }> = ({ message }) => (
  <div className="App">
    <Title title={message} />  
  </div>
);

export default App;
