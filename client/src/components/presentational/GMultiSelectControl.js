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
            id: ''
        };

        this.updateSelected = this.updateSelected.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            id: nextProps.options.length > 0 ? nextProps.options[0].id : '0',
            keyname: nextProps.options.length > 0 ? nextProps.options[0].keyname : ''
        });
    }

    updateSelected(e) {
        let entity = this.props.options.filter(function (obj) {
            return obj.id.toString() === e.target.value;
        });

        this.setState({
            id: e.target.value,
            keyname: entity.length > 0 ? entity[0].keyname : '' //TODO add exception handling here!!
        });
    }

    render() {
        let vals = this.props.values.map(a => a.id);
        console.log(this.props.label);

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
                        value={this.props.id}
                        onChange={(e) => this.updateSelected(e)}>
                    {this.props.options.map(data => {
                        if(!vals.includes(data.id)) {
                            return (
                                <option key={data.id} value={data.id}>{data.keyname}</option>
                            )
                        }
                    })}
                </Select>&nbsp;&nbsp;
                <Button variant="outlined" onClick={() => {this.props.add(this.props.id, this.state)}} className={styles.button}>
                    Add
                </Button>
                <FormHelperText>{this.props.helper}</FormHelperText>
                <br/>
            </div>
        )
    }
}

export default GMultiSelectControl;