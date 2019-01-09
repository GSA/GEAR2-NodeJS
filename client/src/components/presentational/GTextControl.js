import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

const GTextControl = (field) => {
    let errHelperText = field.errHelperText;
    if (!field.valid && field.touched && !field.errHelperText) {
        errHelperText = `${field.label} cannot be blank!`
    }
    if (field.valid) {
        errHelperText = null;
    }

    return (
        <FormControl fullWidth >
			<Tooltip title={field.tooltipText}>
				<TextField
					fullWidth
					required={field.required}
					disabled={field.disabled}
					multiline={field.multiline}
					id={field.id}
					label={field.label}
					placeholder={field.placeholder}
					error={!field.valid && field.touched}
					margin="normal"
					value={field.value}
					onBlur={field.handleBlur}
					type={field.type}
					helperText={errHelperText}
					onChange={(e) => field.handleChange(e, field.id)}
				/>
				{field.valid}
		
			</Tooltip>
            <br/>
        </FormControl>
    )
};


export default GTextControl;