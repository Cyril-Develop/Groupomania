import React from 'react'
import './register.scss'
import Logo from '../../assets/logo-groupo.svg'
import {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="register">
			<div className='card'>
				<div className="right">
					<img src={Logo} alt="logo groupomania" />
					<p>Déjà inscrit ? <Link to='/login'><a>se connecter</a></Link></p>
				</div>
				<div className="left">
					<h2>Inscription</h2>
					<form>
                    <div className='form-control'>
							<input type="text" name="Nom" id="Nom" required/>
							<label htmlFor="Nom">Nom</label>
						</div>
						<div className='form-control'>
							<input type="text" name="Prénom" id="Prénom" required/>
							<label htmlFor="Prénom">Prénom</label>
						</div>
						<div className='form-control'>
							<input type="email" name="email" id="email" required/>
							<label htmlFor="email">Email</label>
						</div>
						<div className='form-control'>
							<div onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}></div>
							<input type={showPassword ? "text" : "password"} name="mdp" id="mdp" required/>
							<label htmlFor="mdp">Mot de passe</label>
						</div>
						<button type='submit'>Inscription</button>
					</form>
				</div>
			</div>
		</div>
	)
}
