import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';

class NavBar extends React.Component {
    
    showSearchBar() {
        $('.search-icon').toggleClass('search-icon-add-margin')
        $('.search-form').toggleClass('form-animation')
        $('.form-container').toggleClass('form-container-animation')
    }

    render() {
        return (
            <nav className="headerNav">
                <div className="wrapper clearfix text">
                    <i className="fas fa-plane"></i>
                    <h1>Travel</h1>

                    <ul>
                        {/* Links */}
                        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                        <li><NavLink to="/bookings" activeClassName="active">Bookings</NavLink></li>
                        <li><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
                        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                        
                        {/* Search Bar, only visible when click on Search Icon */}
                        <div className="form-container">
                            <form action="#" className="search-form">
                                <input type="text" placeholder="Search Our Tours"/>
                                <input type="submit" value="SEARCH" />
                            </form>
                        </div>
                        
                        {/* Search Icon */}
                        <li className="search-icon" onClick={this.showSearchBar}><i className="fas fa-search"></i></li>


                        
                    </ul>
                </div>
            </nav>
        )
    }
    


    
}

export default NavBar;

