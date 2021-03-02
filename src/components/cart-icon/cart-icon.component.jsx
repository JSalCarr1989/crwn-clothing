import React from 'react'
import { ReactComponent as ShopingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'


const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShopingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>

    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
}) //esto es un redux selector , este codigo se esta ejecutando siempre que se pasan nuevas props , we dont want to 
// re render components en cada render , aqui podemos usar memoization , instalando reselect

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)