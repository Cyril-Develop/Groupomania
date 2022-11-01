import React from 'react'
import './login.scss'
import Logo from '../../assets/logo-groupo.svg'
import {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="login">
			<div className='card'>
				<div className="card_right">
					<img src={Logo} alt="logo groupomania" />
					<p>Pas de compte ? <Link to='/register'><a href='/register'>inscription</a></Link></p>
				</div>
				<div className="card_left">
					<h2>Connexion</h2>
					<form className='form'>
						<div className='form_control'>
							<input type="email" name="email" id="email" required/>
							<label htmlFor="email">Email</label>
						</div>
						<div className='form_control'>
							<div onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}>
							</div>
							<input type={showPassword ? "text" : "password"} name="mdp" id="mdp" required/>
							<label htmlFor="mdp">Mot de passe</label>
						</div>
						<button type='submit'>Connexion</button>
					</form>
				</div>
			</div>
		</div>
	)
}
