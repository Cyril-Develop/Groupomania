import React from 'react'
import './register.scss'
import Logo from '../../assets/logo-groupo.svg'
import {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

    /////////////////////////////////////////////////////////
	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

    ////////////////////////////////////////////////////////

    const [inputs, setInputs] = useState({
        lastname : '',   
        firstname : '',
        email : '',
        password : '',
    })

    //Récupére les données du formulaire
    const handleChange = e => {
        setInputs((previous) => ({...previous, [e.target.name]: e.target.value}))
    }

    const handleClick = e => {
        e.preventDefault();
          
          fetch('http://localhost:8080/api/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(inputs)
          })
          .then(response => response.json())
          .then(data => console.log(data))

    }

	return (
		<div className="register">
			<div className='card'>
				<div className="card_right">
					<img src={Logo} alt="logo groupomania" />
					<p>Déjà inscrit ? <Link to='/login'><a href='/login'>se connecter</a></Link></p>
				</div>
				<div className="card_left">
					<h2>Inscription</h2>
					<form className='form'>
                    <div className='form_control'>
							<input type="text" name="lastname" id="lastname" onChange={handleChange} required/>
							<label htmlFor="lastname">Nom</label>
						</div>
						<div className='form_control'>
							<input type="text" name="firstname" id="firstname" onChange={handleChange} required/>
							<label htmlFor="firstname">Prénom</label>
						</div>
						<div className='form_control'>
							<input type="email" name="email" id="email" onChange={handleChange} required/>
							<label htmlFor="email">Email</label>
						</div>
						<div className='form_control'>
							<div onClick={() => togglePassword()} className={showPassword ? "close-eye" : "open-eye"}></div>
							<input type={showPassword ? "text" : "password"} name="password" id="password" onChange={handleChange} required/>
							<label htmlFor="password">Mot de passe</label>
						</div>
						<button onClick={handleClick} type='submit'>Valider</button>
					</form>
				</div>
			</div>
		</div>
	)
}
