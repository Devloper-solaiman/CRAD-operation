import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
    const [users, setUsers] = useState([])

    const handleAddUser = event => {
        event.preventDefault();
        console.log(users);

        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Your data is saved',
                        showConfirmButton: false,
                    })
                    event.target.reset()
                }
                console.log(data)
            })

    }
    const handleInputBlur = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newusers = { ...users }
        newusers[field] = value
        setUsers(newusers);
    }
    return (
        <>
            <h2 className="card-title text-5xl font-bold ms-96 mt-10">please add a user</h2>
            <Link className='btn  ms-96 mt-10 btn-secondary' to='/alluser'>Users</Link>
            <div className='hero'>
                <form onSubmit={handleAddUser}>
                    <input onBlur={handleInputBlur} className='border font-bold text-2xl rounded-lg my-6' type="text" name="name" placeholder='name' required /><br />
                    <input onBlur={handleInputBlur} className='border font-bold text-2xl' type="text" name="address" placeholder='address' required /><br />
                    <input onBlur={handleInputBlur} className='border my-5 font-bold text-2xl' type="email" name="email" placeholder='email' required /><br />
                    <input className='btn btn-primary ms-10 font-bold text-2xl' type="submit" value='Add user' id="submit" />
                </form>
            </div>
        </>
    );
};

export default Home;