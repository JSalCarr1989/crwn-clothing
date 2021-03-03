import React from 'react'

import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'

import { connect } from 'react-redux'

import { selectCollection } from '../../redux/shop/shop.selectors'


const CollectionPage = ({ collection }) => {

    const { title, items } = collection
    return (
        <div className="collection-page">
            <h2 className='title'>{title}</h2>

            <div className='items'>

                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }

            </div>

        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({ // ownProps son las props que recibe el componente en este caso el match de react router
    collection: selectCollection(ownProps.match.params.collectionId)(state) // esta sintaxis es porque el selector es una funcion que retorna una funcion
}) // aqui cambiamos la estrategia , usamos el segundo parametro de mapstatetoprops 
// tambien en la llamada a nuestro selector pasamos el state ya que lo necesitamos

export default connect(mapStateToProps)(CollectionPage)