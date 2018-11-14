import React from 'react';

const LoginWithEmailModal = (props) => {
    function closeModal() {
        $('.login-with-email-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }

    function passLoginInfo(e) {
        const email = e.target.form[0].value
        const password = e.target.form[1].value

        props.loginWithEmail(email, password)
        closeModal()
    }

    return (
        <div className="modal login-with-email-modal">
            <h2>Please Enter Your Login Information</h2>
            <form action="#">
                
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
                    <input type="text" required />
                </div>
                <div className="button-container">
                    <input
                        type="submit"
                        className="modal-button login-new"
                        value="Log In"
                        onClick={passLoginInfo}
                    />
                </div>
            </form>
            <button className="modal-button cancel" data-modal-to-close="login-with-email-modal" onClick={props.closeModal}>Cancel</button>
        </div>
    )
}

export default LoginWithEmailModal;