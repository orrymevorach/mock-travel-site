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
      // used to render account info to nav bar
      userLoggedIn: false,
      // used to specify logout instructions, google vs. email
      userLoggedInWithGoogle: false,
      userLoggedInWithEmail: false,
      currentUserId: '',
      currentUserName: '',
      currentUserUpcomingTrips: [],
      // used to handle inputs and render information only when a user creates an account
      createUserFirstName: '',
      createUserLastName: '',
      createUserEmail: '',
      createUserPassword: '',
      // used to render name to myTrips page when account created
      createdUser: false,
      // used to handle inputs on login
      logInEmail: '',
      logInPassword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateAvailability = this.updateAvailability.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.logoutOfGoogle = this.logoutOfGoogle.bind(this)
    this.addToMyTrips = this.addToMyTrips.bind(this)
    this.removeTrip = this.removeTrip.bind(this)
    this.createNewAccount = this.createNewAccount.bind(this)
    this.loginWithEmail = this.loginWithEmail.bind(this)
    this.logoutOfEmail = this.logoutOfEmail.bind(this)
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
        return;
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
      if (snapshot.exists()) {
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
        const checkEmailProvider = user.email.split('@')[1]
        if (checkEmailProvider === 'gmail.com') {
          this.setState({
            userLoggedInWithGoogle: true
          })
        }
        else {
          this.setState({
            userLoggedInWithEmail: true
          })
        }

        // pushing existing items from upcoming trips in firebase to upcoming trips in state so that items will get rendered
        dbRefUpcomingTrips.on('value', snapshot => {
          const data = snapshot.val()
          for (let key in data) {
            upComingTripsArray.push(data[key])
          }
        })

        this.setState({
          userLoggedIn: true,
          currentUserId: userID,
          currentUserName: displayName,
        })

        if(this.state.createdUser === false) {
          this.setState({
            currentUserUpcomingTrips: upComingTripsArray
          })
        }
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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

          if (snapshot.exists()) {

            this.setState({
              userLoggedIn: true,
              userLoggedInWithGoogle: true,
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
              userLoggedInWithGoogle: true,
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

  logoutOfGoogle() {
    const auth = firebase.auth();
    auth.signOut()
      .then(() => {
        this.setState({
          currentUserId: '',
          currentUserName: '',
          userLoggedIn: false,
          userLoggedInWithGoogle: false
        })
      })
  }

  createNewAccount(email, password, firstName, lastName, fullName) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {

        const userID = firebase.auth().currentUser.uid
        firebase.auth().currentUser.updateProfile({
          displayName: fullName
        })

        const user = {
          userID: userID,
          userName: fullName,
          upcomingTrips: {}
        }

        const dbRefUser = firebase.database().ref(`users/${userID}`)
        dbRefUser.push(user)

        this.setState({
          userLoggedIn: true,
          userLoggedInWithEmail: true,
          createdUser: true,
          createUserFirstName: firstName,
          createUserLastName: lastName,
          currentUserId: userID
        })

      }).catch(error => {
        if (error.message === "The email address is already in use by another account") {
          alert(`Error: ${error.message}. If you are using a Gmail address, try clicking on "Login" and "Log In With Google"`)
        }
        else if (error) {
          console.log(error)
          alert(`Error: ${error.message}`)
        }
        else {
          return;
        }
      })
  }

  loginWithEmail(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {

        const user = firebase.auth().currentUser
        const userID = user.uid
        const displayName = user.displayName

        this.setState({
          userLoggedIn: true,
          userLoggedInWithEmail: true,
          currentUserId: userID,
          currentUserName: displayName
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
      }).catch(error => {
        if (error) {
          alert(`Error: ${error}`)
          this.setState({
            logInPassword: ''
          })
        }
      })
  }

  logoutOfEmail() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          currentUserId: '',
          currentUserName: '',
          userLoggedIn: false,
          userLoggedInWithEmail: false,
        })
        // This is only true when a user just created an account
        if (this.state.createdUser === true) {
          this.setState({
            createdUser: false
          })
        }
      }).catch((error) => {
        if (error) {
          console.log(error)
        }
      })
  }

  updateAvailability(selectedDate, selectedCity) {

    const tourList = this.state.tourListUpdatedAvailability

    const updatedTourList = []
    tourList.map(item => {
      const tourCities = item.city
      const tourDates = item.departures["2019"]

      if (tourCities === selectedCity) {
        for (let i = 0; i < tourDates.length; i++) {
          if (tourDates[i].date === selectedDate) {
            tourDates[i].availability = tourDates[i].availability - 1
          }
        }
        updatedTourList.push(item)
      }
      else {
        updatedTourList.push(item)
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
    let currentTrips = this.state.currentUserUpcomingTrips
    const currentUserID = this.state.currentUserId

    // Creating and object to get add to the users Firebase profile
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

    
    const dbRefUpcomingTrips = firebase.database().ref(`users/${currentUserID}/upcomingTrips`)

    dbRefUpcomingTrips.set(currentTrips)
    
    // this.setState({
    //   currentUserUpcomingTrips: currentTrips
    // })


  }

  removeTrip(keyToRemove) {
    const upComingTrips = this.state.currentUserUpcomingTrips

    const updatedUpcomingTrips = []

    upComingTrips.map((trip, i) => {

      if (i !== keyToRemove) {
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
              loginWithGoogle={this.loginWithGoogle}
              logoutOfGoogle={this.logoutOfGoogle}
              createNewAccount={this.createNewAccount}
              loginWithEmail={this.loginWithEmail}
              logoutOfEmail={this.logoutOfEmail}
              userLoggedInWithEmail={this.state.userLoggedInWithEmail}
              userLoggedInWithGoogle={this.state.userLoggedInWithGoogle}
              handleChange={this.handleChange}
              createUserFirstName={this.state.createUserFirstName}
              createUserLastName={this.state.createUserLastName}
              createUserEmail={this.state.createUserEmail}
              createUserPassword={this.state.createUserPassword}
              logInEmail={this.state.logInEmail}
              logInPassword={this.state.logInPassword}
            />

            <Route exact path="/" render={() => {
              return (
                <Home
                  tourList={this.state.tourListToRender}
                />
              )
            }} />

            <Route 
              path="/myTrips" 
              exact 
              render={() => {
                return (
                  <MyTrips
                    upcomingTrips={this.state.currentUserUpcomingTrips}
                    currentUserName={this.state.currentUserName}
                    removeTrip={this.removeTrip}
                    userLoggedIn={this.state.userLoggedIn}
                    createUserFirstName={this.state.createUserFirstName}
                    createUserLastName={this.state.createUserLastName}
                    createdUser={this.state.createdUser}
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
                  loginWithGoogle={this.loginWithGoogle}
                  logoutOfGoogle={this.logoutOfGoogle}
                  createNewAccount={this.createNewAccount}
                  loginWithEmail={this.loginWithEmail}
                  logoutOfEmail={this.logoutOfEmail}
                  userLoggedInWithEmail={this.state.userLoggedInWithEmail}
                  userLoggedInWithGoogle={this.state.userLoggedInWithGoogle}
                  handleChange={this.handleChange}
                  createUserFirstName={this.state.createUserFirstName}
                  createUserLastName={this.state.createUserLastName}
                  createUserEmail={this.state.createUserEmail}
                  createUserPassword={this.state.createUserPassword}
                  logInEmail={this.state.logInEmail}
                  logInPassword={this.state.logInPassword}
                />
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
