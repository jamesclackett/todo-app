/* eslint-disable react/no-unescaped-entities */
import { FaUser, FaLock } from "react-icons/fa";
import PropTypes from 'prop-types';
import '../../styles/forms/Form.css'

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

// A simple form component for logging in a user.
// Takes a function prop to allow the parent to react to its submission
function LoginForm({onSubmit}) {

    return(
        <div className="login-form-container">
            <form onSubmit={onSubmit} className="login-form-content" action="">
                <h1>Login</h1>
                <div className="login-form-input">
                    <input name="username" type="text" placeholder="Username" required/>
                    <FaUser className="input-icon" />
                </div>
                <div className="login-form-input">
                    <input name="password" type="password" placeholder="Password" required/>
                    <FaLock className="input-icon"/>
                </div>
                <button type="submit">Login</button>
                <div>
                    <p>Don't have an account? <a href="/register"> Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;