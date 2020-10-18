import React from 'react'

const FormField = ({formData, change, id, addStyle}) => {
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
            case('textarea'):
                formTemplate = (
                    <div className="formBlock">
                        <textarea 
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
            case('select'):
                formTemplate = (
                    <div className="formBlock">
                        <select
                            className="form_input"
                            value={formData.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange={(event)=>change({event,id})}
                        >
                            <option value=""></option>
                            {
                                formData.config.options.map(item=>(
                                    <option 
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                        {formData.label ? (
                            <label className={`${formData.value.length ? 'shrink' : ''} form_input_label`}>
                                {formData.label}
                            </label>
                        ) : null}
                    </div>
                )
                break;
            
            case('radio'):
                formTemplate = (
                    <div>
                        {
                            formData.config.radios.map(item=>(
                                <div className="radio_input" key={item.key}  style={{...addStyle}}>
                                    <label htmlFor={item.value}>
                                        {item.label}
                                    </label>
                                    <input 
                                        className="form_radio"
                                        {...formData.config}
                                        value={item.value}
                                        onChange={(event)=>change({event,id})}
                                    />
                                    
                                {showError()}
                                </div>

                            ))
                        }
                        
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
