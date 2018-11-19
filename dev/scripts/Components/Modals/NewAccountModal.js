import React from 'react';

const NewAccountModal = (props) => {
    function closeModal() {
        $('.new-account-modal').css({ 'display': 'none' })
        $('.black-screen').css({ 'display': 'none' })
        $('body').removeClass('stop-scroll')
        $('html').removeClass('stop-scroll')
    }

    function passLoginInfo(e) {
        e.preventDefault();
        const firstName = e.target[0].value
        const lastName = e.target[1].value ? e.target[1].value : ''
        const fullName = `${firstName} ${lastName}`
        const email = e.target[2].value
        const password = e.target[3].value

        props.createNewAccount(email, password, firstName, lastName, fullName)
    }
    const userLoggedIn = props.userLoggedIn
    if (userLoggedIn === true) {
        closeModal()
    }


    return (
        <div className="modal new-account-modal">
            <h2>Welcome To Travel Tour</h2>
            <form action="#" onSubmit={passLoginInfo}>
                <div className="first-name">
                    <div className="required-container">
                        <label htmlFor="first-name">First Name</label>
                        <label className="required">*Required</label>
                    </div>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        name="createUserFirstName"
                        value={props.createUserFirstName}
                        required
                    />
                </div>
                <div className="last-name">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        name="createUserLastName"
                        value={props.createUserLastName}
                    />
                </div>
                <div className="email">
                    <div className="required-container">
                        <label htmlFor="email">Email Address</label>
                        <label className="required">*Required</label>
                    </div>
                    <input
                        type="email"
                        onChange={props.handleChange}
                        name="createUserEmail"
                        value={props.createUserEmail}
                        required />
                </div>
                <div className="password-set">
                    <div className="required-container">
                        <label htmlFor="password-set">Create A Password</label>
                        <label className="required">*Required</label>
                    </div>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        name="createUserPassword"
                        value={props.createUserPassword}
                        required />
                </div>
                <div className="button-container">
                    <button
                        type="submit"
                        className="modal-button login-new"
                        data-modal-to-close="new-account-modal"
                    >Create New Account</button>
                </div>
            </form>
            <button className="modal-button cancel" data-modal-to-close="new-account-modal" onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default NewAccountModal;