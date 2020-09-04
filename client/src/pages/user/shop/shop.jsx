import React, { useState, Fragment } from 'react';
import Collection from "../../../components/collection/collection";
import './shop.scss';
// import Modal from "../../../shared/modal/modal";
// import { useRef } from 'react';
// import FormInput from "../../../components/form-input/form-input";
// import CustomButton from "../../../components/custom-button/custom-button";

import {connect} from "react-redux"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom';


const Shop = ({isAdmin}) => {
    const [state] = useState({
        collectionName:'',
        collectionPhoto:'',
        collections:[
            {
                collectionName:"Cat",
                collectionImage: require('../../../assets/img/cat.jpg'),
                id:1
            },
            {
                collectionName:"Dog",
                collectionImage: require('../../../assets/img/dog.jpg'),
                id:2
            },
            {
                collectionName:"Fish",
                collectionImage: require('../../../assets/img/fish.jpg'),
                id:3
            },
            {
                collectionName:"Cat",
                collectionImage: require('../../../assets/img/cat.jpg'),
                id:4
            },
            {
                collectionName:"Dog",
                collectionImage: require('../../../assets/img/dog.jpg'),
                id:5
            },
            {
                collectionName:"Fish",
                collectionImage: require('../../../assets/img/fish.jpg'),
                id:6
            },
            {
                collectionName:"Cat",
                collectionImage: require('../../../assets/img/cat.jpg'),
                id:7
            },
            {
                collectionName:"Dog",
                collectionImage: require('../../../assets/img/dog.jpg'),
                id:8
            },
            {
                collectionName:"Fish",
                collectionImage: require('../../../assets/img/fish.jpg'),
                id:9
            },
        ]
    })

    // const {collectionName} = state;

    // const modalRef = useRef();

    // const openModal = () => {
    //     modalRef.current.openModal()
    // }
    
    // const onChange = e => setstate({...state,[e.target.name]:e.target.value});
    // const onChangeFile = e => setstate({...state,[e.target.name]:e.target.files[0]});

    // const onSubmit = e => {
    //     e.preventDefault();
    //     console.log(state)
    // }
    if(isAdmin === 'admin'){
        return <Redirect to='/admin'/>
    }

        return (
            <Fragment>
               {/* <Modal ref={modalRef}>
                   <h2>Add Collection</h2>
                   <form action="" onSubmit={e => onSubmit(e)}>
                        <FormInput  type="text" name="collectionName" value={collectionName} onChange={e => onChange(e)} label="Collection Name" required/>
                        <FormInput type="file" name="collectionPhoto" onChange={e => onChangeFile(e)}  required />
                        <CustomButton type="submit" value="Submit">Add</CustomButton>
                   </form>
               </Modal>  */}
               <div className="collections">
                {/* <div className="addCollection" onClick={openModal}>
                
                </div> */}
                {
                    state.collections.map(({id,...otherProps}) => (        
                        <Collection key={id} {...otherProps}></Collection>
                    ))
                }
            </div>
            </Fragment>
            
        )
}

Shop.propTypes = {
    isAdmin: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    isAdmin: state.auth.isAdmin
})

export default connect(mapStateToProps)(Shop)
