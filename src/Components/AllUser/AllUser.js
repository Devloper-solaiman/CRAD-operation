import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';



const AllUser = () => {
    const users = useLoaderData()
    const [displayUsers, setDisplayUser] = useState(users)
    const handleUserDelete = user => {
        const agree = window.confirm(`are you want to deleted ${user.name}`)
        if (agree) {
            fetch(`http://localhost:5000/user/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        alert('user deleted successfully')
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUser(remainingUsers)
                    }
                })
        }
    }
    return (
        <div>
            <h1 className='text-center font-bold text-3xl text-emerald-800'>theis is {displayUsers.length} users </h1>
            <h1 className='text-center font-bold  text-emerald-800'><Link className='btn btn-secondary' to='/'>Home</Link></h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='ms-8 font-bold text-2xl'>
                            <td></td>
                            <th>Name</th>
                            <th>address</th>
                            <th>email</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayUsers.map(user => <tr
                                key={user._id}
                            >
                                <td></td>
                                <td>{user.name}</td>
                                <td>{user.address}</td>
                                <td>{user.email}</td>
                                <td><Link to={`/update/${user._id}`} className='btn btn-xs btn-secondary'>Update</Link></td>
                                <td><button onClick={() => handleUserDelete(user)} className='btn btn-xs btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;