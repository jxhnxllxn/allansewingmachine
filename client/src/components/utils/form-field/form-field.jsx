import React from 'react'
import './form-field.scss'

const FormField = ({formData, change, id}) => {

    const showError = () => {
        let errorMessage = null;

        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className="error_label">
                    {formData.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch (formData.element) {
            case('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input 
                            className="form_input"
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange={(event)=>change({event,id})}
                        />
                        {showError()}
                        {formData.label ? (
                            <label className={`${formData.value.length ? 'shrink' : ''} form_input_label`}>
                                {formData.label}
                            </label>
                        ) : null}

                    </div>
                )
                break;
        
            default:
                formTemplate = null;
                break;
        }

        return formTemplate
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField
