import React from "react";
import './card.css'

export default function Card({name, image, weight,temperament}) {
    return (
     <div className='cards'>
         <div className='flex'>
         <h3>{name}</h3>
         <h3>{temperament}</h3>

         {/* <h5>{temperament}</h5> */}
         <h5>{weight.metric}</h5>
         </div>
         <img className='img' src={image?.url ? image?.url:"https://www.creativefabrica.com/wp-content/uploads/2020/09/01/Dog-paw-vector-icon-logo-design-heart-Graphics-5223218-1.jpg"} alt="img not found" width='100%' />
     </div>
     )
    }