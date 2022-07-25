const initialState = {
    dogs:[],
    allDogs: [],

}


function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return {...state, dogs: action.payload,allDogs: action.payload}
    
    case "GET_TEMPERAMENTS":
      const temps = action.payload.filter((d) => d.name !== "");
      return {
        ...state,
        temperaments: temps,
      };
    case "FILTER_CREATED":
        const allBreeds = state.allDogs
        const filterBreeds = action.payload === 'All' 
        ? allBreeds 
        : action.payload === 'created' ? allBreeds.filter(e => e.created) : allBreeds.filter(e => !e.created)
    
       
        return{
            ...state,
            dogs: filterBreeds
        }
      

      default:
        return state;

    } 
}



export default rootReducer;


