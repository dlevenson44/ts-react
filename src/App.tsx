import React, { FunctionComponent, useState } from 'react';
import './App.css';

const App:FunctionComponent<{ initial?: number }> = ({ initial = 0}) => {
  const [counter, setCounter] = useState(initial);
  return(
    <div className="App">
      <p>TypeScript Counter with Hooks</p>
      {counter}
    </div>
  )
}

export default App;
