/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

/// Manages The User Context throughout the App. Particularly in Todo

const UserContext = createContext();

export const useUser = () => useContext(UserContext);


// provide a context API for rest of app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // calls the login service of authService
    // if successful sets the global user context to response data
    const login = async (userCredentials) => {
        try {
        const response = await loginUser(userCredentials);
        if (response.status === 200) {
            const userData = await response.json();
            setUser(userData);
        }
        } catch (error) {
        console.error('Login failed:', error);
        }
    };

    // calls the register service of auth service
    // if successful creation, redirect user to login page
    const register = async (userCredentials) => {
        try {
            const response = await registerUser(userCredentials);
            if (response.status == 201) {
                window.location.href="/login";
            }
        } catch (error) {
            console.log(error);
        }
    }

    // log the user out (simple mechanism for now)
    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
        {children}
        </UserContext.Provider>
    );
};
