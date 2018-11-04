import React from 'react';
import Header from './Home/Header'
import PopularDest from './Home/PopularDest'
import WhyChooseUs from './Home/WhyChooseUs'
import Reviews from './Home/Reviews'
import Information from './Home/Information'
import Newsletter from './Home/Newsletter'

const Home = (props) => {
    return (
        <div>
            <Header />
            <PopularDest 
                tourList={props.tourList}
            />
            <WhyChooseUs />
            <Reviews />
            <Information />
            <Newsletter />
        </div>
    )
}

export default Home;