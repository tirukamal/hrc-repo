import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
    const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', confirmPassword: '', contact: '', emergencyContact: '' });
    const [passwordError, setPasswordError] = useState('');

    const handleSignUpChange = (event) => {
        const { name, value } = event.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();

        if (signUpData.password !== signUpData.confirmPassword) {
            setPasswordError('Password and Confirm Password do not match');
            return; // Stop execution if passwords don't match
        }

        setPasswordError(''); // Reset password error message if passwords match
        onSignUp(signUpData);
    };

    return (
        <div className="form-container-signup sign-up-container">
            <form onSubmit={handleSignUpSubmit}>
                <h1 className='account-signup'>Create Account</h1>
                <div className="infield-signup">
                    <input type="text" placeholder="Name" name="name" value={signUpData.name} onChange={handleSignUpChange} />
                    <label></label>
                </div>
                <div className="infield-signup">
                    <input type="email" placeholder="Email" name="email" value={signUpData.email} onChange={handleSignUpChange} />
                    <label></label>
                </div>
                <div className="infield-signup">
                    <input type="password" placeholder="Password" name="password" value={signUpData.password} onChange={handleSignUpChange} />
                    <label></label>
                </div>
                <div className="infield-signup">
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleSignUpChange} />
                    <label></label>
                </div>
                <div className="infield-signup">
                    <input type="text" placeholder="Contact No." name="contact" value={signUpData.contact} onChange={handleSignUpChange} />
                    <label></label>
                </div>
                <div className="infield-signup">
                    <input type="text" placeholder="Emergency Contact" name="emergencyContact" value={signUpData.emergencyContact} onChange={handleSignUpChange} />
                    <label></label>
                </div>
                <button className='button-signup' type="submit">Sign Up</button>
            </form>
            <div className='color-container-sign'>
               <img id='logo-signup' src="logo.png" alt="" />
               <h1 id='h1-signup' >Welcome Back!</h1>
               <p id='p-signup'>To keep connected with us please </p>
               <p id='p1-signup'> login with your personal info</p>
            </div>
            {passwordError && <p>{passwordError}</p>}
        </div>
    );
};

export default SignUp;
