import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData()
    const navigate = useNavigate()
    const [users, setUsers] = useState(storedUser)

    const handleUpdateUser = event => {
        event.preventDefault();
        // console.log(users);
        fetch(`http://localhost:5000/user/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user Updated')
                }
                console.log(data);
                navigate('/alluser')
            })
    }
    const handleInputChange = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newusers = { ...users }
        newusers[field] = value
        setUsers(newusers);
    }
    return (
        <div>
            <h2>Plese Update: {storedUser.name} </h2>
            <form onSubmit={handleUpdateUser}>
                <input onBlur={handleInputChange} defaultValue={storedUser.name} className='border font-bold text-2xl rounded-lg my-6' type="text" name="name" placeholder='name' required /><br />
                <input onBlur={handleInputChange} defaultValue={storedUser.address} className='border font-bold text-2xl' type="text" name="address" placeholder='address' required /><br />
                <input onBlur={handleInputChange} defaultValue={storedUser.email} className='border my-5 font-bold text-2xl' type="email" name="email" placeholder='email' required /><br />
                <input className='btn btn-primary ms-10 font-bold text-2xl' type="submit" value='Update user' id="submit" />
            </form>
        </div>
    );
};

export default Update;