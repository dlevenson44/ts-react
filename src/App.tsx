import React from 'react';
import './App.css';
import Title from './components/Title';
import Button from './components/Button';

// JSX vs TSX in action
// const App = ({ message }) => <div className="App">{message}</div>
// const App: React.SFC<AppProps> = ({ message }) => (
//   <div className="App">
//     <Title title={message} />  
//   </div>
// );

type AppProps = { message: string }
type AppState = { counter: number, increaseTitle: string, decreaseTitle: string }
class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      counter: 0,
      increaseTitle: "Increase Count",
      decreaseTitle: "Decrease Count"
    }
  }
  increment = () => {
    this.setState({
      counter: (this.state.counter + 1)
    })
  }
  decrement = () => {
    this.setState({
      counter: (this.state.counter - 1)
    })
  }
  render() {
    return(
      <div className="App">
        <Title title={this.props.message} />
        <Title title={this.state.counter} />
        <Button title={this.state.increaseTitle} clicker={this.increment} />
        <Button title={this.state.decreaseTitle} clicker={this.decrement} />
      </div>
    );
  }
}

export default App;
