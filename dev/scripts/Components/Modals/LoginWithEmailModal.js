import React from 'react';

const LoginWithEmailModal = (props) => {
    function closeModal() {
        $('.login-with-email-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }

    function passLoginInfo(e) {
        const email = e.target[0].value
        const password = e.target[1].value

        props.loginWithEmail(email, password)
    }
    
    const userLoggedIn = props.userLoggedIn
    if (userLoggedIn === true) {
        closeModal()
    }

    return (
     
        <div className="modal login-with-email-modal">
            <h2>Please Enter Your Login Information</h2>
            <form action="#" onSubmit={passLoginInfo}>
                
                <div className="email">
                    <div className="required-container">
                        <label htmlFor="email">Email Address</label>
                        <label className="required">*Required</label>
                    </div>
                    <input type="email" required />
                </div>
                <div className="password-set">
                    <div className="required-container">
                        <label htmlFor="password-set">Password</label>
                        <label className="required">*Required</label>
                    </div>
                    <input type="password" required />
                </div>
                <div className="button-container">
                    <input
                        type="submit"
                        className="modal-button login-new"
                        value="Log In"
                    />
                </div>
            </form>
            <button className="modal-button cancel" data-modal-to-close="login-with-email-modal" onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default LoginWithEmailModal;