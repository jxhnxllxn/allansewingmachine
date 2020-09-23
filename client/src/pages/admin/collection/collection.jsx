import React, { useState, useRef, useEffect, Fragment } from 'react'
import { addCollection, getCollections, deleteCollection } from "../../../redux/collection/collection-action"; 

import FormField from '../../../components/utils/form-field/form-field';
import {update,generateData,isFormValid, resetFields} from '../../../components/utils/form-action/form-action';
import MyButton from '../../../components/utils/button/button';

import Loading from "../../../components/loading/loading";
import Modal from '../../../components/modal/modal'
import FileUpload from '../../../components/utils/file-upload/file-upload'
// import FormInput from '../../../components/utils/form-field/form-field'
import './collection.scss'
import { useDispatch, useSelector } from 'react-redux';

const Collection = () => {

    useEffect(() => {
        dispatch(getCollections())
    }, [getCollections]);

    const dispatch = useDispatch()
    const collections = useSelector(state => state.collection.collections);
    const loading = useSelector(state => state.collection.loading);

    const [modalData, setModalData] = useState(null);

    const updateForm = (element) => {
        const newFormData = update(element,formField.formData,'collection');
        setFormField({
            formError:false,
            formData: newFormData,
        })
    }

    const resetFieldHandler = () => {
        const newFormData = resetFields(formField.formData,'collection')
        setFormField({
            formData:newFormData,
            formSuccess:true
        });
        setTimeout(()=>{
            setFormField({
                ...formField,
                formSuccess:true
            })
        },3000)
    }

    const submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(formField.formData,'collection');
        let formIsValid = isFormValid(formField.formData,'collection');
        // setErrors(true)

        if(formIsValid){
            dispatch(addCollection(dataToSubmit)).then(res =>{
                if(res.payload.success){
                    resetFieldHandler();
                }else{
                    setFormField({
                        ...formField,
                        formError:true
                    })
                }
            })
        }else{
            setFormField({...formField,formError:true})
        }
    }

    const imagesHandler = (images) => {
        const newFormData = {
            ...formField.formData
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        setFormField({
            ...formField,
            formData: newFormData
        })
    }


    const [formField, setFormField] = useState({
        formError: false,
        formSuccess:false,
        formData:{
            name:{
                element:'input',
                label:'Collection name',
                value:'',
                config:{
                    name:'collection_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            images:{
                value:[],
                validation:{
                    required:false,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:false
            }
        }
    })

      
    const modalRef = useRef();
    const openModal = (data) => {
        setModalData(data);
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }
    const renderImage = (images) => {
        if(images.length > 0){
          return images[0].url
        }else{
          return '/images/slide2.jpg'
        }
      }

    const data = collections && !loading ? collections : [];
  
    const tableData = data.map(col => (
        <tr key={col._id}>
            <td>{col.name}</td>       
            <td><img className="collectionPhoto" src={`${renderImage(col.images)}`} alt='collection_image'/></td>  
            <td>view | <button onClick={() => openModal(col)}>Delete</button></td>
        </tr>
    ));

    
    const handleDeleteCollection = async e => {
        e.preventDefault();
        deleteCollection(modalData._id);
        modalRef.current.closeModal();
    }

    return (
        <div className="admin-collection">
            <div className="add-collection">
                
                <div className="card">
                    <h2>Add collection</h2>          
                    <form onSubmit={(e) => submitForm(e)}>
                        <FileUpload 
                            imagesHandler={(images)=> imagesHandler(images)}
                            reset={formField.formSuccess}
                        />
                        <FormField
                            id={'name'}
                            formData={formField.formData.name}
                            change={(element) => updateForm(element)}
                        />
                            <MyButton onClick={(e) => submitForm(e)} type="primary" title="Add Collection" value="Submit" /> 
                        
                    </form>      
                </div>
            </div>


            <div className="card table-collection">
                <div className="table-header">
                    <h2>Manage collection</h2>
                    {/* <FormInput type="text" name="search" value={searchInput} onChange={e => updateForm(e)} label="Search" /> */}
                </div>
    
                {!loading ?  
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
                        
                    </table> : <Loading></Loading>
                }
                <Modal ref={modalRef}>
    
                {modalData && <Fragment>
                    <h2>Are you sure you want to delete {modalData.collectionName} collection?</h2>
                    <br/>
                    <p>This action cannot be undone. This will permanently delete the {modalData.collectionName} collection, and all product under the collection.</p>
                    <br/>
                    <p>Please type <b>rdg/{modalData.collectionName}</b></p>
                        <form onSubmit={handleDeleteCollection}>
                            {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
                            <div className="form-ation">
                                {/* <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.collectionName}`)}>Delete</CustomButton> */}
                               
                                <MyButton onClick={closeModal} type="primary" title="Cancel" value="Submit" /> 
                                <MyButton onClick={closeModal} type="primary" title="Cancel" value="Submit" /> 
                            </div>
                        </form>
                            
                    
                </Fragment>}
                   
               </Modal> 

            </div>
        </div>
    )
}

export default Collection;
