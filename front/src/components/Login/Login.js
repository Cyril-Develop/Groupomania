import React from 'react'
import './Login.css'
import Logo from '../../assets/logo-groupo-black.svg'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

export default function Connection() {

	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="container-login">
			<div className='login-card'>
				<div className="login-card-left">
					<h2><span></span> Connexion <span></span></h2>
					<form>
						<div className='form-control'>
							<input type="email" name="email" id="email" required/>
							<label htmlFor="email">Email</label>
						</div>
						<div className='form-control'>
							<div onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}>
							</div>
							<input type={showPassword ? "text" : "password"} name="mdp" id="mdp" required/>
							<label htmlFor="mdp">Mot de passe</label>
						</div>
						<button className='btn-form' type='submit'>Connexion</button>
					</form>
				</div>
				<div className="login-card-right">
					<img src={Logo} alt="logo groupomania" />
					<p>Pas encore inscrit ? <a onClick={() => navigate('/login')} href="../register">s'inscrire</a></p>
				</div>
			</div>
		</div>
	)
}
