import React from 'react';

import GTextControl from "./GTextControl";
import GMultiSelectControl from "./GMultiSelectControl";
import GSelectControl from "./GSelectControl";
import GYearPicker from "./GYearPicker";

const Input = ( props ) => {
    let inputElement = null;
    switch (props.elemType) {
        case ('text') :
            inputElement = <GTextControl
                value = {props.value}
                {...props.elementConfig}
                touched={props.touched}
                valid={props.valid}
                handleBlur={props.onBlur}
                errHelperText={props.errHelperText}
                handleChange = {props.changed}/>
            break;
        case ('select'):
            inputElement = <GSelectControl
                value = {props.value}
                {...props.elementConfig}
                touched={props.touched}
                valid={props.valid}
                errHelperText={props.errHelperText}
                handleChange = {props.changed}/>
            break;
        case ('multiselect'):
            inputElement = <GMultiSelectControl
                value = {props.value}
                {...props.elementConfig}
                handleChange = {props.changed}/>
            break;
        case ('picker'):
            inputElement = <GYearPicker
                value = {props.value}
                {...props.elementConfig}
                handleChange = {props.changed}/>

    }
    return (
        <div>
            {inputElement}
        </div>
    );
};

export default Input;