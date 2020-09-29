import React, { useState, useRef, useEffect, Fragment } from 'react'
import { addCategory, getCategories, deleteCategory} from "../../../redux/category/category-action"; 

import FormField from '../../../components/utils/form-field/form-field';
import {update,generateData,isFormValid, resetFields} from '../../../components/utils/form-action/form-action';
import MyButton from '../../../components/utils/button/button';

import Loading from "../../../components/loading/loading";
import Modal from '../../../components/modal/modal'
import './category.scss'
import { useDispatch, useSelector } from 'react-redux';

const Category = () => {
    const [categories, setCategories] = useState({
        categories:[],
        loading:true
    })

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories()).then(res => {
            setCategories({
                categories:res.payload.data,
                loading:false
            })
        })
    }, []);

    const loading = useSelector(state => state.category.loading);

    const [modalData, setModalData] = useState(null);

    const updateForm = (element) => {
        const newFormData = update(element,formField.formData,'category');
        setFormField({
            formError:false,
            formData: newFormData,
        })
    }

    const resetFieldHandler = () => {
        const newFormData = resetFields(formField.formData,'category')
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
        let dataToSubmit = generateData(formField.formData,'category');
        let formIsValid = isFormValid(formField.formData,'category');
        // setErrors(true)

        if(formIsValid){
            dispatch(addCategory(dataToSubmit)).then(res =>{
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


    const [formField, setFormField] = useState({
        formError: false,
        formSuccess:false,
        formData:{
            name:{
                element:'input',
                label:'Category name',
                value:'',
                config:{
                    name:'category_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
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

    const tableData = categories &&
            categories.categories.map(col => (
                <tr key={col._id}>
                    <td>{col.name}</td>
                    <td><button onClick={() => openModal(col)}>Delete</button></td>
                </tr>
            ));



    
    const handleDeleteCategory = async e => {
        e.preventDefault();
        deleteCategory(modalData._id);
        modalRef.current.closeModal();
    }

    return (
        <div className="admin-category">

            <div className="card table-category">
            <h2>Add category</h2>          
                    <form onSubmit={(e) => submitForm(e)}>
                        <FormField
                            id={'name'}
                            formData={formField.formData.name}
                            change={(element) => updateForm(element)}
                        />
                            <MyButton onClick={(e) => submitForm(e)} type="submit" title="Add Category" value="Submit" /> 
                        
                    </form>      
                <div className="table-header">
                    <h2>Manage category</h2>
                    {/* <FormInput type="text" name="search" value={searchInput} onChange={e => updateForm(e)} label="Search" /> */}
                </div>
    
                {!categories.loading ?  
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                        
                    </table> : <Loading />
                }
                <Modal ref={modalRef}>
    
                {modalData && <Fragment>
                    <h2>Are you sure you want to delete {modalData.categoryName} category?</h2>
                    <br/>
                    <p>This action cannot be undone. This will permanently delete the {modalData.categoryName} category, and all product under the category.</p>
                    <br/>
                    <p>Please type <b>rdg/{modalData.categoryName}</b></p>
                        <form onSubmit={handleDeleteCategory}>
                            {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
                            <div className="form-ation">
                                {/* <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.categoryName}`)}>Delete</CustomButton> */}
                               
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

export default Category;
