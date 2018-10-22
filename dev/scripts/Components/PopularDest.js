import React from 'react';

const PopularDest = () => {
    return (
        <section className="popular-dest">
            <div className="wrapper">
                <div className="heading">
                    <h2>Popular Destinations</h2>
                    <p className="title-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>

                <div className="images-container">
                    <div className="image-container">
                        <a href="#" className="image-screen">
                            <h3>Canada</h3>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum</p>
                            <p className="view-details">view details</p>
                        </a>

                        <img src="../../../assets/ocean.jpg" alt="" className="pop-image pop-image1" />
                    </div>

                    <div className="image-container">
                        <a href="#" className="image-screen">
                            <h3>London</h3>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum</p>
                            <p className="view-details">view details</p>
                        </a>

                        <img src="../../../assets/ocean.jpg" alt="" className="pop-image pop-image1" />
                    </div>

                    <div className="image-container">
                        <a href="#" className="image-screen">
                            <h3>Italy</h3>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum</p>
                            <p className="view-details">view details</p>
                        </a>

                        <img src="../../../assets/ocean.jpg" alt="" className="pop-image pop-image1" />
                    </div>

                    <div className="image-container">
                        <a href="#" className="image-screen">
                            <h3>Thailand</h3>
                            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus explicabo vel dolorum</p>
                            <p className="view-details">view details</p>
                        </a>

                        <img src="../../../assets/ocean.jpg" alt="" className="pop-image pop-image1" />
                    </div>


                </div>
            </div>
            
        </section>
    )
}

export default PopularDest;