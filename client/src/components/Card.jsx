import React from "react";
import './card.css'

export default function Card({name, image,  weight_min,temperament,weight_max}) {
    return (
     <div className='cards'>
        <div className='card_imagen'>

            <img className='img' src={image.url ? image.url:image||"https://st3.depositphotos.com/9494100/15431/i/600/depositphotos_154313516-stock-photo-pug-dog-with-yellow-constructor.jpg"} alt="img not found" width='100%' />
            
        </div>
        <div className='card_info'>
         <span className="nombre">{name}</span>
         <span className="weight">{weight_min}-{weight_max}KG</span>
         </div>
         <span className="temperament">{temperament}</span>

         {/* <h5>{temperament}</h5> */}

         
         
         
        </div>
     )
    }