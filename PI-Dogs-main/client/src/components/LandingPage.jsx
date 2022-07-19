import React from 'react';
import {Link} from 'react-router-dom'
import '../styles/LandingPage.css'

export default function LandingPage() {
    return(
        <div className='landing'>
            <h1 className='welcome'>-</h1>
            <Link to ='/home'>
                <button className='button'>INGRESAR A MI PLANETA</button>
            </Link>
        </div>
    )
}