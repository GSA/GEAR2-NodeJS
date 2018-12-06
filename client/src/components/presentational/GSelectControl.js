import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {styles as styles} from './styles';
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

const GSelectControl = (field) => {

    return (
        <div>
            <FormControl fullWidth required={field.required} error={!field.valid && field.touched}>
            <InputLabel className={styles.fieldLabel} htmlFor={field.id} disabled={field.disabled === true}>{field.label}</InputLabel>
            <br/>
            <Select native fullWidth={true}
                    onChange={(e) => field.handleChange(e, field.id)}
                    value={field.value === null ? '' : field.value}>
                <option value=" "/>

                {field.choices.map(data => {
                    return (
                        field.nameField ? <option key={data.id} value={data.id}>{data[field.nameField]}</option> :
                        <option key={data.id} value={data.id}>{data['name']}</option>
                    )
                })}
            </Select>
                {!field.valid && field.touched ? <FormHelperText> {field.label} cannot be blank! </FormHelperText> : null}
            <br/><br/>
            </FormControl>
        </div>
    )
};

export default GSelectControl;