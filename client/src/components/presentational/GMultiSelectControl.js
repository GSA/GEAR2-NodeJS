import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import './Styles.css';
import {connect} from 'react-redux';
import Chip from "@material-ui/core/Chip/Chip";
import Select from "@material-ui/core/Select/Select";
import AddIcon from "@material-ui/icons/Add";
import Fab from '@material-ui/core/Fab/Fab';
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {sortArrayOfObjectByProp} from "../../shared/utility";
import {bindActionCreators} from 'redux';
import {updateFieldApp} from "../../actions/applicationActions";
import './GMultiSelectControl.css'
import FormControl from "@material-ui/core/FormControl/FormControl";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";


class GMultiSelectControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            keyname: ''
        };

        this.updateSelected = this.updateSelected.bind(this);
        this.addChip = this.addChip.bind(this);
        this.handleDeleteChip = this.handleDeleteChip.bind(this);
    }

    updateSelected(e) {
        let entity = this.props.choices.filter(function (obj) {
            return obj.id.toString() === e.target.value;
        });

        this.setState({
            id: e.target.value,
            keyname: entity.length > 0 ? entity[0].keyname : ''
        });

    }

    addChip() {
        const addedChip = this.props.choices.filter(item => item.id === +this.state.id)[0];
        if (addedChip) {
            this.props.value.push(addedChip);
        }
        this.props.updateFieldApp({[this.props.endpoint]: {value: this.props.value}});
        this.setState({id: '', keyname: ''});
    }

    handleDeleteChip(id, keyname) {
        for (let i in this.props.value) {
            if (this.props.value[i].id === +id) {
                this.props.value.splice(i, 1);
                break;
            }
        }
        this.props.updateFieldApp({[this.props.endpoint]: {value: this.props.value}});
        this.setState({id: id, keyname: keyname});
    }

    render() {
        let valueForm = null;
        if (this.props.value === undefined) {
            console.log('undefined value', this.props);
        }
        let vals = this.props.value.map(a => a.id);


        if (this.props.value) {
            valueForm = (
                <div id={this.props.id}>
                    {this.props.value.map(data => {
                        if (data) {
                            return (
                                <Chip
                                    key={data.id}
                                    label={data.keyname}
                                    onDelete={() => this.handleDeleteChip(data.id, data.keyname)}
                                    onClick={this.props.handleChipClick}
                                    className="Chip"
                                />
                            );
                        }
                    })}
                </div>
            );
        }
        let choices;
        if (this.props.alien) choices = sortArrayOfObjectByProp(this.props.choices, this.props.nameField);
        else choices = this.props.choices;
        return (
            <div className="GMultiSelect">
                <InputLabel htmlFor={this.props.id}
                            disabled={this.props.disabled === true}>{this.props.label}</InputLabel>
                <br/><br/>
                {valueForm}
                <br/>
                <FormControl class='container'>
                    <Tooltip title={this.props.tooltipText}>
                        <Select native
                                value={this.state.id}
                                onChange={(e) => this.updateSelected(e)}
                                inputProps={{
                                    id: this.props.id,
                                    name: this.props.label
                                }}>
                            <option value=" "/>
                            {choices.map(data => {
                                if (!vals.includes(data.id)) {
                                    return (
                                        <option key={data.id} value={data.id}>{data.keyname}</option>
                                    )
                                }

                            })}
                        </Select>
                    </Tooltip>
                    <Fab size='small' color='primary' aria-label="Add">
                        <AddIcon onClick={this.addChip}/>
                    </Fab>
                </FormControl>

                {this.props.helper ? <FormHelperText>{this.props.helper}</FormHelperText> : null}

                <br/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateFieldApp: bindActionCreators(updateFieldApp, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(GMultiSelectControl);