import React from 'react'
import { useDispatch } from 'react-redux'
import { getCollections, addProduct } from "../../redux/product/product-action";
import { useState } from 'react';
import FormField from '../../components/custom/form-field';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../components/custom/form-action';
import MyButton from '../../components/custom/button';
import { useEffect } from 'react';
import FileUpload from '../../components/custom/file-upload';
const ProductAdd = () => {

    const dispatch = useDispatch()
    const [formField, setFormField] = useState({
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                label: 'Product name',
                value: '',
                config: {
                    name: 'productName_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                label: 'Product description',
                value: '',
                config: {
                    name: 'description_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                label: 'Product price',
                value: '',
                config: {
                    name: 'price_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            unit: {
                element: 'input',
                label: 'Product unit',
                value: '',
                config: {
                    name: 'unit_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            category: {
                element: 'select',
                value: '',
                label: 'Category',
                config: {
                    name: 'category_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            collections: {
                element: 'select',
                value: '',
                label: 'Collection',
                config: {
                    name: 'collection_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                label: 'Shipping',
                config: {
                    name: 'shipping_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'input',
                value: '',
                label: 'Stock',
                config: {
                    name: 'available_input',
                    type: 'Number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                label: 'Publish',
                config: {
                    name: 'publish_input',
                    options: [
                        { key: true, value: 'Public' },
                        { key: false, value: 'Hidden' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            images: {
                value: [],
                validation: {
                    required: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false
            }
        }
    });


    const updateFields = (newFormData) => {
        setFormField({
            formData: newFormData
        })
    }

    useEffect(() => {
        dispatch(getCollections()).then(res => {
            const newFormData = populateOptionFields(formField.formData, res.payload.data, 'collections');
            updateFields(newFormData);
        })
    // eslint-disable-next-line
    }, [dispatch])


    const updateForm = (element) => {
        const newFormData = update(element, formField.formData, 'product');
        setFormField({
            formError: false,
            formData: newFormData,
        })
    }

    const resetFieldHandler = () => {
        const newFormData = resetFields(formField.formData, 'product')
        setFormField({
            formData: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            setFormField({
                ...formField,
                formSuccess: true
            })
        }, 3000)
    }

    const submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(formField.formData, 'product');
        let formIsValid = isFormValid(formField.formData, 'product');
        // setErrors(true)

        if (formIsValid) {
            dispatch(addProduct(dataToSubmit)).then(res => {
                if (res.payload.success) {
                    resetFieldHandler();
                } else {
                    setFormField({
                        ...formField,
                        formError: true
                    })
                }
            })
        } else {
            setFormField({ ...formField, formError: true })
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

    return (
        <div className="card">
            <form className="product_add_wrapper" onSubmit={(e) => submitForm(e)}>

                <h1>Add product</h1>
                <FileUpload
                    imagesHandler={(images) => imagesHandler(images)}
                    reset={formField.formSuccess}
                />
                <FormField
                    id={'name'}
                    formData={formField.formData.name}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'description'}
                    formData={formField.formData.description}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'price'}
                    formData={formField.formData.price}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'unit'}
                    formData={formField.formData.unit}
                    change={(element) => updateForm(element)}
                />

                <div className="form_devider"></div>
                <FormField
                    id={'category'}
                    formData={formField.formData.category}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'collections'}
                    formData={formField.formData.collections}
                    change={(element) => updateForm(element)}
                />

                <div className="form_devider"></div>
                <FormField
                    id={'shipping'}
                    formData={formField.formData.shipping}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'available'}
                    formData={formField.formData.available}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'publish'}
                    formData={formField.formData.publish}
                    change={(element) => updateForm(element)}
                />

                <MyButton onClick={submitForm} type="submit" title="Add product" value="Submit" />



            </form>

            {formField.formSuccess ?
                <div className="form_success">
                    Success
                </div>
                : null
            }

            {formField.formError ?
                <div className="error_label">
                    Please check your data
                </div> : null
            }

        </div>
    )
}

export default ProductAdd
