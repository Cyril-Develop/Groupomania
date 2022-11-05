import React from "react";
import "./register.scss";
import Logo from "../../assets/logo-groupo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    /////////////////////////////////////////////////////////
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    //////////////////////////////////////////////////////
    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = e => {
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
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data);
                    setFormValues(initialValues);
                })
            } 
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log("User registered");
        }              
    });

    const validate = (values) => {
        const error = {}
        const emailRegex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/;
        const nameRegex = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const passwordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,15}$/;
        if(!values.lastname){
            error.lastname = 'Le nom est obligatoire';
        } else if(!nameRegex.test(values.lastname)){
            error.lastname = 'Entre 3 et 15 caractères. Chiffres et caractères spéciaux différents de - non autorisés';
        }
        if(!values.firstname){
            error.firstname = 'Le prénom est obligatoire';
        } else if(!nameRegex.test(values.firstname)){
            error.firstname = 'Entre 3 et 15 caractères. Chiffres et caractères spéciaux différents de - non autorisés';
        }
        if(!values.email){
            error.email = `L' email est obligatoire`;
        } else if(!emailRegex.test(values.email)) {
            error.email = 'Veuillez renseigner une adresse mail valide';
        }
        if(!values.password){
            error.password = 'Le mot de passe est obligatoire';
        } else if(!passwordRegex.test(values.password)){
            error.password = 'Entre 8 et 15 caractères. 2 chiffres, 2 majuscules, 3 minuscules et 1 caractère spécial obligatoires';
        }

        return error;
    };

    return (
        <div className="register">
            {Object.keys(formError).length === 0 && isSubmit && <div className='success'>Compte créé</div>}
            <div className="card">
                <div className="card_right">
                    <img src={Logo} alt="logo groupomania" />
                    <p>Déjà inscrit ? <Link to="/login">se connecter</Link></p>
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
                                // className={formError.lastname && 'showError'}
                            />
                            <label htmlFor="lastname" className={formValues.lastname && 'animLabel'}>Nom</label>
                            {formError.lastname && <p>{formError.lastname}</p>}
                        </div>
                        <div className="form_control">
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={formValues.firstname}
                                onChange={handleChange}
                            />
                            <label htmlFor="firstname" className={formValues.firstname && 'animLabel'}>Prénom</label>
                            {formError.firstname && <p>{formError.firstname}</p>}
                        </div>
                        <div className="form_control">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email" className={formValues.email && 'animLabel'}>Email</label>
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
                            />
                            <label htmlFor="password" className={formValues.password && 'animLabel'}>Mot de passe</label>
                            {formError.password && <p>{formError.password}</p>}
                        </div>
                        <button type="submit">Valider</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
