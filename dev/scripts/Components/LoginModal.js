import React from 'react';
import NewAccountModal from './NewAccountModal';

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
    
    return (
        <div className="modal-container">
            <div className="modal login-modal">
                <div className="close-modal-button" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </div>
                <button className="modal-button login-google" onClick={props.login}>Login With Google</button>
                <h3>OR</h3>
                <button className="modal-button login-new">Login With Username</button>
                <button onClick={newAccountModal} class="button-no-style"><span className="underline">Create A New Account</span></button>
            </div>
            {/* Only renders onClick of Create New Account a-tag  */}
            <NewAccountModal />
        </div>
    )
}

export default LoginModal;