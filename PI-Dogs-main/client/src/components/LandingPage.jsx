import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage() {
    return(
        
        <div className='landing'>
            <header>
        <nav>
          <span className="logo">DOGS</span>
          <Link to="/home" className="acceder">Acceder</Link>
        </nav>
      </header>
     
        <div className='fondo2'>
        
            </div>
    
        </div>
    )
}