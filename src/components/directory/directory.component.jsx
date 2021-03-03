import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectDirectorySections } from '../../redux/directory/directory.selectors'

const Directory = ({ sections }) => {


    return (
        <div className="directory-menu">
            {/* {this.state.sections.map(({ id, title, imageUrl, size, linkUrl }) => {
                    return <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />
                })} */}
            {
                sections.map(({ id, ...otherSectionProps }) => {
                    return <MenuItem key={id} {...otherSectionProps} />
                })
            }
        </div>
    )


}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps, null)(Directory)