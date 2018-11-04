import React from 'react';

const Header = () => {
    
    return (
            <header>
                <div id="background-container">
                    <video src="../../../assets/sunset2.mp4" autoPlay loop></video>
                    <div className="black-transparent"></div>
                </div>
                <div className="text-container">
                    <h1>Your Best Travel Tour</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, perspiciatis. Dolorem sapiente incidunt repellat atque ipsam nesciunt non sunt</p>
                </div>
            </header>
    )
}

export default Header;