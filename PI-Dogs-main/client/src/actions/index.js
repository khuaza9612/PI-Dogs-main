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

export function getTemperaments(payload) {
    return async function (dispatch) {
      try {
          let temperaments = await axios.get(`http://localhost:3001/temperaments`)
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
    return async function (dispatch) {
          let dogs = await axios.post(`http://localhost:3001/dogs`, payload)// pendiente ruta back
          // en esta ruta queero hacer el post del payload que me llega desde del front
          console.log(dogs)
          return dogs
              
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