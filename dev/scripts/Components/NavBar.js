import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import BlackScreen from './BlackScreen'
import LoginModal from './LoginModal'

class NavBar extends React.Component {
    
    showSearchBar() {
        $('.search-icon').toggleClass('search-icon-add-margin')
        $('.search-form').toggleClass('form-animation')
        $('.form-container').toggleClass('form-container-animation')
    }

    loginModal() {
        $('.login-modal').css({'display': 'block'})
        $('.black-screen').css({'display': 'block'})
        $('body').addClass('stop-scroll')
        $('html').addClass('stop-scroll')
    }
    
    closeModal() {
        $('.login-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }
    
    render() {
        const userLoggedIn = this.props.userLoggedIn
        if(userLoggedIn === true) {
            this.closeModal()
        }
        return (
            <div className="nav-container">
                <BlackScreen />
                <LoginModal 
                    login={this.props.login}
                    // createNewAccount={this.props.createNewAccount}
                />
                <nav className="headerNav">
                    <div className="wrapper clearfix text">
                        <i className="fas fa-plane"></i>
                        <h1>Travel</h1>

                        <ul>
                            {/* Links */}
                            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                            {/* <li><NavLink to="/about" activeClassName="active">About</NavLink></li> */}
                            <li><NavLink to="/bookings" activeClassName="active">Bookings</NavLink></li>
                            {this.props.userLoggedIn === true ? <li><NavLink to="/myTrips" activeClassName="active">My Trips</NavLink></li> : null}
                            
                            {/* <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li> */}
                            {this.props.userLoggedIn === false ? 
                                <li>
                                    <button className="login-button" onClick={this.loginModal}>Login</button>
                                </li> 
                            : 
                                <li>
                                    <button className="login-button" onClick={this.props.logout}>Logout</button>
                                </li> 
                            }
                            
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
            </div>
        )
    }
    


    
}

export default NavBar;

