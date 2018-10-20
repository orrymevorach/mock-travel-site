import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar'
import Header from './Components/Header'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Header />
        {/* <Header />
        <Popular /> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
