import React from 'react'
import './Register.css'
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
		<div className="container-card">
			<div className='card'>
				<div className="card-left">
					<img src={Logo} alt="logo groupomania" />
					<p>Déjà inscrit ? <a onClick={() => navigate('/login')} href="../login">se connecter</a></p>
				</div>
				<div className="card-right">
					<h2><span></span> Inscription <span></span></h2>
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
							<div onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}>
							</div>
							<input type={showPassword ? "text" : "password"} name="mdp" id="mdp" required/>
							<label htmlFor="mdp">Mot de passe</label>
						</div>
						<button className='btn-form' type='submit'>Inscription</button>
					</form>
				</div>
			</div>
		</div>
	)
}
