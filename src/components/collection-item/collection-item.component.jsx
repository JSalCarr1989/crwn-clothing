import React from 'react'
import './collection-item.styles.scss'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component'
import { addItem } from '../../redux/cart/cart.actions'

const CollectionItem = ({ item, addItem }) => {

    const { name, price, imageUrl } = item

    return (
        <div className="collection-item">

            <div
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted> Add to cart</CustomButton>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({  // esta funcion es nuestra forma de ligar las acciones de redux con nuestros componentes
    addItem: item => dispatch(addItem(item))   // aqui lo que hacemos es definir una funcion que sera pasada a connect
    // para pasarsela a nuestro componente como props para que la pueda ejecutar con dispatch
    // y pasandole un item
})

export default connect(null, mapDispatchToProps)(CollectionItem)