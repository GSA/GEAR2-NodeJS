import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {styles as styles} from './styles';
import FormControl from "@material-ui/core/es/FormControl/FormControl";

const GSelectControl = (field) => {

    return (
        <div>
            <FormControl fullWidth required={field.required}>
            <InputLabel className={styles.fieldLabel} htmlFor={field.id} disabled={field.disabled === true}>{field.label}</InputLabel>
            <br/>
            <Select native fullWidth={true}
                    onChange={(e) => field.handleChange(e, field.id)}
                    value={field.value === null ? '' : field.value}>
                <option value=" "/>
                {field.choices.map(data => {
                    return (
                        <option key={data.id} value={data.id}>{data[field.nameField]}</option>
                    )
                })}
            </Select>
            <br/><br/>
            </FormControl>
        </div>
    )
};

export default GSelectControl;