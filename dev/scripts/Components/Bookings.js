import React from 'react';

const Bookings = (props) => {
    function bookNow(e) {
        const confirmation = confirm('Are You Ready For The Greatest Adventure Of Your Live!!')
        
        if (confirmation === true) {
            const selectedDate = e.target.dataset.dates
            const selectedCity = e.target.dataset.city
            
            // Send Selected Trip Information to Update Availability Function
            props.updateAvailability(selectedDate, selectedCity);

        }
    }

    const tourArray = props.tourList
    console.log(tourArray)
    
    return (
        <section className="bookings">
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

