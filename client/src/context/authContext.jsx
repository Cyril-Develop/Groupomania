import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [formError, setFormError] = useState('')

    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (formValues) => {

        axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/login`, formValues)
            .then(res => {
                setCurrentUser(res.data);
                setSuccessfulLogin(true);
                setFormError('');
            })
            .catch(err => {
                console.log(err);
                switch(err.response.status) {
                    case 404:
                        setFormError('Email ou mot de passe incorrect !');
                        break;
                    case 401:
                        setFormError('Mot de passe incorrect !');
                        break;
                    default:
                        setFormError('Erreur serveur !');
                }
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