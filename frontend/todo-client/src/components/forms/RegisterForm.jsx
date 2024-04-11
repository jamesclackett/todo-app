/* eslint-disable react/no-unescaped-entities */
import { FaUser, FaLock } from "react-icons/fa";
import '../../styles/forms/Form.css'
import PropTypes from 'prop-types';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

// A simple form component registering a user.
// Takes a function prop to allow the parent to react to its submission
function RegisterForm({onSubmit}) {

    return(
        <div className="login-form-container">
            <form onSubmit={onSubmit} className="login-form-content" action="">
                <h1>Register</h1>
                <div className="login-form-input">
                    <input name="username" type="text" placeholder="Username" required/>
                    <FaUser className="input-icon"/>
                </div>
                <div className="login-form-input">
                    <input name="password" type="password" placeholder="Password" required/>
                    <FaLock className="input-icon"/>
                </div>
                <div className="login-form-input">
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" required/>
                    <FaLock className="input-icon"/>
                </div>
                <button type="submit">Sign Up!</button>
                <div>
                    <p>Already have an account? <a href="/login"> Login</a></p>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;