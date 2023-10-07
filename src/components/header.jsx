import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react'

const Header = () => {

    function handleItemClick() {
        console.log('Clicked');
    }
    
    return (
      <Menu>
        <Link to="/">
          <Menu.Item name='home'/>
        </Link>

        <Link to="/register">
            <Menu.Item name='register'/>
        </Link>
          
        <Link to="/login">
          <Menu.Item name='log in'/>
        </Link>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
}

export default Header;