import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import './Styles.css';
import Chip from "@material-ui/core/Chip/Chip";
import Select from "@material-ui/core/Select/Select";
import Button from "@material-ui/core/Button/Button";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";


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

    /*componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            id: nextProps.options.length > 0 ? nextProps.options[0].id : '0',
            keyname: nextProps.options.length > 0 ? nextProps.options[0].keyname : ''
        });
    }*/

    updateSelected(e) {
        let entity = this.props.options.filter(function (obj) {
            return obj.id.toString() === e.target.value;
        });

        this.setState({
            id: e.target.value,
            keyname: entity.length > 0 ? entity[0].keyname : ''
        });

    }

    addChip() {
        /*let newState = Object.assign({}, this.state);
        newState[fieldId].push(item);
        this.setState({
            ...this.state,
            ...newState});*/
        debugger;
        const addedChip = this.props.options.filter(item => item.id === +this.state.id)[0];
        if (addedChip) {
            this.props.value.push(addedChip);
        }
        this.forceUpdate();
    }

    handleDeleteChip(id) {
        /*let newState = Object.assign({}, this.state);
        newState[fieldId] = newState[fieldId].filter(function (obj) {
            return obj.id !== deletedChip;
        });
        this.setState({
            ...this.state,
            ...newState});*/
        for(let i in this.props.value ) {
            if(this.props.value[i].id === +id) {
                this.props.value.splice(i, 1);
                break;
            }
        }
        this.forceUpdate();
    }



    render() {
        let valueForm = null;
        if (this.props.value ) {
            valueForm = (
                <div id={this.props.id}>
                {this.props.value.map(data => {
                    if (data) {
                        return (
                            <Chip
                                key={data.id}
                                label={data.keyname}
                                onDelete={() => this.handleDeleteChip(data.id)}
                                onClick={this.props.handleChipClick}
                                className="Chip"
                            />
                        );
                    }
                })}
            </div>
            );
        }

        return (
            <div>
                <InputLabel htmlFor={this.props.id} disabled={this.props.disabled === true}>{this.props.label}</InputLabel>
                <br/><br/>
                {valueForm}
                <br/>
                <Select native
                        value={this.state.id}
                        onChange={(e) => this.updateSelected(e)}>
                    <option value=" "/>
                    {this.props.options.map(data => {
                        return (
                            <option key={data.id} value={data.id}>{data.keyname}</option>
                        )
                    })}
                </Select>&nbsp;&nbsp;
                <Button variant="outlined" onClick={this.addChip}>
                    Add
                </Button>
                <FormHelperText>{this.props.helper}</FormHelperText>
                <br/>
            </div>
        )
    }
}

export default GMultiSelectControl;