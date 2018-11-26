import React from 'react';

import GTextControl from "./GTextControl";
import GMultiSelectControl from "./GMultiSelectControl";
import GSelectControl from "./GSelectControl";

const Input = ( props ) => {
    let inputElement = null;
    switch (props.elemType) {
        case ('text') :
            inputElement = <GTextControl
                value = {props.value}
                {...props.elementConfig}
                onChange = {props.changed}/>
            break;
        case ('select'):
            inputElement = <GSelectControl
                value = {props.value}
                {...props.elementConfig}
                onChange = {props.changed}/>
            break;
        case ('multiselect'):
            inputElement = <GMultiSelectControl
                value = {props.value}
                {...props.elementConfig}
                onChange = {props.changed}/>
            break;

    }
    return (
        <div>
            {inputElement}
        </div>
    );
};

export default Input;