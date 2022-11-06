import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [formError, setFormError] = useState(false)

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (formValues) => {
        fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    localStorage.setItem("user", JSON.stringify(data));
                    setCurrentUser(data);
                    setFormError(false);
                })
            } else {
                setFormError(true)
            }
        })
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, formError, login }}>
            {children}
        </AuthContext.Provider>
    );
};