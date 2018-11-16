import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {styles as styles} from './styles';
import Chip from "@material-ui/core/Chip/Chip";
import Select from "@material-ui/core/Select/Select";
import Button from "@material-ui/core/Button/Button";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

class GMultiSelectControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ''
        };

        this.updateSelected = this.updateSelected.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            id: nextProps.field.options.length > 0 ? nextProps.field.options[0].id : '0',
            keyname: nextProps.field.options.length > 0 ? nextProps.field.options[0].keyname : ''
        });
    }

    updateSelected(e) {
        let entity = this.props.field.options.filter(function (obj) {
            return obj.id.toString() === e.target.value;
        });

        this.setState({
            id: e.target.value,
            keyname: entity.length > 0 ? entity[0].keyname : '' //TODO add exception handling here!!
        });
    }

    render() {
        return (
            <div>
                <InputLabel htmlFor={this.props.field.id}>{this.props.field.label}</InputLabel>
                <br/><br/>
                <div id={this.props.field.id}>
                    {this.props.field.values.map(data => {
                        return (
                            <Chip
                                key={data.id}
                                label={data.keyname}
                                onDelete={() => this.props.field.handleDeleteChip(this.props.field.id, data.id)}
                                onClick={this.props.field.handleChipClick}
                                className={styles.chip}
                            />
                        );
                    })}
                </div>
                <br/>
                <Select native
                        value={this.state.id}
                        onChange={(e) => this.updateSelected(e)}>
                    {this.props.field.options.map(data => {
                        return (
                            <option key={data.id} value={data.id}>{data.keyname}</option>
                        )
                    })}
                </Select>&nbsp;&nbsp;
                <Button variant="outlined" onClick={() => {this.props.field.add(this.props.field.id, this.state)}} className={styles.button}>
                    Add
                </Button>
                <FormHelperText>{this.props.field.helper}</FormHelperText>
                <br/>
            </div>
        )
    }
};

export default GMultiSelectControl;