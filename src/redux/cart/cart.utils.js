export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCarItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    if (existingCarItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]

}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {

    const existingCarItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)

    if (existingCarItem.quantity === 1) { // si la cantidad es uno quitamos el item de la lista
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map( // si la cantidad no es uno , restamos la cantidad del item
        cartItem =>
            cartItem.id === cartItemToRemove.id ?
                { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
    )

}