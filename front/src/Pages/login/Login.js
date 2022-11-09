import './login.scss'
import Logo from '../../assets/logo-groupo.svg'
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function Login() {

	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword)
	};

	///////////////////////////////////////////////////////////////
	const [formValues, setFormValues] = useState({
		email: '',
		password: ''
	});

	const handleChange = e => {
		const { name, value } = e.target
		setFormValues({ ...formValues, [name]: value })
	};

	///////////////////////////////////////////////////////////////
	const {formError, login, successfulLogin} = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(formValues);
			navigate("/");
		} catch (err) {
		  console.log(err);
		}
	  };

	  useEffect(() => {
		if (successfulLogin) {
		  console.log('User logged in');
		  navigate("/");
		} else{
			console.log("User not logged in");
		}
	  });

	return (
		<div className="login">
			<div className='card'>
				<div className="card_right">
					<img src={Logo} alt="logo groupomania" />
					<p>Pas de compte ? <Link to='/register'>inscription</Link></p>
				</div>
				<div className="card_left">
					<h2>Connexion</h2>
					<form className='form'>
						<div className='form_control'>
							<input 
								type="email" 
								name="email" 
								id="email" 
								onChange={handleChange}
							/>
							<label htmlFor="email" className={formValues.email && 'animLabel'}>Email</label>
						</div>
						<div className='form_control'>
							<div 
								onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}>
							</div>
							<input 
								type={showPassword ? "text" : "password"} 
								name="password" id="password" 
								onChange={handleChange}
							/>
							<label htmlFor="password" className={formValues.password && 'animLabel'}>Mot de passe</label>
							{formError && <p>Email ou mot de passe incorrect</p>}
						</div>
						<button onClick={handleLogin} type='submit'>Valider</button>
					</form>
				</div>
			</div>
		</div>
	)
}
