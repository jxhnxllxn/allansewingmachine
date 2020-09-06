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

    const [modalData, setModalData] = useState(null);

    const [state,setState] = useState({
        searchInput:'',
        collectionName:'',
        confirmAction:'',
        collectionFile:null,
    });

    useEffect(() => {
        getCollections()
      }, []);
      
    const modalRef = useRef();
    const openModal = (data) => {
        setModalData(data);
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }
  
    const tableData = collections.map(col => (
        <tr key={col._id}>
            <td>{col.collectionName}</td>       
            <td>{col.collectionPhoto}</td>
            {/* <td><img src={require(`../../../../src/assets/img/${col.collectionPhoto}`)} alt={col.collectionPhoto}/></td> */}
            <td>view | <button onClick={() => openModal(col)}>Delete</button></td>
        </tr>
    ));


    const {searchInput,collectionName,collectionFile,confirmAction} = state;
    const onChange = e => setState({...state,[e.target.name]:e.target.value});
    const onChangeFile = e => setState({...state,[e.target.name]:e.target.files[0]});

    const onSubmit = e => {
        let data = new FormData();
        data.append('file',collectionFile);
        data.set('collectionName',collectionName);
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
                    <CustomButton buttonType="primary" type="submit">Add</CustomButton>
                </form>      
            </div>

            <div className="card">
                <div className="table-header">
                    <h3>Manage collection</h3>
                    <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" />
                </div>
                <CustomButton buttonType="primary" onClick={openModal}>Add Collection</CustomButton>
                
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
    
                {modalData && <Fragment>
                    <h2>Are you sure you want to delete {modalData.collectionName} collection?</h2>
                    <br/>
                    <p>This action cannot be undone. This will permanently delete the {modalData.collectionName} collection, and all product under the collection.</p>
                    <br/>
                    <p>Please type <b>rdg/{modalData.collectionName}</b></p>
                    <form>
                        <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/>
                        <div className="form-ation">
                            <CustomButton buttonType="danger" disabled={Boolean(confirmAction !== `rdg/${modalData.collectionName}`)}>Delete</CustomButton>
                            <CustomButton buttonType="default" onClick={closeModal}>Cancel</CustomButton>
                        </div>
                    </form>
                    
                </Fragment>}
                   
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
