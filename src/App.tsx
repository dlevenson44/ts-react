import React from 'react';
import './App.css';
import Title from './components/Title';

type AppProps = { message: string }

// JSX vs TSX in action
// const App = ({ message }) => <div className="App">{message}</div>
const App: React.SFC<AppProps> = ({ message }) => (
  <div className="App">
    <Title title={message} />  
  </div>
);

export default App;
