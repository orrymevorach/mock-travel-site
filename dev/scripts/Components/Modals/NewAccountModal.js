import React from 'react';
import ErrorAccountExists from './ErrorAccountExists'

const NewAccountModal = (props) => {
    function closeModal() {
        $('.new-account-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }

    function passLoginInfo(e) {
        const firstName = e.target.form[0].value
        const lastName = e.target.form[1].value ? e.target.form[1].value : ''
        const fullName = `${firstName} ${lastName}`
        const email = e.target.form[2].value
        const password = e.target.form[3].value
        const event = e

        firebase.initializeApp(props.firebaseConfig);

        const dbRefUsers = firebase.database().ref(`users`)
        dbRefUsers.on('value', snapshot => {
            const data = snapshot.val()
            const userID = email.replace(/\./g, 'dot');
            for (let key in data) {
                
                if (userID !== key[data]) {
                    props.createNewAccount(email, password, fullName)
                    closeModal()
                }
                else {
                    $('.error-account-exists').css({'display': 'block'})
                }
            }
        })
        
    }

    return (
        <div className="modal new-account-modal">
            <ErrorAccountExists />
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
                <div className="button-container">
                    <input 
                        type="submit" 
                        className="modal-button login-new" 
                        value="Create Account" 
                        onClick={passLoginInfo}
                        data-modal-to-close="new-account-modal"
                    />
                </div>
            </form>
            <button className="modal-button cancel" data-modal-to-close="new-account-modal" onClick={props.closeModal}>Cancel</button>
        </div>
    )
}

export default NewAccountModal;