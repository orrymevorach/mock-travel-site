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
      currentUserName: '',
      currentUserUpcomingTrips: []
    }

    this.updateAvailability = this.updateAvailability.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.logout = this.logout.bind(this)
    this.addToMyTrips = this.addToMyTrips.bind(this)
    this.removeTrip = this.removeTrip.bind(this)
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
      else {
        dbRefUpdated.push(this.state.tourListToRender)
      }
    })

    // if user didnt log out before closing the page, log them back in automatically
    const auth = firebase.auth()
    
    auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid
        const displayName = user.displayName
        const dbRefUpcomingTrips = firebase.database().ref(`users/${userID}/upcomingTrips`)
        const upComingTripsArray = []
        
        // pushing existing items from upcoming trips in firebase to upcoming trips in state so that items will get rendered
        dbRefUpcomingTrips.on('value', snapshot => {
          const data = snapshot.val()
          for(let key in data) {
            upComingTripsArray.push(data[key])
          }
        })
        
        this.setState({
          userLoggedIn: true,
          currentUserId: userID,
          currentUserName: displayName,
          currentUserUpcomingTrips: upComingTripsArray
        })
      }
    })
  }

  
  loginWithGoogle() {
    
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    
    auth.signInWithPopup(provider)
    .then(res => {
      const userID = res.user.uid
      const displayName = res.user.displayName
      
      const dbRefUser = firebase.database().ref(`users/${userID}`)
      dbRefUser.on('value', snapshot => {
        const data = snapshot.val();

        if(snapshot.exists()) {
          
          this.setState({
            userLoggedIn: true,
            currentUserId: userID,
            currentUserName: displayName
          })
        }
        
        else {
          const user = {
            userID: userID,
            userName: displayName,
            upcomingTrips: {}
          }
          dbRefUser.push(user)
          
          this.setState({
            userLoggedIn: true,
            currentUserId: userID,
            currentUserName: displayName
          })

        }
      })

      const dbRefUpcomingTrips = firebase.database().ref(`users/${userID}/upcomingTrips`)
      dbRefUpcomingTrips.on('value', snapshot => {
        const data = snapshot.val()
        if (snapshot.exists()) {
          this.setState({
            currentUserUpcomingTrips: data
          })
        }
      })

    })
  }

  logout() {
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

  createNewAccount() {
    console.log('new account created')
    const provider = new firebase.auth.SignInWithEmailAndPassword(email, pasword)
    const auth = firebase.auth()
    // auth.signInWithPopup(provider)
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

  addToMyTrips(selectedCity, selectedDate) {
    const tourList = this.state.tourListUpdatedAvailability
    const currentTrips = this.state.currentUserUpcomingTrips

    const cityObjectWithSelectedDate = {
      cityObject: [],
      selectedDate: ''
    }
    
    const tripToAdd = tourList.filter(item => {
      if (item.city === selectedCity) {
        return true;
      }
      else {
        return false;
      }
    })

    cityObjectWithSelectedDate.selectedDate = selectedDate
    cityObjectWithSelectedDate.cityObject = tripToAdd[0]


    currentTrips.push(cityObjectWithSelectedDate)

    this.setState({
      currentUserUpcomingTrips: currentTrips
    })

    const currentUserID = this.state.currentUserId
    const dbRefUpcomingTrips = firebase.database().ref(`users/${currentUserID}/upcomingTrips`)

    dbRefUpcomingTrips.set(currentTrips)

  }

  removeTrip(keyToRemove) {
    const upComingTrips = this.state.currentUserUpcomingTrips
    
    const updatedUpcomingTrips = []
    
    upComingTrips.map((trip, i) => {
      
      if(i !== keyToRemove) {
        updatedUpcomingTrips.push(trip)
      }
    })
    

    this.setState({
      currentUserUpcomingTrips: updatedUpcomingTrips
    })


    const currentUserID = this.state.currentUserId
    firebase.database().ref(`users/${currentUserID}/upcomingTrips/${keyToRemove}`).remove()
    


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
                createNewAccount={this.createNewAccount}
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
                  <MyTrips 
                    upcomingTrips={this.state.currentUserUpcomingTrips}
                    userName={this.state.currentUserName}
                    removeTrip={this.removeTrip}
                    upcomingTrips={this.state.currentUserUpcomingTrips}
                    userLoggedIn={this.state.userLoggedIn}
                  />
                )
              }} />
              <Route path="/bookings" exact render={() => {
                return (
                  <Bookings 
                    tourList={this.state.tourListUpdatedAvailability}
                    updateAvailability={this.updateAvailability}
                    userLoggedIn={this.state.userLoggedIn}
                    addToMyTrips={this.addToMyTrips}
                    login={this.loginWithGoogle}
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
