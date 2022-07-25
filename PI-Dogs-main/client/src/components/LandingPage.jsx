import React from 'react';
import {Link} from 'react-router-dom'


export default function LandingPage() {
    return(
        <div className='landing'>
            <h1 className='welcome'>-</h1>
            <Link to ='/home'>
                <button className='button'>INGRESAR A MI</button>
            </Link>
        </div>
    )
}