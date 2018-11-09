import React from 'react';
import BlackScreen from './BlackScreen';
import LoginModal from './LoginModal';

const Bookings = (props) => {
    function bookNow(e) {
        if(props.userLoggedIn === true) {
            const confirmation = confirm('Are You Ready For The Greatest Adventure Of Your Live!!')
            
            if (confirmation === true) {
                const selectedDate = e.target.dataset.dates
                const selectedCity = e.target.dataset.city
                
                // Send Selected Trip Information to Update Availability Function
                props.updateAvailability(selectedDate, selectedCity);
    
            }
        
        }
        else {
            $('.black-screen').css({'display': 'block'})
            $('.modal-please-login').css({'display': 'block'})
            $('body').addClass('stop-scroll')
            $('html').addClass('stop-scroll')
        }
    }

    function login() {
        $('.modal-please-login').addClass('fade-out')
        setTimeout(function(){
            $('.modal-please-login').css({ 'display': 'none' })
            $('.login-modal').css({'display': 'block'})
        }, 100)
    }

    function cancel() {
        $('.black-screen').css({ 'display': 'none' })
        $('.modal-please-login').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }

    const tourArray = props.tourList
    
    return (
        <section className="bookings">
            <BlackScreen />
            <LoginModal />
            <div className="modal modal-please-login">
                <h3>Please Log In To Book Your Next Adventure!</h3>
                <button className="modal-button continue-to-login" onClick={login}>Continue To Log In</button>
                <button className="modal-button cancel" onClick={cancel}>Cancel</button>
            </div>
            <div className="text-container">
                <h1>Bookings</h1>
            </div>
            <div className="wrapper">
                {tourArray.map((tour, i) => {
                    const year = tour.departures["2019"]
                    const cityName = tour.city

                    return (
                        <div className="trip-container" key={i}>
                            <img src={tour.url} alt="" key={tour.url} />
                            <div className="content-container">
                                <h2 key={tour.city}>{tour.city}</h2>
                                <p className="description" key={i}>{tour.text}</p>

                                {year.map((year, index) => {
                                    const dates = year.date
                                    const availability = year.availability
                                    if (availability >= 10) {
                                        return (
                                            <div className="dates-container" key={index}>
                                                <div className="dates-col-1">
                                                    <button className="book-button" data-city={cityName} data-dates={dates} onClick={bookNow}>Book Now</button>
                                                </div>
                                                <div className="dates-col-2">
                                                    <p className="dates">{dates}</p>
                                                </div>
                                                <div className="dates-col-3"></div>


                                            </div>
                                        )
                                    }
                                    else if (availability < 10 && availability > 0) {
                                        return (
                                            <div className="dates-container" key={index}>
                                                <div className="dates-col-1">
                                                    <button className="book-button" data-city={cityName} data-dates={dates} onClick={bookNow}>Book Now</button>
                                                </div>
                                                <div className="dates-col-2">
                                                    <p className="dates">{dates} </p>
                                                </div>
                                                <div className="dates-col-3">
                                                    <p className="spots-left">{availability} Spots Left!</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (availability === 0) {
                                        return (
                                            <div className="dates-container" key={index}>
                                                <div className="dates-col-1"></div>
                                                <div className="dates-col-2">
                                                    <p className="crossed-out">{dates}</p>
                                                </div>
                                                <div className="dates-col-3">
                                                    <p className="sold-out">Sold Out!</p>
                                                </div>

                                            </div>
                                        )
                                    }
                                })}


                            </div>
                        </div>
                    )
                })}
            </div>
            
        </section>
    )
}



export default Bookings;

