import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
  import {getDogs, getTemperaments,filterCreated  } from "../actions/index.js";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import './Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1);// estados locales pagina donde empieza   y el numero de elementos por pagina
    const [dogsPerPage,setDogsPerPage] = useState(8);// NUMERO DE ELEMENTOS EN LA PAGINA
    const indexOfLastDog = currentPage * dogsPerPage;// INDEX DE LA ULTIMA PAGINA
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;// INDEX DEl ultimo personaje de la pagina
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);// ARRAY DE LOS PERSONAJES actuales dividir un arreglo lo que le pase por parametro
    //1----------0---------6
    //2----------1---------13
    const paginado = (pageNumber) => {setCurrentPage(pageNumber)};// funcion para cambiar de pagina
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);	

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }
    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);

    }

    return (
        <div className="fondo">
            <Link to='/dogs'>crear</Link>
            <h1>perros</h1>
            <button onClick={e=>{handleClick(e)}}>cargar</button>
            <div>
                <select>
                    <option value="asc">ascendente</option>
                    <option value="desc">Desendente</option>

                </select>

                <select onChange={e=> handleFilterCreated(e)}>
                    <option value="All">todos</option>
                    <option value="created">creado</option>
                    <option value="api">api</option>

                </select>
               
                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                <div className="doggys">
                {currentDogs?.map((el)=>{
                    return(
                        <Fragment>
                        <Link to={"/home/"+el.id}>
                        
                    <Card key={el.id} name={el.name}image={el.image} weight={el.weight} temperament={el.temperament} />
                    </Link>
                        </Fragment>
                    );
                })}
                </div>

            
                    
            </div>
        </div>
    )

}