import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {styles as styles} from './styles';

class GTextControl extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl fullWidth={true} classes={styles.formControl}>
                <InputLabel className={styles.fieldLabel} htmlFor={this.props.id}
                            disabled={this.props.disabled === true}>{this.props.label}</InputLabel>
                <br/>
                <TextField
                    fullWidth={true}
                    disabled={this.props.disabled === true}
                    multiline={this.props.multiline === true}
                    id={this.props.id}
                    className={styles.textField}
                    margin="normal"
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    onChange={(e) => this.props.handleChange(e, this.props.id)}
                />
                <br/>
            </FormControl>
        )
    }
}


export default GTextControl;