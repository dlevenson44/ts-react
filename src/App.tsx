import React, { FunctionComponent, useState } from 'react';
import './App.css';
import Button from './components/Button';

const App:FunctionComponent<{ initial?: number }> = ({ initial = 0}) => {
  const [counter, setCounter] = useState(initial);
  return(
    <div className="App">
      <p>TypeScript Counter with Hooks</p>
      {counter}
      <Button title="Increase Count" clicker={() => setCounter(counter + 1)} />
      <Button title="Decrease Count" clicker={() => setCounter(counter - 1)} />
    </div>
  )
}

export default App;
