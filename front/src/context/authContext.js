import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [formError, setFormError] = useState(false)

    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (formValues) => {

        axios.post('http://localhost:8080/api/user/login', formValues)
            .then(res => {
                setCurrentUser(res.data);
                setSuccessfulLogin(true);
                setFormError(false);
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch(err => { 
                console.log(err);
                setFormError(true)
            })
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ successfulLogin, currentUser, formError, login }}>
            {children}
        </AuthContext.Provider>
    );
};