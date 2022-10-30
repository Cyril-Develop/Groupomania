import React from 'react'
import './Connection.css'

export default function Connection() {


	return (
		<div className="container-card">
			<div className='card'>
				<div className="card-left">
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia quasi rem quae deleniti, natus assumenda deserunt minima fugit ratione officia, voluptatum ipsa! Sapiente placeat recusandae molestias totam quaerat eligendi consectetur suscipit! Illum at aut quos harum recusandae eaque esse maxime, hic temporibus reiciendis tempora odio aperiam nesciunt in velit voluptate quaerat, aliquam tempore a culpa pariatur iure doloremque ut! Beatae!</p>
				</div>
				<div className="card-right">
					<form>
						<div className='form-control'>
							<label htmlFor="lastname">Lastname</label>
							<input type="text" name="lastname" id="lastname" required/>
						</div>
						<div className='form-control'>
							<label htmlFor="firstname">Firstname</label>
							<input type="text" name="firstname" id="firstname" required/>
						</div>
						<div className='form-control'>
							<label htmlFor="email">Email</label>
							<input type="text" name="email" id="email" required/>
						</div>
						<div className='form-control'>
							<label htmlFor="password">Password</label>
							<input type="text" name="password" id="password" required/>
						</div>
						<div className='form-control'>
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input type="text" name="confirmPassword" id="confirmPassword" required/>
						</div>
						<button type='submit'>Register</button>
					</form>
				</div>
			</div>
		</div>
	)
}
