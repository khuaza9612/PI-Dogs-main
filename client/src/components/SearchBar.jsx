import {React, useState} from 'react'
import {useDispatch} from 'react-redux'
import { getNameDog } from '../actions/index.js'
import './SearchBar.css';




export default function SearchBar(
) {
    const dispatch = useDispatch()
    const [name, setName]= useState('')
    
    function handleInputChange(e){ 
        e.preventDefault()
        setName(e.target.value)// aggarro el valor del input y lo guardo en el estado local
        console.log(name)
       }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDog(name))
    }

    

    return (
        <div className='buscar'>
            <input type='text' placeholder='Find your breed'  onChange={(e) => handleInputChange(e)}/>
            <image> </image>
            <button className="acceder"type= 'submit' onClick={(e) => handleSubmit(e)} >🔍Search 🐾</button>
            
        </div>
    )
}