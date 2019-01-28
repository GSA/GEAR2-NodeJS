import React, {Component} from 'react';
import * as valueLists from "../../../../valuelists";
import Spinner from "../../../../components/UI/Spinner/Spinner";

import {withRouter} from "react-router";
import {connect} from 'react-redux';
import Input from "../../../../components/presentational/Input";
import validate from "validate.js";

import './ApplicationGeneralTab.css';

import { bindActionCreators } from 'redux';
import {
    loadApplicationGeneral, loadApplicationGeneralStart, updateFieldApp, saveApplicationGeneralStart
} from "../../../../actions/applicationActions";
import Paper from "@material-ui/core/Paper/Paper";
import {doesExist, doesExistInitiate} from "../../../../actions/validationActions";

class ApplicationGeneralTab extends Component {
    constructor (props) {
        super (props);
        this.props.saveApplicationGeneralStart();
        this.props.loadApplicationGeneralStart();
        this.props.loadApplicationGeneral(this.props.id);
        this.state = {
            backfill: {
                keyname: '',
                displayName: ''
            },
            editForm: {
                id: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'ID',
                        disabled: true,
						tooltipText: 'Application ID stored in GEAR'
                    },
                    constraints: {},
                    valid: true,
                    touched: false,
                    value: null
                },
                keyname: {
                    elementType: 'text',
                    elementConfig: {
                        required: true,
                        placeholder: 'Application Name',
                        label: 'Application Name',
						tooltipText: 'Name of the application'
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                        length: {maximum: 150}
                    },
                    valid: true,
                    touched: false,
                    value: null
                },
                applicationAlias: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Alias',
						tooltipText: 'Other names the application is used as '
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                displayName: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Short name will appear in graphic',
                        required: true,
						tooltipText: 'Short name of the application (non acronym)' 
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                        length: {maximum: 25}
                    },
                    valid: true,
                    value: null
                },
                description: {
                    elementType: 'text',
                    elementConfig: {
                        multiline: true,
                        required: true,
                        label: "Description",
						tooltipText: 'Description of the applications including what function it supports what organizations are using it, etc.' 
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                objApplicationStatusId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Application Status',
                        takes: 'number',
                        required: true,
                        choices: valueLists.ApplicationStatuses,
						tooltipText: 'Current status of the application'
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                applicationOrWebsite: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        required: true,
                        label: 'Application Or Website',
                        choices: valueLists.AppOrWebChoices,
						tooltipText: 'Indicator of whether the object is an application or a website'
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                objParentSystemId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Parent System',
                        alien: true,
                        endpoint: 'parents',
                        takes: 'number',
                        choices: this.props.staticRepo.parents,
						tooltipText: 'System the application is part of'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                }
            },
            loaded: false
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let message;

        const updatedEditForm = {
            ...this.state.editForm
        };
        const updatedFormElement = {...updatedEditForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        this.props.updateFieldApp({[inputIdentifier]: updatedFormElement});

        const isValid = validate({
            [inputIdentifier]: event.target.value
        }, {
            [inputIdentifier]: updatedFormElement.constraints
        });
        updatedFormElement.valid = !isValid;
        if (isValid) {
            updatedFormElement.errHelperText = isValid[inputIdentifier][0];
        }
        updatedFormElement.touched = true;
        updatedEditForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedEditForm) {
            if (updatedEditForm[inputIdentifier].valid !== undefined) {
                isFormValid = updatedEditForm[inputIdentifier].valid && isFormValid;
                if (!updatedEditForm[inputIdentifier].valid) {
                    message = updatedEditForm[inputIdentifier].errHelperText;
                }
            }
        }

        this.props.fromParent(isFormValid, message);
        console.log('state', this.state.backfill);

        //create form should now have all elements including multiselect
        this.setState({editForm: updatedEditForm, isFormValid: isFormValid});
    };

    componentWillReceiveProps(nextProps, nextContext) {

        if (!nextProps.application.loading) {
            const updatedEditForm = {...this.state.editForm};
            const backFill = {...this.state.backfill};
            if (nextProps.application.exists) {
                const updatedFormElement = {...updatedEditForm[nextProps.application.existsField]};
                updatedFormElement.valid = false;
                updatedFormElement.errHelperText = `${nextProps.application.existsField} already exists. This field must to be unique.`;
                updatedFormElement.touched = true;
                updatedEditForm[nextProps.application.existsField] = updatedFormElement;
            } else {
                const updatedFormElement = {...updatedEditForm[nextProps.application.existsField]};
                updatedFormElement.valid = true;
                updatedFormElement.touched = true;
                updatedFormElement.errHelperText = null;
                updatedEditForm[nextProps.application.existsField] = updatedFormElement;
            }

            for (let inputIdentifier in updatedEditForm) {
                const updatedFormElem = {...updatedEditForm[inputIdentifier]};
                if (!this.state.loaded) {
                    backFill.keyname = updatedEditForm['keyname'].value;
                    backFill.displayName = updatedEditForm['displayName'].value;
                }
                updatedFormElem.value = nextProps.application[inputIdentifier];
                if (updatedFormElem.elementConfig && updatedFormElem.elementConfig.alien) {
                    const updatedElemConfig = {...updatedEditForm[inputIdentifier].elementConfig};
                    updatedElemConfig.choices = nextProps.staticRepo[updatedFormElem.elementConfig.endpoint] ?
                        nextProps.staticRepo[updatedFormElem.elementConfig.endpoint] : [];
                    updatedFormElem.elementConfig = updatedElemConfig;
                }
                updatedEditForm.valid = true;
                updatedEditForm[inputIdentifier] = updatedFormElem;
            }
            this.setState({editForm: updatedEditForm, loaded: true, backfill: backFill});
        }
    }

    onBlur = (event, identifier) => {
        const target = event.target.value.trim();
        if (this.state.backfill[identifier] !== target) {
            switch (identifier) {
                case 'keyname':
                    this.props.doesExistInitiate();
                    this.props.doesExist({
                        modelInstance: 'applications',
                        field: identifier, target: event.target.value});
                    break;
                case 'displayName':
                    this.props.doesExistInitiate();
                    this.props.doesExist({
                        modelInstance: 'applications',
                        field: identifier, target: event.target.value});
                    break;
            }
        } else {
            this.props.doesExistInitiate();
        }
    };

    render () {
        let paper = <Paper style={{
            padding: '20px',
            backgroundColor: "salmon"
        }}>
            Something went wrong when saving this tab. Contact GEAR team!
        </Paper>
        let simpleForm = <Spinner/>;
        if (!this.props.application.loading) {
            const formElements = [];
            const consolidatedForm = {...this.state.editForm};
            for (let key in consolidatedForm) {
                formElements.push({
                    id: key,
                    config: this.state.editForm[key]
                })
            }
            simpleForm = (
                formElements.map(elem => {
                    return (
                        <Input
                            key={elem.id}
                            elemType={elem.config.elementType}
                            elementConfig={elem.config.elementConfig}
                            valid={elem.config.valid}
                            touched={elem.config.touched}
                            value={elem.config.value}
                            errHelperText={elem.config.errHelperText}
                            changed={(event) => this.inputChangedHandler(event, elem.id)}
                            onBlur={(e) => this.onBlur(e, elem.id)}
                        />
                    )
                })
            );
        }
        return (
            <div className="ApplicationGeneralTab">
                {this.props.application.saveFailed ? paper : undefined}
                {simpleForm}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    application: state.appGeneral,
    staticRepo: state.staticRepo
});

function mapDispatchToProps (dispatch) {
    return {
        loadApplicationGeneral: bindActionCreators(loadApplicationGeneral, dispatch),
        loadApplicationGeneralStart: bindActionCreators(loadApplicationGeneralStart, dispatch),
        saveApplicationGeneralStart: bindActionCreators(saveApplicationGeneralStart, dispatch),
        updateFieldApp: bindActionCreators(updateFieldApp, dispatch),
        doesExistInitiate: bindActionCreators(doesExistInitiate, dispatch),
        doesExist: bindActionCreators(doesExist, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationGeneralTab));