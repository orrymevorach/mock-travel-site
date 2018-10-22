import React from 'react';

const Reviews = () => {
    return (
        <section className="reviews">
            <div className="wrapper">
                <div className="heading">
                    <h2>Customer Reviews</h2>
                    <p>Lorem ipsum dolor sit amet, consecteteur adipscing elit</p>
                    <p className="italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas eveniet labore dolor eligendi adipisci fugiat iure eaque vitae iusto itaque, quasi inventore quae nulla recusandae consectetur laudantium. Officiis, et dignissimos?</p>
                </div>
                <div className="reviewer-container">
                    <img src="../../../assets/road.jpg" alt="" />
                    <div className="reviewer-text-container">
                        <h3>Orry Mevorach</h3>
                        <p className="italic job-title">CEO, Traveller</p>
                        <div className="five-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Reviews;