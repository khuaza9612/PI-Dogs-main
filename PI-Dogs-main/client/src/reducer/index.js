const initialState = {
    dogs:[],
    allDogs: [],
    filter:[],
    temperaments:[],	//aqui se guardan los temperamentos
    detail:[],
}


function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return {...state, dogs: action.payload,allDogs: action.payload}
            

    case"GET_NAME_DOG":
    return{
        ...state,
        dogs: action.payload,
        

    }
    case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
      
    case "FILTER_CREATED":
        const allBreeds = state.allDogs
        const filterBreeds = action.payload === 'All' 
        ? allBreeds 
        : action.payload === 'created' ? allBreeds.filter(e => e.created) : allBreeds.filter(e => !e.created)
    
       
        return{
            ...state,
            dogs: filterBreeds
        };

        case "ORDER_BY_NAME":
        let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        dogs: sortedArr,
      };
      
    
//     
case 'ORDER_BY_WEIGHT': 
const allDogsW = state.allDogs.filter( e => e.weight_min)
 const orderWeight = action.payload === 'min'
? allDogsW.sort((a , b) =>{
    return a.weight_min - b.weight_min
    }) 
: allDogsW.sort((a,b) =>{
    return b.weight_max - a.weight_max
    })
return{
    ...state,
    dogs: orderWeight
}
    case "POST_DOG":
        return {...state}// SOLO ME DEVUELEVE EL STATE POQUE NO HACE NADA YA QUE TODO ES EN UNA NUEVA RUTA
    case"GET_DETAIL":
    return{
        ...state,
        detail: action.payload
    }

      default:
        return state;
        

    } 
}



export default rootReducer;


