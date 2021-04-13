import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../withSpinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'



const mapStateToProps  = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

// export default CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview)) // esto es un problema no es legible 


// usamos compose para arreglar esto 

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)   // se lee de izquierda a derecha --- withSpinner --> connect permite evaluar multiples funciones curried

export default CollectionsOverviewContainer

