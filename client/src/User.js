import React from 'react';
import { useParams } from 'react-router-dom';



function User(props) {
    let params = useParams()
    return (
    <div>{params.id77777777}</div>
    )
}

export default User