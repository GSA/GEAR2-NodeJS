import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {styles as styles} from './styles';
import Chip from "@material-ui/core/Chip/Chip";
import Select from "@material-ui/core/Select/Select";
import Button from "@material-ui/core/Button/Button";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

const GMultiSelectControl = ({field}) => {
    return (
        <div>
            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
            <br/><br/>
            <div id={field.id}>
                {field.values.map(data => {
                    return (
                        <Chip
                            key={data.id}
                            label={data.keyname}
                            onDelete={() => field.handleDeleteChip(data.keyname)}
                            onClick={field.handleChipClick}
                            className={styles.chip}
                        />
                    );
                })}
            </div>
            <br/>
            <Select native
                    onChange={field.save}
                    value={field.firstVal}>
                {field.options.map(data => {
                    return (
                        <option key={data.id} value={data.keyname}>{data.keyname}</option>
                    )
                })}
            </Select>&nbsp;&nbsp;
            <Button variant="outlined" onClick={field.add} className={styles.button}>
                Add
            </Button>
            <FormHelperText>{field.helper}</FormHelperText>
            <br/>
        </div>
    )
};

export default GMultiSelectControl;