import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import {URL} from '../constants';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    async function checkAuthorization() {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
    }

    useEffect(() => {
      checkAuthorization();
    }, []);

    async function handleLogout() {
        try {
            const response = await fetch(`${URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearerToken')}`
            },
        });
        const data = await response.json();
        if (response.status >= 400) {
          console.log('Invalid creds');
          return;
        }
        console.log(data);

        localStorage.removeItem('bearerToken');
        localStorage.removeItem('user');
        setUser(null);

        navigate('/');

        } catch (error) {
            console.log('Connection error. Please, try again later.');
        }
    }
    
    return (
      <Menu>
        <Link to="/">
          <Menu.Item name='home'/>
        </Link>
  
        <Menu.Menu position='right'>
          {user == null && 
          <>
          
           <Link to="/register">
              <Menu.Item name='register'/>
            </Link>
          
            <Link to="/login">
              <Menu.Item name='log in'/>
            </Link>

          </>      
          }
          {user != null && 
            <Menu.Item
              name='logout'
              onClick={handleLogout}
            />
          }
        </Menu.Menu>
      </Menu>
    );
}

export default Header;