import React from 'react';

const Newsletter = () => {
    return (
        <section className="newsletter">
            <div className="wrapper clearfix">
                <div className="left">
                    <h3>Join The Newsletter</h3>
                    <p>Lorem Ipsum dolor sit amet consectetur adipscing elit</p>
                </div>
                <div className="right">
                    <form action="#">
                        <input type="email" placeholder="Email Address"/>
                        <input type="submit" value="Sign Up"/>
                    </form>
                </div>
            </div>
        
        </section>
    )
}
export default Newsletter;