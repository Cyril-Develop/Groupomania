import React from "react";
import "./register.scss";
import Logo from "../../assets/logo-groupo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    /////////////////////////////////////////////////////////
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    ////////////////////////////////////////////////////////
    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(validate(formValues));
        setIsSubmit(true);

        fetch("http://localhost:8080/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formValues),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log("User registered");
        }
    });

    const validate = (values) => {
        const error = {}
        const emailRegex = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const nameRegex = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const passwordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,20}$/;
        if(!values.lastname){
            error.lastname = 'lastname is required';
        } else if(!nameRegex.test(values.lastname)){
            error.lastname = 'Entre 3 et 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés';
        }
        if(!values.firstname){
            error.firstname = 'name is required';
        } else if(!nameRegex.test(values.firstname)){
            error.firstname = 'Entre 3 et 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés';
        }
        if(!values.email){
            error.email = 'email is required';
        } else if(!emailRegex.test(values.email)) {
            error.email = 'Veuillez renseigner une adresse mail valide';
        }
        if(!values.password){
            error.password = 'password is required';
        } else if(!passwordRegex.test(values.password)){
            error.password = '2 chiffres, 2 majuscules, 3 minuscules, 1 caractère spécial, 8 caractères minimum';
        }

        return error;
    };

    return (
        <div className="register">
            {Object.keys(formError).length === 0 && isSubmit && <div className='success'>Compte créé</div>}
            <div className="card">
                <div className="card_right">
                    <img src={Logo} alt="logo groupomania" />
                    <p>
                        Déjà inscrit ?{" "}
                        <Link to="/login">
                            <a href="/login">se connecter</a>
                        </Link>
                    </p>
                </div>
                <div className="card_left">
                    <h2>Inscription</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form_control">
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={formValues.lastname}
                                onChange={handleChange}
                                className={formError.lastname && 'showError'}
                            />
                            <label htmlFor="lastname">Nom</label>
                            {formError.lastname && <p>{formError.lastname}</p>}
                        </div>
                        <div className="form_control">
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={formValues.firstname}
                                onChange={handleChange}
                                className={formError.firstname && 'showError'}
                            />
                            <label htmlFor="firstname">Prénom</label>
                            {formError.firstname && <p>{formError.firstname}</p>}
                        </div>
                        <div className="form_control">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={handleChange}
                                className={formError.email && 'showError'}
                            />
                            <label htmlFor="email">Email</label>
                            {formError.email && <p>{formError.email}</p>}
                        </div>
                        <div className="form_control">
                            <div
                                onClick={() => togglePassword()}
                                className={
                                    showPassword ? "close-eye" : "open-eye"
                                }
                            ></div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formValues.password}
                                onChange={handleChange}
                                className={formError.password && 'showError'}
                            />
                            <label htmlFor="password">Mot de passe</label>
                            {formError.password && <p>{formError.password}</p>}
                        </div>
                        <button type="submit">Valider</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
