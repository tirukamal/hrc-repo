import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './SignIn.css';

const SignIn = () => {
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSignInChange = (event) => {
        const { name, value } = event.target;
        setSignInData({ ...signInData, [name]: value });
    };

    const handleSignInSubmit = (event) => {
        event.preventDefault();
        if (signInData.email === 'admin@gmail.com' && signInData.password === 'admin') {
       
            navigate('/Dashboard');
        } else {
            setError('Username or password is incorrect');
        }
    };

    const handleRegisterButtonClick = () => {
        // Redirect to SignUp page
        navigate('/SignUp');
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSignInSubmit}>
                <h1 id="signin">Sign in</h1>
                <div className="infield">
                    <h3>Email :</h3>
                    <input type="email" name="email" placeholder="Email" value={signInData.email} onChange={handleSignInChange} />
                </div>
                <div className="infield">
                    <h3>Password :</h3>
                    <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleSignInChange} />
                    <Link to="/forgotpassword" className="forgot-password-link-signin">Forgot Password?</Link>
                </div>
                <button type="submit" id='submit'>Sign In</button>
            </form>
            {error && <div className="error">{error}</div>}
            <div className='color-container-signin'>
                <img id='logo' src="logo.png" alt="" />
                <h1 id='h1-signin'>Hello, Friend!</h1>
                <p id='p-signin'>Enter your personal details and </p>
                <p id='p1-signin'> start journey with us</p>
                <button className="signup-button-signin" onClick={handleRegisterButtonClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignIn;
