import React from 'react';
import NewAccountModal from './NewAccountModal';
import LoginWithEmailModal from './LoginWithEmailModal';

const LoginModal = (props) => {
    
    function closeModal() {
        $('.login-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }


    function newAccountModal() {
        $('.login-modal').addClass('fade-out')
        $('.login-modal').css({ 'display': 'none' })
        setTimeout(function(){
            $('.new-account-modal').css({'display': 'block'})
        }, 100)
    }

    function loginWithEmail() {
        $('.login-modal').addClass('fade-out')
        $('.login-modal').css({ 'display': 'none' })
        setTimeout(function () {
            $('.login-with-email-modal').css({ 'display': 'block' })
        }, 100)
    }
    
    return (
        <div className="modal-container">
            {/* Only renders onClick of Create New Account a-tag  */}
            <NewAccountModal
                createNewAccount={props.createNewAccount}
                userLoggedIn={props.userLoggedIn}
            />
            <LoginWithEmailModal
                loginWithEmail={props.loginWithEmail}
                userLoggedIn={props.userLoggedIn}
            />
            <div className="modal login-modal">
                <div className="close-modal-button" onClick={closeModal}>
                    <i className="fas fa-times" data-modal-to-close="login-modal"></i>
                </div>
                <button className="modal-button login-google" onClick={props.loginWithGoogle}>Login With Google</button>
                <h3>OR</h3>
                <button className="modal-button login-new" onClick={loginWithEmail}>Login With Username</button>
                <button onClick={newAccountModal} className="button-no-style"><span className="underline">Create A New Account</span></button>
            </div>
        </div>
    )
}

export default LoginModal;