import React, { useState } from 'react';
import style from './login.css';
import { loginUser, verifyOtp } from "../../apiService/api";

const Login = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1); // 1 for login, 2 for OTP verification

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (!phone && !email) {
            setErrorMessage('Phone no. or email is required!');
            return;
        }

        try {
            const response = await loginUser(email, phone);

            // Store data in localStorage
            localStorage.setItem('hash', response.hash);
            localStorage.setItem('phone', response.phone);
            localStorage.setItem('email', response.email);

            // Move to the next step
            setStep(2);

        } catch (error) {
            if (error.response) {
                console.error('Login failed:', error.response.data.message);
                setErrorMessage(error.response.data.message);
            } else {
                console.error('Login failed:', error.message);
                setErrorMessage('Failed to login. Please try again later.');
            }
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();

        const hash = localStorage.getItem('hash');
        const phone = localStorage.getItem('phone');
        const email = localStorage.getItem('email');

        try {
            const response = await verifyOtp(hash, otp, phone, email);
            console.log('OTP verified successfully:', response);
        } catch (error) {
            if (error.response) {
                console.error('OTP verification failed:', error.response.data.message);
                setErrorMessage(error.response.data.message);
            } else {
                console.error('OTP verification failed:', error.message);
                setErrorMessage('Failed to verify OTP. Please try again later.');
            }
        }
    };

    return (
        <div className='login-section'>
            <h1>Let's get started</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form">
                {step === 1 ? (
                    <form className="form" onSubmit={handleLoginSubmit}>
                        <input
                            type="text"
                            placeholder='+916367562964'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder='sidharthverma@dailyobjects.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type='submit'>Login</button>
                    </form>
                ) : (
                    <form className="form" onSubmit={handleOtpSubmit}>
                        <input
                            type="text"
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button type='submit'>Enter OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;