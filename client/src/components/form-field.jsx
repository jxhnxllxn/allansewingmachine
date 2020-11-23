import React from "react";

const FormField = ({ formData, change, id }) => {
   const showError = () => {
      let errorMessage = null;

      if (formData.validation && !formData.valid) {
         errorMessage = (
            <div className='error_label'>{formData.validationMessage}</div>
         );
      }

      return errorMessage;
   };

   const renderTemplate = () => {
      let formTemplate = null;
      switch (formData.element) {
         case "input":
            formTemplate = (
               <div className='formBlock'>
                  {formData.showlabel ? (
                     <div className='label_inputs'>{formData.config.label}</div>
                  ) : null}
                  <input
                     {...formData.config}
                     value={formData.value}
                     onBlur={(event) => change({ event, id, blur: true })}
                     onChange={(event) => change({ event, id })}
                     className='formfield formfield--input'
                  />
                  {showError()}
               </div>
            );
            break;
         case "textarea":
            formTemplate = (
               <div className='formBlock'>
                  {formData.showlabel ? (
                     <div className='label_inputs'>{formData.config.label}</div>
                  ) : null}
                  <textarea
                     {...formData.config}
                     value={formData.value}
                     onBlur={(event) => change({ event, id, blur: true })}
                     onChange={(event) => change({ event, id })}
                     className='formfield formfield--textarea'
                  />
                  {showError()}
               </div>
            );
            break;

         case "select":
            formTemplate = (
               <div className='formBlock'>
                  {formData.showlabel ? (
                     <div className='label_inputs'>{formData.config.label}</div>
                  ) : null}
                  <select
                     value={formData.value}
                     onBlur={(event) => change({ event, id, blur: true })}
                     onChange={(event) => change({ event, id })}
                     className='formfield formfield--select'
                  >
                     <option value=''>Select One</option>
                     {formData.config.options.map((item) => (
                        <option key={item.key} value={item.key}>
                           {item.value}
                        </option>
                     ))}
                  </select>
                  {showError()}
               </div>
            );
            break;

         case "radio":
            formTemplate = (
               <div>
                  {formData.config.radios.map((item) => (
                     <div className='formBlock' key={item.key}>
                        <label htmlFor={item.value}>{item.label}</label>
                        <input
                           className='formfield formfield--radio'
                           {...formData.config}
                           value={item.value}
                           onChange={(event) => change({ event, id })}
                        />
                     </div>
                  ))}
               </div>
            );
            break;

         case "checkbox":
            formTemplate = (
               <div>
                  {formData.config.checkbox.map((item) => (
                     <div className='formBlock' key={item.key}>
                        <label htmlFor={item.value}>{item.label}</label>
                        <input
                           className='formfield formfield--checkbox'
                           {...formData.config}
                           value={item.value}
                           onChange={(event) => change({ event, id })}
                        />
                     </div>
                  ))}
               </div>
            );
            break;

         default:
            formTemplate = null;
            break;
      }

      return formTemplate;
   };

   return <div>{renderTemplate()}</div>;
};

export default FormField;
