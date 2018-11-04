import React from 'react';

class PopularDest extends React.Component {
    

    render() {
        const popDestImages = this.props.tourList
        { 
            function imageSlider() {
                let slider_index = 0;
                let slider_length = popDestImages.length;
                
                setInterval(function () {
                    slider_index++;
                    let pos_pct = `calc(${slider_index * 25}% + 15px)`;
                    if (slider_index > slider_length - 5) {
                        slider_index = -1;
                    }
                    $('.image-container').css({'right': `${pos_pct}`, 'transition': '0.3s'})
                }, 3000)
            } 
            
            imageSlider();
            
        }
        return (
            <section className="popular-dest">
                <div className="wrapper">
                
                    <div className="heading">
                        <h2>Popular Destinations</h2>
                        <p className="title-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit</p>
                    </div>

                    <div className="images-container-large">
                        <div className="images-container-small">
                            {popDestImages.map((image, i) => {
                                const imageID = `image-${i + 1}`

                                return (
                                    <div className="image-container" id={imageID} key={i}>
                                        <img src={image.url} />
                                        <a href="#" className="image-screen">
                                            <h3>{image.city}</h3>
                                            <p className="text">{image.text}</p>
                                            <p className="view-details">view details</p>
                                        </a>
                                    </div>
                                )
                            })}

                        </div>

                    </div>  {/* Closing images-container */}
                </div> {/* Closing Wrapper */}
            </section>
        )
    }
    
}

export default PopularDest;