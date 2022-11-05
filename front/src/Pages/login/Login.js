import React from 'react'
import './login.scss'
import Logo from '../../assets/logo-groupo.svg'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function Login() {

	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	///////////////////////////////////////////////////////////////
	const navigate = useNavigate()

	const {login} = useContext(AuthContext);

	const handleLogin = async (e) => {
		e.preventDefault()
		try{
			await login()
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}
		
	///////////////////////////////////////////////////////////////
	const initialValues = {
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
   };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log("User connected");
        }
    });

    const validate = (values) => {
        const error = {}
        const emailRegex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/;
        const passwordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,15}$/;
        if(!values.email){
            error.email = `Veuillez renseigner votre email`;
        } else if(!emailRegex.test(values.email)) {
            error.email = 'Email incorrect';
        }
        if(!values.password){
            error.password = 'Veuillez renseigner votre mot de passe';
        } else if(!passwordRegex.test(values.password)){
            error.password = 'Mot de passe incorrect';
        }

        return error;
    };

	return (
		<div className="login">
			<div className='card'>
				<div className="card_right">
					<img src={Logo} alt="logo groupomania" />
					<p>Pas de compte ? <Link to='/register'>inscription</Link></p>
				</div>
				<div className="card_left">
					<h2>Connexion</h2>
					<form className='form' onSubmit={handleSubmit}>
						<div className='form_control'>
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
						<div className='form_control'>
							<div 
								onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}>
							</div>
							<input 
								type={showPassword ? "text" : "password"} 
								name="password" id="password" 
								value={formValues.password} 
								onChange={handleChange}
							/>
							<label htmlFor="password" className={formValues.password && 'animLabel'}>Mot de passe</label>
							{formError.password && <p>{formError.password}</p>}
						</div>
						<button onClick={handleLogin} type='submit'>Valider</button>
					</form>
				</div>
			</div>
		</div>
	)
}
