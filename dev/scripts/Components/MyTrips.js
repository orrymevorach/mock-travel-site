import React from 'react';

const MyTrips = (props) => {
    // function passRemoveInfo(e) {
    //     const city = e.target.dataset.city
    //     const date = e.target.dataset.dates
        
    //     props.removeTrip();
    // }

    const myTrips = props.upcomingTrips
    const userName = props.userName


    return (
        <section className="my-trips">
            <div className="text-container">
                <h1>My Trips</h1>
            </div>

            <div className="wrapper">
                
                {myTrips.length === 0 && props.userLoggedIn === true ?
                    <div>
                        <h2 className="welcome-back">Welcome {userName}!</h2>
                        <h3>There will be nothing to see here until you book a trip!</h3>
                    </div>
                : myTrips.length !== 0 && props.userLoggedIn === true ?
                    <div>
                        <h2 className="welcome-back">Welcome Back {userName}!</h2>
                        <h3>Your Upcoming Trips Are:</h3>
                    </div>
                : props.userLoggedIn === false ?
                    <div>
                        <h2 className="welcome-back">Welcome!</h2>
                        <h3>Please Log In To See Your Trips</h3>
                    </div>
                : null
                }
            
                {myTrips.map((trip, i) => {
                    const departureDate = trip.selectedDate
                    const city = trip.cityObject.city
                    const description = trip.cityObject.text
                    const url = trip.cityObject.url
                    
                    return (
                        <div className="trip-container" key={i}>
                            <img src={url} alt=""/>
                            <div className="content-container">
                                <h2>{city}</h2>
                                <p className="description">{description}</p>
                                <p className="departure">This trip leaves on: <span className="departure-date">{departureDate}</span></p>
                                <button 
                                    className="modal-button" onClick={() => props.removeTrip(i)}>Cancel Trip</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default MyTrips;