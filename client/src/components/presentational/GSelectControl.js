import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {sortArrayOfObjectByProp} from "../../shared/utility";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

const GSelectControl = (field) => {
    let choices;
    if (field.alien) {
        choices = sortArrayOfObjectByProp(field.choices, field.nameField);
    }
    else choices = field.choices;
    return (
            <FormControl fullWidth required={field.required} error={!field.valid && field.touched}>
            <InputLabel htmlFor={field.label} disabled={field.disabled === true}>{field.label}</InputLabel>
            <br/>
			<Tooltip title={field.tooltipText}>
            <Select native fullWidth={true}
                    onChange={(e) => field.handleChange(e, field.id)}
                    value={field.value === null ? '' : field.value}
                    inputProps={{
                        id: field.label,
                        name: field.label
                    }}>
                <option value=" "/>

                {choices.map(data => {
                    return (
                        field.takes === 'string' ? <option key={data.id} value={data.nameField}>{data[field.nameField]}</option>
                            : <option key={data.id} value={data.id}>{data[field.nameField]}</option>
                    )
                })}
            </Select>
			</Tooltip>
                {!field.valid && field.touched ? <FormHelperText> {field.label} cannot be blank! </FormHelperText> : null}
            <br/><br/>
            </FormControl>
    )
};

export default GSelectControl;