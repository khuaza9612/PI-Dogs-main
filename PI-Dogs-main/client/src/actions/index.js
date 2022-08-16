import axios from 'axios';

export function getDogs(){
  return async function(dispatch) {
      try {
      const res = await axios.get('http://localhost:3001/dogs',{
        
      })
      return dispatch ({
          type: 'GET_DOGS',
          payload: res.data
      })
      } catch (error) {
          console.log(error)
      }
  }
}

export function getTemperaments(payload ) {
    return async function (dispatch) {
      try {
          const temperaments = await axios.get(`http://localhost:3001/temperaments`)
          return dispatch({
              type: 'GET_TEMPERAMENTS',
              payload: temperaments.data
          })
      }
      catch (err) {
          console.log(err);
      }
  }
  }
  export function postDogs(payload) {
    return async function(dispatch) {
        try {
          await axios.post("http://localhost:3001/dogs", payload);
          alert("perro creado correctamente")
          return dispatch({
            type: 'POST_DOGS',
          })
        } catch (error) {
          console.log(error)
          alert("perro no creado")
        }
      }
    }
  


  export function filterCreated(payload) {
    return{
        type: 'FILTER_CREATED',
        payload

    }
}
export function orderByName(payload) {
    return{
        type: 'ORDER_BY_NAME',
        payload

    }
}
export function orderByWeight(payload) {
    return {
      type: 'ORDER_BY_WEIGHT',
      payload
    }
  }
  export function getNameDog(name) {
    return async function (dispatch) {
        try{ var json=await axios.get(`http://localhost:3001/dogs?name=`+name)
        return dispatch({
            type: 'GET_NAME_DOG',
            payload: json.data
        })
        }
        catch(err){
          alert("perro no creado")
            console.log(err)
        }
  }
}
export function getDetail(id){
    return async function(dispatch){
        try{
            let json=await axios.get(`http://localhost:3001/dogs/`+id)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }
        catch(err){
            console.log(err)
        }
    }

    
}
export function filterTemperaments(payload){
  return {
      type: 'FILTER_TEMPERAMENTS',
      payload
  }
}
          
           
