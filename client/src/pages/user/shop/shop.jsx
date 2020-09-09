import React, {Fragment, useEffect } from 'react';
import {connect} from 'react-redux'
import { getCollections } from "../../../redux/collection/collection-action"; 
import PropTypes from "prop-types"

import Collection from "../../../components/collection/collection";
import './shop.scss';


const Shop = ({collection:{collections,loading},getCollections}) => {
    useEffect(() => {
        getCollections()
      }, [getCollections]);

    const data = collections && !loading ? collections : [];

    const colletionData =  data.map(({_id,collectionPhoto,...otherProps}) => (
        <Collection key={_id} {...otherProps}></Collection>
    ))


        return (
            <Fragment>
               <div className="collections">
                {
                    colletionData
                }
            </div>
            </Fragment>
            
        )
}

Shop.propTypes = {
    getCollections: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAdmin: state.auth.isAdmin,
    collection: state.collection
})

export default connect(mapStateToProps,{getCollections})(Shop)
