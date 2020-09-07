import React from "react";
import "./custom-button.scss";

const CustomButton = ({children,inverted,disabled,buttonType, ...otherProps}) => (
    <button disabled={Boolean(disabled)} className={`${inverted ? 'inverted' : ''} ${disabled ? 'btnDisabled' : ''} ${buttonType} custom-button `} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;