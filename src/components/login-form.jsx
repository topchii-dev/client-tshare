import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import {URL, GENERAL_HEADERS} from '../constants';
import '../css/forms.css';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin () {
        try {
            if (!validateForm()) return;
            
            setError(null);
            const response = await fetch(`${URL}/api/login`, {
            method: 'POST',
            headers: GENERAL_HEADERS,
            body: JSON.stringify({
                email: email,
                password: password
            })

        });
        const data = await response.json();

        if (response.status >= 500) {
          setError('Server Error. Please, try again later.');
          return;
        }

        if (response.status >= 400 && response.status < 500) {
          setError('Invalid credentials.');
          return;
        }

        setUserData(data.token, data);
        navigate('/');

        } catch (error) {
            setError('Connection error. Please, try again later.');
        }
    }

    function validateForm() {
        if (email.length === 0) {
            setError('Email is required');
            return false;
        }

        if (password.length === 0) {
            setError('Password is required');
            return false;
        }

        return true;
    }

    function setUserData(token, user) {
        window.localStorage.setItem('bearerToken', token);
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <Form className="auth-form">
            <Form.Field>
                <label>Email</label>
                <input 
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                />
            </Form.Field>
            <Button type='submit' onClick={handleLogin}>Submit</Button>

            {error !== null && <p className='error-message'>{error}</p>}
        </Form>
    )


}

export default LoginForm;