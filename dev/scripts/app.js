import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './Components/About';
import Bookings from './Components/Bookings';
import Blog from './Components/Blog';
import Contact from './Components/Contact';
import firebase from 'firebase/app';
import 'firebase/database'; 

  const config = {
    apiKey: "AIzaSyDF29pfEggtDGM3G2u1_MxF6jb2QOxWha8",
    authDomain: "tour-company-template.firebaseapp.com",
    databaseURL: "https://tour-company-template.firebaseio.com",
    projectId: "tour-company-template",
    storageBucket: "tour-company-template.appspot.com",
    messagingSenderId: "1049169870939"
  };

  firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tourListToRender: [],
      tourListUpdatedAvailability: []
    }

    this.updateAvailability = this.updateAvailability.bind(this)
  }

  componentWillMount() {
    const originalTourList = [
      {
        "url": "../../../../assets/TORONTO.jpg",
        "city": "Toronto",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 0
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      },
      {
        "url": "../../../../assets/LONDON.jpg",
        "city": "London",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 0
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      },
      {
        "url": "../../../../assets/ROME.jpg",
        "city": "Rome",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 10
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      },
      {
        "url": "../../../../assets/BANGKOK.jpg",
        "city": "Bangkok",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 10
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      },
      {
        "url": "../../../../assets/PHIPHI.jpg",
        "city": "Koh Phi Phi",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 10
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      },
      {
        "url": "../../../../assets/BEIJING.jpg",
        "city": "Beijing",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 10
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      },
      {
        "url": "../../../../assets/PARIS.jpg",
        "city": "Paris",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum",
        "departures": {
          "2019": [
            {
              "date": "Jan 4, 2019",
              "availability": 5 
            },
            {
              "date": "Feb 14, 2019",
              "availability": 10
            },
            {
              "date": "March 9, 2019",
              "availability": 12
            }
          ]
        }
      }
    ]

    this.setState({
      tourListToRender: originalTourList
    })
  }

  componentDidMount() {
    const dbRef = firebase.database().ref()

    const currentTours = []

    dbRef.on('value', snapshot => {
      const data = snapshot.val()
      for (let key in data) {
        currentTours.push(data[key])
      }
    })

    this.setState({
      tourListUpdatedAvailability: currentTours
    })

  }
  
  updateAvailability(selectedDate, selectedCity) {
    
    const tourList = this.state.tourListUpdatedAvailability

    const updatedTourList = tourList.map(item => {
      const tourCities = item.city
      const tourDates = item.departures["2019"]

      if (tourCities === selectedCity) {
        for(let i = 0; i < tourDates.length; i++) {
          if (tourDates[i].date === selectedDate) {
            tourDates[i].availability = tourDates[i].availability - 1
          }
        }
        return item;
      }
      else {
        return item;
      }
    })

    const dbRef = firebase.database().ref()

    dbRef.set(updatedTourList)

    this.setState({
      tourListUpdatedAvailability: updatedTourList
    })

  }

  render() {
    return (
      <div>
        <Router>
            <div>
              
              <NavBar />

            <Route exact path="/" render={() => {
                return (
                  <Home 
                    tourList={this.state.tourListToRender}
                  />
                )
              }} />
              
              <Route path="/about" exact render={() => {
                return (
                  <About />
                )
              }} />
              <Route path="/bookings" exact render={() => {
                return (
                  <Bookings 
                    tourList={this.state.tourListUpdatedAvailability}
                    updateAvailability={this.updateAvailability}
                  />
                )
              }} />
              <Route path="/blog" exact render={() => {
                return (
                  <Blog />
                )
              }} />
              <Route path="/contact" exact render={() => {
                return (
                  <Contact />
                )
              }} />
              
              <Footer />

            </div>
        </Router>
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
