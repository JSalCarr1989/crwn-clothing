import { createSelector } from 'reselect'

const selectCar = state => state.cart; // tomamos una parte del state: el cart

export const selectCartItems = createSelector(
    [selectCar],
    (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCar],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity, 0
    )

)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity * cartItem.price, 0
    )
)