import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {styles as styles} from './styles';

const GTextControl = (field) => {
    return (
        <FormControl fullWidth >
            <TextField
                fullWidth
                required={field.required}
                disabled={field.disabled}
                multiline={field.multiline}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                margin="normal"
                value={field.value}
                type={field.type}
                onChange={(e) => field.handleChange(e, field.id)}
            />
            <br/>
        </FormControl>
    )
};

export default GTextControl;