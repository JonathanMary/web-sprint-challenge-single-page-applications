import React from 'react'
import { Link } from 'react-router-dom'


export default function Homepage() { 

    return (
        <div className='homepage'>
            <h2>Your favorite food, delivered while coding!</h2>
            <Link to='/pizza' className='homepage-link'>Pizza?</Link>
        </div>
    )
}