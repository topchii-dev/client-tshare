import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const RegisterForm = () => {

    return (
        <Form>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' />
            </Form.Field>
            <Button type='submit'>REGISTER</Button>
        </Form>
    )
}

export default RegisterForm;