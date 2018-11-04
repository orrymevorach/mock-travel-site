import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="wrapper main">
                <div className="column column1">
                    <div className="header-container">
                        <i className="fas fa-plane"></i>
                        <h3>Travel</h3>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem iste impedit maxime cum repudiandae nisi atque labore exercitationem non aliquam quisquam modi placeat aliquid corporis, harum a ullam error assumenda.</p>
                </div>
                <div className="column column2">
                    <h4>Information</h4>
                    <ul>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Press Centre</p>
                            
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Travel News</p>

                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Popuar Place</p>

                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Best Offers</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Private Policy</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Contact Us</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-angle-right"></i>
                                <p>Customer Reviews</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column column3">
                    <h4>Recent Posts</h4>
                    <div className="blog1">
                        <p className="title">Latest Blog Title</p>
                        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <p className="date italic">21 April, 2018</p>
                    </div>
                    <div className="blog2">
                        <p className="title">Latest Title</p>
                        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <p className="date italic">04 May, 2018</p>
                    </div>
                </div>
                <div className="column column4">
                    <h4>Contact Us</h4>
                    <a href="#" className="phone">
                        <i className="fas fa-phone"></i>
                        <p>+1 123 456 7890</p>
                    </a>
                    <a href="#" className="email">
                        <i className="far fa-envelope"></i>
                        <p>info@example.com</p>
                    </a>
                    <a href="#" className="address">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>123 My Street, City Province Postal Code</p>
                    </a>
                    <div className="social">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-pinterest"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div> {/* Closing Wrapper and Main */}
            <div className="footer-bottom">
                <p>Copyright &copy; 2018 Travel Tour. All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer;