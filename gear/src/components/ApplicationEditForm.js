import React, {Component} from "react";
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadApplication as loadApplicationAction} from "../actions/applicationActions";
import {loadTechnologies as loadTechnologiesAction} from "../actions/technologyActions";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
});

class ApplicationEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            application: {
                keyname: '',
                technologies: []
            },
            tech: ''
        };

        //this.handleChange = this.handleChange.bind(this);
        this.handleDeleteChip = this.handleDeleteChip.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addTechnology = this.addTechnology.bind(this);
        this.saveTech = this.saveTech.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("techs: " + nextProps.application.technologies.length);
        this.setState(
            {
                application: nextProps.application.application,
                tech: (nextProps.application.technologies.length > 0) ? nextProps.application.technologies[0].keyname : ''
            });
    }


    componentDidMount() {
        return Promise.all([
            this.props.loadApplication(this.props.id),
            this.props.loadTechnologies()
        ]);
    }

    addTechnology() {
        let newState = Object.assign({}, this.state);
        newState.application.technologies.push({id: new Date().getUTCMilliseconds(), keyname: this.tech});
        this.setState(newState);
    }

    handleDeleteChip(deletedChip) {
        let newState = Object.assign({}, this.state);
        let techs = newState.application.technologies.filter(function( obj ) {
            return obj.keyname !== deletedChip;
        });
        newState.application.technologies = techs;
        this.setState(newState);
    }
    handleClick(data) {
        /*this.setState(state => {
            const chipData = [...state.technologies];
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            return { chipData };
        });*/
    }

    saveTech(event) {
        this.tech = event.target.value;
    }

    render() {
        console.log(this.state.tech);
        return (
            <div>
                <form className={styles.container} noValidate autoComplete="off">
                    <InputLabel htmlFor="age-native-simple">Application name</InputLabel>
<br/>
                        <TextField
                            id="standard-name"
                            className={styles.textField}
                            margin="normal"
                            value={this.state.application.keyname}
                        />
                  <br/><br/>
                        <InputLabel htmlFor="technologies">Technologies</InputLabel>
                    <br/><br/>
                        <div id="technologies">
                            {this.state.application.technologies.map(data => {
                                return (
                                    <Chip
                                        key={data.id}
                                        label={data.keyname}
                                        onDelete={() => this.handleDeleteChip(data.keyname)}
                                        onClick={this.handleClick}
                                        className={styles.chip}
                                    />
                                );
                            })}
                        </div><br/>
                    <Select native
                            onChange={this.saveTech}
                            value={this.state.tech}>
                            {this.props.application.technologies.map(data => {
                                return (
                                    <option key={data.id} value={data.keyname}>{data.keyname}</option>
                                )
                            })}
                        </Select>&nbsp;&nbsp;
                    <Button variant="outlined" onClick={this.addTechnology} className={styles.button}>
                        Add
                    </Button>
                    <FormHelperText>Add a new technology</FormHelperText>

                </form>
            </div>
        );
    }
}

ApplicationEditForm.propTypes = {
    application: PropTypes.object.isRequired,
    loadApplication: PropTypes.func.isRequired,
    loadTechnologies: PropTypes.func.isRequired
};

//const mapStateToProps = state => ({ application: state.application });

function mapStateToProps(state) {
    //console.log(state.application);
    return {
        application: state.application
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadApplication: bindActionCreators(loadApplicationAction, dispatch),
        loadTechnologies: bindActionCreators(loadTechnologiesAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationEditForm);
