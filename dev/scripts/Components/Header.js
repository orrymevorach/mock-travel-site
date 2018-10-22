import React from 'react';

const Header = () => {
    
    // const headerImages = [
    //     {
    //         url: "./assets/ocean.jpg",
    //         alt: "Picture Of the Ocean"
    //     },
    //     {
    //         url: "./assets/road.jpg",
    //         alt: "Pictures of the Open Road"
    //     },
    //     {
    //         url: "./assets/trees.jpg",
    //         alt: "Pictures of Trees"
    //     }
    // ]

    // let slider_index = 0;
    // let slider_position = 0;
    
    // setInterval(function headerSlider() {
        
        
    //     slider_index++;
    //     console.log(slider_index)
    //     if (slider_index >= headerImages.length - 1) {
    //         slider_index = -1;
    //     }
    //     const back = document.getElementById('background-container')

    //     back.style.background = `url(${headerImages[1].url})`




    // }, 5000)

    
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