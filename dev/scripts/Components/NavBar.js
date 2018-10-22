import React from 'react';

const NavBar = () => {
    return (
            <nav className="headerNav">
                <div className="wrapper clearfix text">
                    <i className="fas fa-plane"></i>
                    <h1>Travel</h1>
                    
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Bookings</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#"><i className="fas fa-search"></i></a></li>
                    </ul>
                </div>
            </nav>        
    )
}

export default NavBar;

