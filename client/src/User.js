import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';



function User(props) {
    let [userInfo, setUserInfo] = useState([])
    let {user_id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${user_id}/posts`)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    return (
        <>
            <div>{userInfo[0] !== undefined ? userInfo[0].postedBy : null}</div>
            <div>
                <h3>Posts:</h3>
                {
                    userInfo.map(post => (
                        <p>{post.text}</p>
                    ))
                }
            </div>
            <Link to="/">AtraS</Link>
        </>
    )
}

export default User