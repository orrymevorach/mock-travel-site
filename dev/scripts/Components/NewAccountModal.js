import React from 'react';

const NewAccountModal = () => {
    function passLoginInfo(e) {
        const email = e.target.value
        console.log(email)
    }

    function closeModal() {
        $('.new-account-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }
    
    return (
        <div className="modal new-account-modal">
            <h2>Welcome To Travel Tour</h2>
            <form action="#">
                <div className="first-name">
                    <div className="required-container">
                        <label htmlFor="first-name">First Name</label>
                        <label className="required">*Required</label>
                    </div>
                    <input type="text" required />
                </div>
                <div className="last-name">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" />
                </div>
                <div className="email">
                    <div className="required-container">
                        <label htmlFor="email">Email Address</label>
                        <label className="required">*Required</label>
                    </div>
                    <input type="email" required />
                </div>
                <div className="password-set">
                    <div className="required-container">
                        <label htmlFor="password-set">Create A Password</label>
                        <label className="required">*Required</label>
                    </div>
                    <input type="text" required />
                </div>
                <div className="password-match">
                    <div className="required-container">
                        <label htmlFor="password-match">Retype Password</label>
                        <label className="required">*Required</label>
                    </div>
                    <input type="text" required />
                </div>
                <div className="button-container">
                    <input 
                        type="submit" 
                        className="modal-button login-new" 
                        value="Create Account" 
                        onClick={passLoginInfo}
                    />
                </div>
            </form>
            <button className="modal-button cancel" onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default NewAccountModal;