import { Button, Form } from 'semantic-ui-react'
import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {URL} from '../constants';
import '../css/forms.css';
import '../css/forms.css';

const RegisterForm = () => {
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setEmailValid] = useState(true);
    const [isUsernameValid, setUsernameValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);

    const navigate = useNavigate();

    async function handleRegister () {
        try {
            setError(null);
            if (!validateForm()) return;

            const response = await fetch(`${URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('bearerToken')}`
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username
                })
            });
            const data = await response.json();

            if (response.status >= 500) {
            console.log('Server Error. Please, try again later.');
            return;
            }

            if (response.status >= 400 && response.status < 500) {
                console.log('Invalid data.');
                return;
            }

            console.log(data);

            setUserData(data.token, data);
            console.log(localStorage.getItem('bearerToken'));
            navigate('/');

        } catch (error) {
            console.log('Connection error. Please, try again later.');
        }
    }

    function setUserData(token, user) {
        window.localStorage.setItem('bearerToken', token);
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    function validateForm() {
        let isValid = true;

        if (email.length === 0) {
            setError('Email is required');
            setEmailValid(false);
            isValid = false;
        } else {
            setEmailValid(true);
        }

        if (password.length === 0) {
            setError('Password is required');
            setPasswordValid(false);
            isValid = false;
        } else {
            setPasswordValid(true);
        }

        if (username.length === 0) {
            setError('Username is required');
            setUsernameValid(false);
            isValid = false;
        } else {
            setUsernameValid(true);
        }

        return isValid;
    }


    return (
        <Form className="auth-form">
            <Form.Field>
                <label>Username</label>
                <input 
                    className={isUsernameValid ? "" : "invalid-input"}
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input 
                    className={isEmailValid ? "" : "invalid-input"}
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input 
                    className={isPasswordValid ? "" : "invalid-input"}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Field>
            <Button type='submit' onClick={handleRegister}>Submit</Button>

            {error !== null && <p className='error-message'>{error}</p>}
        </Form>
    )
}

export default RegisterForm;