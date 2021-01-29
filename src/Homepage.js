import React from 'react'
import { Link } from 'react-router-dom'


export default function Homepage() { 

    return (
        <div className='homepage'>
            <Link to='/pizza'>Pizza?</Link>
        </div>
    )
}