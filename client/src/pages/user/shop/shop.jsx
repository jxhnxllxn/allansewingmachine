import React, { useState, Fragment } from 'react';
import Collection from "../../../components/collection/collection";
import './shop.scss';
import Modal from "../../../shared/modal/modal";
import { useRef } from 'react';
import FormInput from "../../../components/form-input/form-input";
import CustomButton from "../../../components/custom-button/custom-button";

const Shop = () => {
    const [state, setstate] = useState({
        collectionName:'',
        collectionPhoto:'',
        collections:[
            {
                collectionName:"dog",
                collectionImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiTrHnEvhUibcOmY_xo3XEYwZ_4DYMptOwCw&usqp=CAU',
                id:1
            },
            {
                collectionName:"cat",
                collectionImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiTrHnEvhUibcOmY_xo3XEYwZ_4DYMptOwCw&usqp=CAU',
                id:2
            },
            {
                collectionName:"bird",
                collectionImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiTrHnEvhUibcOmY_xo3XEYwZ_4DYMptOwCw&usqp=CAU',
                id:3
            },
            {
                collectionName:"hourse",
                collectionImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiTrHnEvhUibcOmY_xo3XEYwZ_4DYMptOwCw&usqp=CAU',
                id:4
            },
            {
                collectionName:"fish",
                collectionImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiTrHnEvhUibcOmY_xo3XEYwZ_4DYMptOwCw&usqp=CAU',
                id:5
            },
        ]
    })

    const {collectionName} = state;

    const modalRef = useRef();

    const openModal = () => {
        // modalRef.current.testMethod()
        modalRef.current.openModal()
    }
    
    const onChange = e => setstate({...state,[e.target.name]:e.target.value});
    const onChangeFile = e => setstate({...state,[e.target.name]:e.target.files[0]});

    const onSubmit = e => {
        e.preventDefault();
        console.log(state)
    }

        return (
            <Fragment>
               <Modal ref={modalRef}>
                   <h2>Add Collection</h2>
                   <form action="" onSubmit={e => onSubmit(e)}>
                        <FormInput  type="text" name="collectionName" value={collectionName} onChange={e => onChange(e)} label="Collection Name" required/>
                        <FormInput type="file" name="collectionPhoto" onChange={e => onChangeFile(e)}  required />
                        <CustomButton type="submit" value="Submit">Add</CustomButton>
                   </form>
               </Modal> 
               <div className="collections">
                <div className="addCollection" onClick={openModal}>
                
                </div>
                {
                    state.collections.map(({id,...otherProps}) => (        
                        <Collection key={id} {...otherProps}></Collection>
                    ))
                }
            </div>
            </Fragment>
            
        )
}

export default Shop
