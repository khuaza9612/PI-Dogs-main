import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDogs} from "../actions";
import {Link} from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(getDogs());
    }, []);	

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }
    return (
        <div>
            <Link to='/dogs'>crear</Link>
            <h1>perros</h1>
            <button onClick={e=>{handleClick(e)}}>cargar</button>
        </div>
    )

}