import {React, useState} from 'react'
import {useDispatch} from 'react-redux'
import { getNameDog } from '../actions/index.js'




export default function SearchBar(
) {
    const dispatch = useDispatch()
    const [name, setName]= useState('')
    
    function handleInputChange(e){ 
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
       }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDog(name))
    }

    

    return (
        <div>
            <input type='text' placeholder='Find your breed'  onChange={(e) => handleInputChange(e)}/>
            <button type= 'submit' onClick={(e) => handleSubmit(e)} >Search 🦴</button>
        </div>
    )
}