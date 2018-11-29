import React, {PureComponent} from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {styles as styles} from './styles';
import Chip from "@material-ui/core/Chip/Chip";
import Select from "@material-ui/core/Select/Select";
import Button from "@material-ui/core/Button/Button";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

class GMultiSelectControl extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            keyname: ''
        };

        this.updateSelected = this.updateSelected.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            id: nextProps.options.length > 0 ? nextProps.options[0].id : '',
            keyname: nextProps.options.length > 0 ? nextProps.options[0].keyname : ''
        });
    }

    updateSelected(e) {
        let entity = this.props.options.filter(function (obj) {
            return obj.id.toString() === e.target.value;
        });

        this.setState({
            id: e.target.value,
            keyname: entity.length > 0 ? entity[0].keyname : ''
        });

    }

    render() {
        return (
            <div>
                <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
                <br/><br/>
                <div id={this.props.id}>
                    {this.props.values.map(data => {
                        return (
                            <Chip
                                key={data.id}
                                label={data.keyname}
                                onDelete={() => this.props.handleDeleteChip(this.props.id, data.id)}
                                onClick={this.props.handleChipClick}
                                className={styles.chip}
                            />
                        );
                    })}
                </div>
                <br/>
                <Select native
                        value={this.state.id}
                        onChange={(e) => this.updateSelected(e)}>
                    {this.props.options.map(data => {
                            return (
                                <option key={data.id} value={data.id} >{data.keyname}</option>
                            )
                    })}
                </Select>&nbsp;&nbsp;
                <Button variant="outlined" onClick={() => {this.props.add(this.props.id, {id: parseInt(this.state.id), keyname: this.state.keyname})}}
                        className={styles.button}>
                    Add
                </Button>
                <FormHelperText>{this.props.helper}</FormHelperText>
                <br/>
            </div>
        )
    }
}

export default GMultiSelectControl;