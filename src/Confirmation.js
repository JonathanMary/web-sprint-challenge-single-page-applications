import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function Validation(props) { 
    //const location = useLocation();
    const param = useParams();

    useEffect(() => {
        console.log(param);
    }, [])

    return (
        <h2>Validation</h2>
    )
}