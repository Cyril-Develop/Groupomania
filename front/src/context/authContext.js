import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [curentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (formValues) => {
        fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formValues),
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data);
                    setCurrentUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                })
            } 
        })
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(curentUser));
    }, [curentUser]);

    return (
        <AuthContext.Provider value={{ curentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};