import React, { Component, useEffect, useState } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import {URL} from '../constants';

const Home = () => {
    const [user, setUser] = useState(null);

    async function checkAuthorization() {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }

    useEffect(() => {
        checkAuthorization();
    }, []);

    console.log(user);
    useEffect(() => {
        console.log(localStorage.getItem('user'));
        console.log(localStorage.getItem('bearerToken'));
    }, [user]);

    return (
        <h3>Hello, {user == null ? 'guest' : user.username}</h3>
    )
    
}

export default Home;