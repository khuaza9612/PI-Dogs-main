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
          let temperaments = await axios.get(`/temperaments`)
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

  export function filterCreated(payload) {
    return{
        type: 'FILTER_CREATED',
        payload

    }
}