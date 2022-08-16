import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import styles from './DogDetails.module.css'



export default function Detail(props) {
  const id = props.match.params.id;
  console.log(id)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const dog = useSelector((state) => state.detail);
  console.log(dog);
  return (
    <div >
   
      {dog ? (
                    <div>
                      
                    <div className={styles.containerTotal}>
                      
                        <div className={styles.imgTotal}>
                          
                           
                        </div>
                        
                        <div className={styles.container}>
                     
                        <div>
                        <Link to="/home">
        <button className={styles.button_crear_perr2}>Home 🏠</button>
      </Link></div>
                        <img className='img' src={dog.image?.url ? dog.image?.url:"https://st3.depositphotos.com/9494100/15431/i/600/depositphotos_154313516-stock-photo-pug-dog-with-yellow-constructor.jpg"} alt="img not found" width='100%' />
                            <h2 className="nombre"> {dog.name} </h2>
                            
                            <p>Height Min: {dog.height_min} cm</p>
                            <p>Height Max: {dog.height_max} cm</p>
                            <p>Weight Min: {dog.weight_min} kg</p>
                            <p>Weight Max: {dog.weight_max} kg</p>
                            <p>Life Span: {dog.life_span}{dog.life_span_min}-{dog.life_span_max} </p>
                            <p>Temperament: {dog.temperaments}  </p>
                            <p>{dog.temperament}  </p>
                        </div>
                        </div>
                        </div>
                        
    
        
      ) : (
        <h1>Not Found</h1>
      )}
      
    </div>
  );
}