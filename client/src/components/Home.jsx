import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
  import {getDogs, getTemperaments,filterCreated,orderByName,orderByWeight,getDetail,filterTemperaments, } from "../actions/index.js";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";

import './Home.css';
import SearchBar from "./SearchBar.jsx";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);// me traen todo el estado dog
    const temperaments = useSelector((state) => state.temperaments); // me trae todo el estado temperament
    const [currentPage, setCurrentPage] = useState(1);// estados locales pagina donde empieza   y el numero de elementos por pagina
    const [dogsPerPage,setDogsPerPage] = useState(8);// NUMERO DE ELEMENTOS EN LA PAGINA
    const indexOfLastDog = currentPage * dogsPerPage;// INDEX DE LA ULTIMA PAGINA
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;// INDEX DEl ultimo personaje de la pagina
     //1----------0---------6
    //2----------7---------15
    // marcando estados locales
    
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);// ARRAY DE LOS PERSONAJES actuales dividir un arreglo lo que le pase por parametro
                               // desde el 0-6
    const [, setOrden] = useState("");
    
    
    
   
    const paginado = (pageNumber) => {setCurrentPage(pageNumber)};// constanre  para cambiar de pagina
    useEffect(() => {// traer del estado todo cuando se monta el componente
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
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);// modifical el estadi estado local para q ordene
      }
      
  function handleOrderWeight(e) {
    e.preventDefault()
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
    
  }

  function handleFilterTemperaments(e) {
    e.preventDefault()
    dispatch(filterTemperaments(e.target.value))
    setCurrentPage(1)
    
    
    
  
}

    return (
        <div className="fondo">
            <SearchBar/>
            <div>
                <button className="cargar"onClick={e=>{handleClick(e)}}>🔁​Actualizar🐶​</button>
                <Link to="/create" >
                <button className="button_crear_perro">🔁​Crear🐶​</button>
                </Link>
            </div>
            <div className="paginado">

            <Paginado dogsPerPage={dogsPerPage} 
        allDogs={allDogs.length} 
        paginado={paginado} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}/>
            </div>
            
            <div id="select" value="select" className="custom-select">
                <h1 className="h1"><img className="icon_filtro" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQ1lSD0uLlZgNmIulTaAy1UHPY7LsL6A_sg&usqp=CAU"alt="" />Filtros</h1>
                <select onChange={e=> handleSort(e)} className="select">
                <option selected disabled>Nombre ⏬</option>
                    <option  className="option"value="asc">A-Z⏬</option>
                    <option value="desc" className="option">Z-A⏬</option>

                </select>
                <br></br>
                <select  onChange={e => handleOrderWeight(e)} className="select">
                <option selected disabled>Peso ⏬</option>
                        <option value='min'className="option">Weight Min⏬</option>
                        <option value='max'className="option">Weight Max⏬</option>
                    </select>
                    <br></br>
                    <select onChange={e=> handleFilterTemperaments(e)} className="select">
                <option selected disabled>Temperamento ⏬</option>
                <option value='All'>All Temperaments</option>
                        {temperaments && temperaments.map(e => (
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                        )}
                    
                </select>
                    <select onChange={e=> handleFilterCreated(e)} className="select">
                <option selected disabled>Creados ⏬</option>

                    <option value="All">Todos ⏬</option>
                    <option value="created">Creado ⏬</option>
                    <option value="api">Api ⏬</option>

                </select>
                    
    

                

              
            </div>
                <div>
               
                <div className="doggys">
                {currentDogs?.map((el)=>{
                    return(
                        <Fragment>
                        <Link to={"/dogs/"+el.id } className="link">
                        
                    <Card key={el.id} name={el.name}image={el.image} weight={el.weight} temperament={el.temperament} weight_min={el.weight_min} weight_max={el.weight_max} />
                    </Link>
                        </Fragment>
                    );
                })}
                </div>
                
                    
            </div>
          
                
            </div>
           
                
        
    )

}