import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MyTrips from './Components/MyTrips';
import Bookings from './Components/Bookings';
// import Contact from './Components/Contact';
import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/auth'; 

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
      tourListUpdatedAvailability: [],
      userLoggedIn: false,
      currentUserId: '',
      currentUserName: ''
    }

    this.updateAvailability = this.updateAvailability.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    // object is loaded before components mounts because information inside the object is required to render homepage
    const originalTourList = [
      {
        "url": "../assets/TORONTO.jpg",
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
        "url": "../assets/LONDON.jpg",
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
        "url": "../assets/ROME.jpg",
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
        "url": "../assets/BANGKOK.jpg",
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
        "url": "../assets/PHIPHI.jpg",
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
        "url": "../assets/BEIJING.jpg",
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
        "url": "../assets/PARIS.jpg",
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
    const dbRefOrig = firebase.database().ref('tours-original')
    let dbRefUpdated = firebase.database().ref('tours-updated-availability')

    // checking to see if there is a tour object in tours-original
    // if yes, end the loop
    // if no, create a tours-original and tours-updated object in firebase and push the original array from state into it
    dbRefOrig.on('value', snapshot => {
      if (snapshot.exists()) {
        return ;
      }

      else {
        dbRefOrig.push(this.state.tourListToRender)
        dbRefUpdated.push(this.state.tourListToRender)
      }
    })

    // an empty array container for the firebase updated array to go into
    let currentTours = []

    // checking to see if there is a tour-updated object
    // if yes, push all the information from the firebase object to state to render the bookings page properly
    dbRefUpdated.on('value', snapshot => {
      const data = snapshot.val();
      if(snapshot.exists()) {
        for (let key in data) {
          currentTours.push(data[key])
        }
        this.setState({
          tourListUpdatedAvailability: currentTours
        })
      }
    })

    // let dbRefUser = firebase.database().ref(`users/${user.uid}`)

    // const users = {}

    // dbRefUser.on('value', snapshot => {
    //   if(snapshot.exists()) {
    //     console.log('exists bra')
    //     return;
    //   }
    //   else {
    //     console.log('doesnt exist bra')
    //     dbRefUsers.push()

    //   }
    // })

  }

  
  loginWithGoogle() {
    console.log('logged in')
    
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    auth.signInWithPopup(provider)
      .then(res => {
        console.log(res.user.uid, res.user.displayName)
        this.setState({
          userLoggedIn: true,
          currentUserId: res.user.uid,
          currentUserName: res.user.displayName
        })
      })
  }

  logout() {
    console.log('logged out')
    const auth = firebase.auth();
    auth.signOut()
      .then(() => {
        this.setState({
          currentUserId: '',
          currentUserName: '',
          userLoggedIn: false
        })
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

    const dbRef = firebase.database().ref('tours-updated-availability')

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
              
              <NavBar 
                userLoggedIn={this.state.userLoggedIn}
                login={this.loginWithGoogle}
                logout={this.logout}
              />

            <Route exact path="/" render={() => {
                return (
                  <Home 
                    tourList={this.state.tourListToRender}
                  />
                )
              }} />
              
              <Route path="/myTrips" exact render={() => {
                return (
                  <MyTrips />
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
              {/* <Route path="/blog" exact render={() => {
                return (
                  <Blog />
                )
              }} />
              <Route path="/contact" exact render={() => {
                return (
                  <Contact />
                )
              }} /> */}
              
              <Footer />

            </div>
        </Router>
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
