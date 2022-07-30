import React from "react";
import './card.css'

export default function Card({name, image,  weight_min,temperament,weight_max}) {
    return (
     <div className='cards'>
        <div className='card_imagen'>

            <img className='img' src={image?.url ? image?.url:"https://www.creativefabrica.com/wp-content/uploads/2020/09/01/Dog-paw-vector-icon-logo-design-heart-Graphics-5223218-1.jpg"} alt="img not found" width='100%' />
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