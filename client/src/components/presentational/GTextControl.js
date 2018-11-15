import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {styles as styles} from './styles';

const GTextControl = ({field}) => {
    return (
        <FormControl fullWidth={true} classes={styles.formControl}>
            <InputLabel className={styles.fieldLabel} htmlFor={field.id}
                        disabled={field.disabled === true}>{field.label}</InputLabel>
            <br/>
            <TextField
                fullWidth={true}
                disabled={field.disabled === true}
                multiline={field.multiline === true}
                id={field.id}
                className={styles.textField}
                margin="normal"
                value={field.value}
            />
            <br/>
        </FormControl>
    )
};

export default GTextControl;