import React, {Component} from 'react';
import * as valueLists from "../../../../valuelists";
import Spinner from "../../../../components/UI/Spinner/Spinner";

import {withRouter} from "react-router";
import {connect} from 'react-redux';
import Input from "../../../../components/presentational/Input";
import validate from "validate.js";

import './ApplicationTechnologyTab.css';

import { bindActionCreators } from 'redux';
import {
    loadApplicationTechnology, loadApplicationTechnologyStart, updateFieldApp
} from "../../../../actions/applicationActions";
import Paper from "@material-ui/core/Paper/Paper";

class ApplicationTechnologyTab extends Component {
    constructor(props) {
        super(props);
        this.props.loadApplicationTechnologyStart();
        this.props.loadApplicationTechnology(this.props.id);

        this.state = {
            editForm: {
                technical_pocs: {
                    id: 'technical_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technology POCs',
                        alien: true,
                        nameField: 'keyname',
                        endpoint: 'pocs',
                        choices: this.props.staticRepo.pocs,
                        tooltipText: 'GSA person responsible for the maintenance of the application.'
                    },
                    valid: true,
                    value: []
                },
                cloudIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Cloud',
                        takes: 'string',
                        choices: valueLists.ConfirmChoices,
						tooltipText: 'Indicator of whether the application is cloud based or not'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                mobileAppIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Mobile',
                        takes: 'string',
                        choices: valueLists.ConfirmChoices,
						tooltipText: 'Indicator of whether a mobile version of the application has been developed'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                desktopIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Desktop',
                        choices: valueLists.ConfirmChoices,
						tooltipText: 'Does this Business Application have an installable Desktop Component?'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objAppPlatformId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        takes: 'number',
                        label: 'Application Platform',
                        endpoint: 'platforms',
                        alien: true,
                        choices: this.props.staticRepo.platforms,
						tooltipText: 'Refers to a capability used to provide a set of common services the enterprise uses to build business applications.'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objAppHostingproviderId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        takes: 'number',
                        label: 'Application Hosting Provider',
                        alien: true,
                        endpoint: 'providers',
                        choices: this.props.staticRepo.providers,
						tooltipText: 'Who provides the physical infrastructure for this Business Application? '
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objFismaId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'FISMA System',
                        takes: 'number',
                        alien: true,
                        endpoint: 'fismas',
                        choices: this.props.staticRepo.fismas,
						tooltipText: 'Name of the FISMA System that provides the ATO for this application/website. '
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                technologies: {
                    id: 'technologies',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technologies',
                        nameField: 'keyname',
                        alien: true,
                        endpoint: 'technologies',
                        choices: this.props.staticRepo.technologies,
						tooltipText: 'Technologies used by the application. Includes Operating System, database, application server, web server, programming language, etc.'
                    },
                    valid: true,
                    value: []
                },
            }
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

        //create form should now have all elements including multiselect
        this.setState({editForm: updatedEditForm, isFormValid: isFormValid});
    };

    componentWillReceiveProps(nextProps, nextContext) {

        if (!nextProps.application.loading) {
            const updatedEditForm = {...this.state.editForm};
            for (let inputIdentifier in updatedEditForm) {
                const updatedFormElem = {...updatedEditForm[inputIdentifier]};
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
            this.setState({editForm: updatedEditForm, loaded: true});
        }
    }


    render() {
        let simpleForm = <Spinner/>;
        let paper = <Paper style={{
            padding: '20px',
            backgroundColor: "salmon"
        }}>
            Something went wrong when saving this tab. Contact GEAR team! </Paper>

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
                        />
                    )
                })
            );
        }
        return (
            <div className="ApplicationTechnologyTab">
                {this.props.application.saveFailed ? paper : undefined}
                {simpleForm}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    application: state.appTechnology,
    staticRepo: state.staticRepo
});

function mapDispatchToProps(dispatch) {
    return {
        loadApplicationTechnology: bindActionCreators(loadApplicationTechnology, dispatch),
        loadApplicationTechnologyStart: bindActionCreators(loadApplicationTechnologyStart, dispatch),
        updateFieldApp: bindActionCreators(updateFieldApp, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationTechnologyTab));