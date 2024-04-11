/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/// Manages The Dialog Context throughout the App. Particularly in Todo

const DialogContext = createContext();

export const useDialog = () => useContext(DialogContext);


// provide a context API for rest of app
export const DialogProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null)

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DialogContext.Provider value={{ isOpen, content, setContent, toggleDialog }}>
        {children}
        </DialogContext.Provider>
    );
};

DialogProvider.propTypes = {
    children: PropTypes.node.isRequired
}
