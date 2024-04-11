import RegisterForm from '../components/forms/RegisterForm'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext';

// Register Page
// Displays RegisterForm component or redirects to Todo (if logged in)

// when RegisterForm submits, this page will send details to auth service
function Register() {

    const { user, register } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = e.target.elements;
        console.log(input)
        const user = {username: input.username.value, 
            password: input.password.value, confirmPassord: input.confirmPassword.value};
        // Ensures passwords match
        if (user.password !== user.confirmPassord) console.log("passwords dont match!");
        else register(user);
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return(
        <>
            <RegisterForm onSubmit={handleSubmit}/>
        </>
    )
}

export default Register;