import React, {Component} from 'react';
import {SimpleForm} from 'react-admin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    saveNewApplication,
    saveApplication,
    saveApplicationStart
} from "../../../actions/applicationActions";
import {
    doesExist,
    doesExistInitiate
} from "../../../actions/validationActions"
import Input from "../../../components/presentational/Input";
import * as valueLists from "../../../valuelists";
import {withRouter} from "react-router";
import {removeDuplicates} from "../../../shared/utility";
import validate from 'validate.js';

class ApplicationCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createForm: {
                keyname: {
                    elementType: 'text',
                    elementConfig: {
                        required: true,
                        placeholder: 'Application Name',
                        label: 'Application Name'
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: false,
                    touched: false,
                    value: null
                },
                applicationAlias: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Alias'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                description: {
                    elementType: 'text',
                    elementConfig: {
                        multiline: true,
                        required: true,
                        label: "Description"
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: false,
                    value: null
                },
                displayName: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Short name will appear in graphic',
                        required: true
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: false,
                    value: null
                },
                cloudIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Cloud',
                        takes: 'string',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                mobileAppIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Mobile',
                        choices: valueLists.ConfirmChoices
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
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                regionalClassification: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Regional Classification',
                        choices: valueLists.RegionChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                applicationOrWebsite: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        required: true,
                        takes: 'string',
                        label: 'Application Or Website',
                        choices: valueLists.AppOrWebChoices
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: false,
                    value: null
                },
                objAppHostingproviderId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        takes: 'number',
                        label: 'Application Hosting Provider',
                        alien: true,
                        choices: this.props.application.providers
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                numberOfUsers: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Number of users',
                        takes: 'number',
                        choices: valueLists.UserCountBreakdown
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                generateRevenueIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Generates Revenue',
                        choices: valueLists.ConfirmChoices
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
                        choices: this.props.application.platforms
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                tier: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Tier',
                        takes: 'number',
                        choices: valueLists.TierChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                productionYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Production Year'
                    },
                    constraints: {
                        presence: {allowEmpty: true},
                        numericality: {
                            greaterThan: 1950,
                            lessThan: 2050
                        }
                    },
                    valid: true,
                    value: null
                },
                retiredYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Retired Year'
                    },
                    constraints: {
                        numericality: {
                            greaterThan: 1950,
                            lessThan: 2050
                        },
                        presence: {allowEmpty: true},
                    },
                    valid: true,
                    value: null
                },
                url: {
                    elementType: 'text',
                    elementConfig: {
                        type: "url",
                        label: 'URL'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                cuiIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'CUI',
                        takes: 'string',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                uniqueIdentifierCode: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Unique Identifier Code',
                        required: true
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: '0233-0000-0000000-xxxx'
                },
                referenceDocument: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Reference Document'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objOrgSsoId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'SSO',
                        takes: 'number',
                        alien: true,
                        choices: this.props.application.users
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objParentSystemId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        takes: 'number',
                        label: 'Parent System',
                        alien: true,
                        choices: this.props.application.parents
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objInvestmentId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Investment',
                        takes: 'number',
                        alien: true,
                        choices: this.props.application.investments
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objPortfolioId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Portfolio',
                        alien: true,
                        takes: 'number',
                        choices: this.props.application.portfolios
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
                        choices: this.props.application.fismas
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objAppUserlocId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'User Location',
                        takes: 'number',
                        alien: true,
                        choices: this.props.application.userlocations
                    },
                    constraints: {},
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
                        choices: valueLists.ApplicationStatuses
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: false,
                    value: null
                },
                applicationNotes: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Notes',
                        multiline: true
                    },
                    constraints: {},
                    valid: true,
                    value: null
                }
            },
            multipleSelect: {
                technologies: {
                    id: 'technologies',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technologies',
                        alien: true,
                        options: this.props.application.technologies
                    },
                    valid: true,
                    value: []
                },
                capabilities: {
                    id: 'capabilities',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Capabilties',
                        alien: true,
                        options: this.props.application.capabilities
                    },
                    valid: true,
                    value: []
                },
                users: {
                    id: 'users',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Users',
                        alien: true,
                        options: this.props.application.users
                    },
                    valid: true,
                    value: []
                },
                business_pocs: {
                    id: 'business_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Business POCs',
                        alien: true,
                        options: this.props.application.pocs
                    },
                    valid: true,
                    value: []
                },
                technical_pocs: {
                    id: 'technical_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technology POCs',
                        alien: true,
                        options: this.props.application.pocs
                    },
                    valid: true,
                    value: []
                }
            },
            isFormValid: true
        };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCreateForm = {
            ...this.state.createForm
        };

        const updatedFormElement = {...updatedCreateForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;

        const isValid = validate({
            inputIdentifier: event.target.value
        }, {
            inputIdentifier: updatedFormElement.constraints
        });
        updatedFormElement.valid = !isValid;
        updatedFormElement.errHelperText = `${updatedFormElement.elementConfig.label} cannot be blank!`
        updatedFormElement.touched = true;
        if (inputIdentifier === 'retiredYear' || inputIdentifier === 'productionYear') {
            updatedFormElement.errHelperText = `${inputIdentifier} must be between 1950 and 2050`;
            if (updatedFormElement.value === "") {
                updatedFormElement.value = null;
                updatedFormElement.valid = true;
            }
        }

        updatedCreateForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedCreateForm) {
            isFormValid = updatedCreateForm[inputIdentifier].valid && isFormValid;
        }

        //create form should now have all elements including multiselect
        this.setState({createForm: updatedCreateForm, isFormValid: isFormValid});
    };

    onBlur = (event, identifier) => {
        if (identifier === 'keyname') {
            this.props.doesExistInitiate();
            this.props.doesExist({modelInstance: 'applications', field: identifier, target: event.target.value});
        }
    };

    save = () => {
        this.props.saveApplicationStart();
        if (!this.state.isFormValid) {
            this.props.showNotification({message: 'Validation Error: Fix fields before continuing', type: 'warning'});
            const updatedCreateForm = {...this.state.createForm};
            for (let inputIdentifier in updatedCreateForm) {
                const updatedCreateFormElem = {...updatedCreateForm[inputIdentifier]};
                updatedCreateFormElem.touched = true;
                updatedCreateForm[inputIdentifier] = updatedCreateFormElem;
            }
            this.setState({createForm: updatedCreateForm});
        } else {

            const applicationForm = {};
            for (let formElem in this.state.createForm) {
                applicationForm[formElem] = this.state.createForm[formElem].value;
            }

            const applicationConsolidatedForm = {};
            const applicationConsolidated = {...this.state.multipleSelect};

            for (let formElem in applicationConsolidated) {
                applicationConsolidated[formElem].value = applicationConsolidated[formElem].value ? removeDuplicates(applicationConsolidated[formElem].value, 'id') :
                    null;
                applicationConsolidatedForm[formElem] = applicationConsolidated[formElem].value;
            }

            this.handleSubmit(applicationForm, applicationConsolidatedForm);
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errMessage) {
            this.props.showNotification({
                message: `Create Application Fail: ${nextProps.errMessage}`,
                    type: 'warning'
            })
        }
        if (nextProps.application.saved) {
            this.props.history.push('/applications');
            this.props.showNotification({
                message: `Create Application Success`,
                type: 'info'
            })
        }
        if (nextProps.application.exists) {
            const updatedCreateForm = {
                ...this.state.createForm
            };
            const updatedFormElement = {...updatedCreateForm['keyname']};
            updatedFormElement.valid = !nextProps.application.exists;
            updatedFormElement.errHelperText = 'Already Exists';
            updatedCreateForm['keyname'] = updatedFormElement;
            this.setState({createForm: updatedCreateForm});
        }
    }

    handleSubmit (app, updatedApp) {
        return new Promise ((resolve, reject) => this.props.saveNewApplication(app, updatedApp, resolve, reject));
    }


    render() {
        const formElements = [];
        const consolidatedForm = {...this.state.createForm, ...this.state.multipleSelect};
        for (let key in consolidatedForm) {
            formElements.push({
                id: key,
                config: this.state.createForm[key] ? this.state.createForm[key] : this.state.multipleSelect[key]
            })
        }
        let form = (
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
                    onBlur={(event) => this.onBlur(event, elem.id)}
                    changed={(event) => this.inputChangedHandler(event, elem.id)}
                />
            )})
        );
        return (
            <SimpleForm resource="applications" save={this.save}>
                {form}
            </SimpleForm>)
    }
}

const mapStateToProps = state => ({application: state.application, errMessage: state.application.errorMessage, exists: state.application.exists});

function mapDispatchToProps(dispatch) {
    return {
        saveApplicationStart: bindActionCreators(saveApplicationStart, dispatch),
        saveNewApplication: bindActionCreators(saveNewApplication, dispatch),
        saveApplication: bindActionCreators(saveApplication, dispatch),
        showNotification: bindActionCreators((payload) => {return {type: 'RA/SHOW_NOTIFICATION', payload: payload}}, dispatch),
        doesExistInitiate: bindActionCreators(doesExistInitiate, dispatch),
        doesExist: bindActionCreators(doesExist, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationCreateForm));

