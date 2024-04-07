
const initialState = {
    drivers : []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case `GET_DRIVERS`:
            return{
                ...state,
                drivers: action.payload
            }
            default:
                return state;
    }
}


export default rootReducer;
