import React, { useState, useRef, useEffect, Fragment } from 'react'
import {connect} from 'react-redux'
import { addCollection, getCollections } from "../../../redux/collection/collection.action"; 
import PropTypes from "prop-types"
import Loading from "../../../shared/loading/loading";
import FormInput from '../../../components/form-input/form-input'
import CustomButton from '../../../components/custom-button/custom-button'
import Modal from '../../../shared/modal/modal'
import './collection.scss'

const Collection = ({addCollection,getCollections,collection:{collections,loading}}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getCollections())
      }, []);

    const tableData = collections.map(col => (
        <tr key={col._id}>
            <td>{col.collectionName}</td>
            <td>{col.collectionPhoto}</td>
            <td>view | delete</td>
        </tr>
    ))

    const [state,setState] = useState({
        searchInput:'',
        collectionName:'',
        collectionFile:null,
    })


    const modalRef = useRef();
    const openModal = () => {
        modalRef.current.openModal()
    }

    const {searchInput,collectionName,collectionFile} = state;
    const onChange = e => setState({...state,[e.target.name]:e.target.value});
    const onChangeFile = e => setState({...state,[e.target.name]:e.target.files[0]});

    const onSubmit = e => {
        let data = new FormData();
        data.append('file',collectionFile);
        data.set('collectionName',collectionName);
        console.log(data)

        e.preventDefault();
           addCollection(data);
    
    }

    return (
        <Fragment>    
            <div className="card">
                <h3>Add Collection</h3>          
                <form action="" encType="multipart/form-data" onSubmit={e => onSubmit(e)}>
                    <FormInput  type="text" name="collectionName" value={collectionName} onChange={e => onChange(e)} label="Collection Name" required/>
                    <FormInput type="file" name="collectionFile" onChange={e => onChangeFile(e)}  required />
                    <CustomButton type="submit" value="Submit">Add</CustomButton>
                </form>      
            </div>

            <div className="card">
                <div className="table-header">
                    <h3>Manage collection</h3>
                    <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" />
                </div>
                <button className="addButton" onClick={openModal}>Add Collection</button>
                
                {loading ? <Loading /> : 
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Collection Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                        
                    </table>
                }

                <Modal ref={modalRef}>
                   <h2>Add Collection</h2>
                   <form>
                        <h2>hello</h2>
                   </form>
               </Modal> 

            </div>
        </Fragment>
    )
}

Collection.propTypes = {
    collection: PropTypes.object.isRequired,
    getCollections: PropTypes.func.isRequired,
    addCollection: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection
})

export default connect(mapStateToProps,{addCollection,getCollections})(Collection)
