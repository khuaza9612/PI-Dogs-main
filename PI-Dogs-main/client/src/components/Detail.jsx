import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";


export default function Detail(props) {
  const id = props.match.params.id;
  console.log(id)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);
  console.log(myDog);
  return (
    <div className="detail_backg">
      {myDog ? (
        <div className="detalle">
          <h1 className="palabra">Perro:{myDog.name}</h1>
          <img
            className="detail_image"
            src={myDog.image?.url ? myDog.image?.url : "https://aristopet.com/wp-content/uploads/2016/11/sindrome-del-perro-negro-the-black-dog-project-aristopet-2.jpg"}
            alt=""
            width="40%"
            height="40%"
          />
          {/* <h2 className="palabra">Altura: {myDog.height?.metric}</h2>
          <h3 className="palabra">Peso: {myDog.weight?.metric}</h3>
          <h4 className="palabra">Temperamentos:{myDog.temperament} </h4>
          <h5 className="palabra">Años de vida: {myDog.life_span}</h5> */}
          {console.log(myDog)}
        </div>
      ) : (
        <h1>Not Found</h1>
      )}
      <Link to="/home">
        <button className="botone">❌</button>
      </Link>
    </div>
  );
}