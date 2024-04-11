import LoginForm from '../components/forms/LoginForm'  
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext';


// Login Page
// Displays LoginForm component or redirects to Todo (if logged in)
// when LoginForm submits, this page will send details to auth service
function Login() {

    const { user, login } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password } = e.target.elements;
        login({username: username.value, password: password.value})
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return(
        <>  
            <LoginForm onSubmit={handleSubmit} />
        </>
    )
}

export default Login;