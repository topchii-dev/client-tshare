import React, { useEffect, useState } from 'react';
import { URL } from '../../constants';
import { parseTimestamp } from '../../helpers';
import { useParams } from 'react-router-dom';
import { Card, Image, Button, Input, Form } from 'semantic-ui-react';  // <-- Added Input and Form imports
import '../../css/user-profile.css';
import axios from 'axios';

const UserInfo = () => {
    const { username } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState(null);
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [userData, setUserData] = useState(null);

    async function getUserInfo() {
        try {
            setError(null);
            const response = await fetch(`${URL}/api/users/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('bearerToken')}`
                },
            });

            const data = await response.json();

            if (validateResponse(response)) {
                console.log("Data is valid");
                setUserData(data.data);
            }

        } catch (error) {
            console.log(error);
            console.log('Connection error. Please, try again later.');
        }
    }

    async function updateRequest()
    {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`
        };

        const body = {
            username: username
        }

        try {
            const response = await axios.patch(`${URL}/api/users/${user.id}`, body, {
                headers: headers
            });

            console.log(response);

            const data = await response.data;

            if (validateResponse(response)) {
                console.log(data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    function handleUserUpdate() {
        // If the form is currently editable, submit changes
        // (This is where you'd usually send your data to the backend)
        if (isFormEditable) {
            updateRequest();
        }
        
        // Toggle form editability
        setIsFormEditable(prevState => !prevState);
    }

    function validateResponse(response) {
        if (response.status >= 500) {
            setError('Server Error. Please, try again later.');
            return false;
        }

        if (response.status >= 400 && response.status < 500) {
            setError('Invalid credentials.');
            return false;
        }

        return true;
    }

    function buildProfile() {
        if (user !== null) {
            return (
                <div className='profile-card-wrapper'>
                    <Card>
                        <Image src='' wrapped ui={false} />
                        <Card.Content>
                            <Button 
                                basic 
                                color='black' 
                                compact
                                floated='right'
                                onClick={handleUserUpdate}
                            >
                                {isFormEditable ? 'Submit' : 'Update'}
                            </Button>
                            <Card.Header>
                                {/* Make the field editable based on isFormEditable */}
                                {isFormEditable ? (
                                    <Input 
                                        fluid
                                        transparent 
                                        defaultValue={user.username}
                                        style={{border: 'none', outline: 'none'}} 
                                    />
                                ) : (
                                    user.username ? user.username : 'Undefined'
                                )}
                            </Card.Header>
                            <Card.Meta>
                                <span className='date'>
                                    Joined {parseTimestamp(user.created_at) ? parseTimestamp(user.created_at) : 'Never joined.'}
                                </span>
                            </Card.Meta>
                            <Card.Description>
                                {/* Example for the card description */}
                                {isFormEditable ? (
                                    <Form.TextArea 
                                        defaultValue="It's your card! Go ahead and write something about yourself."
                                        style={{border: 'none', outline: 'none', minHeight: 'initial', padding: '0'}} 
                                    />
                                ) : (
                                    "It's your card! Go ahead and write something about yourself."
                                )}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            );
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        buildProfile()
    );
    
}

export default UserInfo;