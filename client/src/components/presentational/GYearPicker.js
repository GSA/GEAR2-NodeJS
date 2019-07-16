import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const GYearPicker = (props) => {

    let minYear = props.minYear;
    let maxYear = props.maxYear;

    let offset = maxYear - minYear

    let allYears = [];
    for (let x = 0; x <= offset; x++) {
        allYears.push(maxYear - x)
    }

    const yearList = allYears.map((x) => {
        return (
            <option key={x}>{x}</option>)
    });

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel htmlFor={props.label} disabled={props.disabled === true}>{props.label}</InputLabel>
                <Select native fullWidth={true}
                        onChange={(e) => props.handleChange(e, props.id)}
                        value={props.value === null ? '' : props.value}>
                    <option value=" "/>
                    {yearList}
                </Select>
                <br/><br/>
            </FormControl>

        </div>
    )
};

export default GYearPicker;