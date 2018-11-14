import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import BlackScreen from './BlackScreen'
import LoginModal from './Modals/LoginModal'

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
    
    closeLoginModal() {
        $('.login-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }
    
    render() {
        
        const userLoggedIn = this.props.userLoggedIn
        if(userLoggedIn === true) {
            this.closeLoginModal()
        }
        return (
            <div className="nav-container">
                <BlackScreen />
                <LoginModal 
                    loginWithGoogle={this.props.loginWithGoogle}
                    createNewAccount={this.props.createNewAccount}
                    loginWithEmail={this.props.loginWithEmail}
                    userLoggedIn={this.props.userLoggedIn}
                />
                <nav className="headerNav">
                    <div className="wrapper clearfix text">
                        <i className="fas fa-plane"></i>
                        <h1>Travel</h1>

                        {/* Links */}
                        <ul>
                            {/* Home */}
                            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                            
                            {/* Bookings */}
                            <li><NavLink to="/bookings" activeClassName="active">Book A Trip</NavLink></li>
                            
                            {/* My Trips */}
                            {this.props.userLoggedIn === true ? 
                                <li><NavLink to="/myTrips" activeClassName="active">My Trips</NavLink></li> 
                            : null}
                            
                            {/* Login / Logout */}
                            {this.props.userLoggedIn === false ? 
                                <li>
                                    <button className="login-button" onClick={this.loginModal}>Login</button>
                                </li> 
                            : this.props.userLoggedInWithGoogle === true ?
                                <li>
                                    <NavLink to="/"><button className="login-button" onClick={this.props.logoutOfGoogle}>Logout</button></NavLink>
                                </li> 
                            : this.props.userLoggedInWithEmail === true ?
                                <li>
                                    <NavLink to="/"><button className="login-button" onClick={this.props.logoutOfEmail}>Logout</button></NavLink>
                                </li> 
                            : null
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

