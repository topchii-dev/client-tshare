import React, { Component, useEffect, useState } from 'react'
import {URL} from '../../constants';
import {parseTimestamp} from '../../helpers';
import { useParams } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import '../../css/user-profile.css';

const UserInfo = () => {
    const { username } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState(null);

    async function getUserInfo() {
        try {
            setError(null);
            console.log(user)
            const response = await fetch(`${URL}/api/users/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('bearerToken')}`
                },
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

        } catch (error) {
            console.log('Connection error. Please, try again later.');
        }
    }

    function buildProfile() {
        if (user !== null) {
            return (
                <div className='profile-card-wrapper'>
                <Card>
                    <Image src='' wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{user.username ? user.username : 'Undefined'}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined {parseTimestamp(user.created_at) ? parseTimestamp(user.created_at) : 'Never joined.'}</span>
                    </Card.Meta>
                    <Card.Description>
                        It's your card! Go ahead and write something about yourself.
                    </Card.Description>
                    </Card.Content>
                </Card>
                </div>
            )
        }
    }

    useEffect(() => {
        getUserInfo();
    });

    return (
        buildProfile()
    );
    
}

export default UserInfo;