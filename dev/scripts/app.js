import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar'
import Header from './Components/Header'
import PopularDest from './Components/PopularDest'
import WhyChooseUs from './Components/WhyChooseUs'
import Reviews from './Components/Reviews'
import Information from './Components/Information'
import Newsletter from './Components/Newsletter'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Header />
        <PopularDest />
        <WhyChooseUs />
        <Reviews />
        <Information />
        <Newsletter />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
