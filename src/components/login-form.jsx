import React, { Component, useState } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {URL, GENERAL_HEADERS} from '../constants';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin () {
        try {
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
        console.log(response);

        } catch (error) {
            setError('Connection error. Please, try again later.');
        }
    }

    return (
        <Form>
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

            {error !== null && <p>{error}</p>}
        </Form>
    )
}

export default LoginForm;