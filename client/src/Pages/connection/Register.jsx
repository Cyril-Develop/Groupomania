import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-groupo.svg";
import "./connection.scss";

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [successfulRegister, setSuccessfulRegister] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmit(true);
        setSuccessfulRegister(true)
        setFormError(validate(formValues));

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/signup`, formValues)
            setFormValues(initialValues);
            setEmailUsed(false);
        } catch (error) {
            console.log(error);
            error.response.data.error === "Email already used !" ? setEmailUsed(true) : setEmailUsed(false);
        }
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit && !emailUsed) {
            console.log("User registered");
        }
    });

    const validate = (values) => {
        const error = {}
        // eslint-disable-next-line
        const emailRegex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/;
        const nameRegex = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const passwordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,15}$/;
        if (!values.lastname) {
            error.lastname = 'Le nom est obligatoire';
        } else if (!nameRegex.test(values.lastname)) {
            error.lastname = 'Entre 3 et 15 caractères. Chiffres et caractères spéciaux différents de - non autorisés';
        }
        if (!values.firstname) {
            error.firstname = 'Le prénom est obligatoire';
        } else if (!nameRegex.test(values.firstname)) {
            error.firstname = 'Entre 3 et 15 caractères. Chiffres et caractères spéciaux différents de - non autorisés';
        }
        if (!values.email) {
            error.email = `L' email est obligatoire`;
        } else if (!emailRegex.test(values.email)) {
            error.email = 'Veuillez renseigner une adresse mail valide';
        }
        if (!values.password) {
            error.password = 'Le mot de passe est obligatoire';
        } else if (!passwordRegex.test(values.password)) {
            error.password = 'Entre 8 et 15 caractères. 2 chiffres, 2 majuscules, 3 minuscules et 1 caractère spécial obligatoires';
        }
        return error;
    };

    useEffect(() => {
        if (successfulRegister) {
            const timer = setTimeout(() => {
                setSuccessfulRegister(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successfulRegister]);

    return (
        <main className="connection">
            {Object.keys(formError).length === 0 && successfulRegister && isSubmit && !emailUsed && <div className='success'>Compte créé</div>}
            <div className="card reverse" >
                <div className="card_right card_register">
                    <h1><img src={Logo} alt="logo groupomania" /></h1>
                    <p>Déjà inscrit ? <Link to="/groupomania/login">se connecter</Link></p>
                </div>
                <div className="card_left">
                    <h2>Inscription</h2>
                    <form className="form">
                        <div className="form_control">
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={formValues.lastname}
                                onChange={handleChange}
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
                            {emailUsed && <p>Cette adresse email est déjà utilisée</p>}
                        </div>
                        <div className="form_control">
                            <button className='form_control_password' aria-label="Show password" onClick={e => togglePassword(e)}>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
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
                        <button className='btn_submit' onClick={handleSubmit} type="submit">Valider</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
