const INITIAL_STATE = {

    currentUser: null

}
// un reducer siempre regresa un nuevo objeto como estado para desencadenar un render de los componentes.
const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'SET_CURRENT_USER':

            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state

    }

}

export default userReducer

