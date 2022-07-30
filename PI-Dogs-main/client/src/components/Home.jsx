import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
  import {getDogs, getTemperaments,filterCreated,orderByName,orderByWeight,getDetail } from "../actions/index.js";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import Detail   from "./Detail.jsx";
import './Home.css';
import SearchBar from "./SearchBar.jsx";

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1);// estados locales pagina donde empieza   y el numero de elementos por pagina
    const [dogsPerPage,setDogsPerPage] = useState(8);// NUMERO DE ELEMENTOS EN LA PAGINA
    const indexOfLastDog = currentPage * dogsPerPage;// INDEX DE LA ULTIMA PAGINA
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;// INDEX DEl ultimo personaje de la pagina
     //1----------0---------6
    //2----------1---------13
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);// ARRAY DE LOS PERSONAJES actuales dividir un arreglo lo que le pase por parametro
    const [, setOrden] = useState("");
    const [, setOrden2] = useState("");
    
   
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
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);// estado local vacio
      }
      
  function handleOrderWeight(e) {
    e.preventDefault()
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1)
    setOrden2(`Ordenado ${e.target.value}`)
    
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

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
            </div>
            
            <div className="custom-select">
                <select onChange={e=> handleSort(e)} className="select">
                    <option value="asc">ascendente</option>
                    <option value="desc">Desendente</option>

                </select>
               
                <select  onChange={e => handleOrderWeight(e)} className="select">
                <option selected disabled>selecciona uno</option>
                        <option value='min'>Weight min</option>
                        <option value='max'>Weight max</option>
                    </select><br/>
    

                <select onChange={e=> handleFilterCreated(e)}>
                    <option value="All">todos</option>
                    <option value="created">creado</option>
                    <option value="api">api</option>

                </select>
               
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
            <div>
                
            </div>
           
                
        </div>
    )

}