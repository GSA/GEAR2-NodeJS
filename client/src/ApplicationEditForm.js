import React, {PureComponent} from "react";
import {SimpleForm} from 'react-admin';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    loadApplication as loadApplicationAction,
    loadApplicationStart,
    saveApplicationStart
} from "./actions/applicationActions";
import {saveApplication as saveApplicationAction} from "./actions/applicationActions";
import * as valueLists from "./valuelists";
import {withRouter} from "react-router";
import Spinner from "./components/UI/Spinner/Spinner";
import {removeDuplicates} from "./shared/utility";
import validate from "validate.js";
import Input from "./components/presentational/Input";

class ApplicationEditForm extends PureComponent {

    constructor(props) {
        super(props);
        this.props.saveApplicationStart();
        this.props.loadApplicationStart();
        this.props.loadApplication(this.props.id);
        this.state = {
            loaded: false,
            editForm: {
                id: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'ID',
                        disabled: true
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
                        label: 'Application Name'
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
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
                displayName: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Short name will appear in graphic',
                        required: true
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
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
                    valid: true,
                    value: null
                },
                mobileAppIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Mobile',
                        takes: 'string',
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
                        takes: 'string',
                        required: true,
                        label: 'Application Or Website',
                        choices: valueLists.AppOrWebChoices
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                numberOfUsers: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'number',
                        label: 'Number of users',
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
                        endpoint: 'platforms',
                        alien: true,
                        choices: this.props.application.platforms
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
                        choices: this.props.application.providers
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
                        'takes': 'string',
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
                        alien: true,
                        endpoint: 'users',
                        takes: 'number',
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
                        label: 'Parent System',
                        alien: true,
                        endpoint: 'parents',
                        takes: 'number',
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
                        alien: true,
                        endpoint: 'investments',
                        takes: 'number',
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
                        endpoint: 'portfolios',
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
                        endpoint: 'fismas',
                        choices: this.props.application.fismas
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
                        choices: this.props.application.technologies
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
                        nameField: 'keyname',
                        endpoint: 'users',
                        choices: this.props.application.users
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
                        nameField: 'keyname',
                        endpoint: 'capabilities',
                        choices: this.props.application.capabilities
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
                        nameField: 'keyname',
                        endpoint: 'pocs',
                        choices: this.props.application.pocs
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
                        nameField: 'keyname',
                        endpoint: 'pocs',
                        choices: this.props.application.pocs
                    },
                    valid: true,
                    value: []
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
            isFormValid: true
        };

        this.handleClick = this.handleClick.bind(this);
        this.inputChangedHandler = this.inputChangedHandler.bind(this);

        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        if (nextProps.errMessage) {
            this.props.showNotification({
                message: `Edit Application Fail: ${nextProps.errMessage}`,
                type: 'warning'
            })
        }
        if (nextProps.application.saved) {
            this.props.history.push('/applications');
            this.props.showNotification({
                message: `Edit Application Success`,
                type: 'info'
            })
        }

        if (nextProps.application.application.id && !this.state.loaded) {
            const updatedEditForm = {...this.state.editForm};
            for (let inputIdentifier in updatedEditForm) {
                const updatedFormElem = {...updatedEditForm[inputIdentifier]};
                updatedFormElem.value = nextProps.application.application[inputIdentifier];

                if (updatedFormElem.elementConfig && updatedFormElem.elementConfig.alien) {
                    const updatedElemConfig = {...updatedEditForm[inputIdentifier].elementConfig};
                    updatedElemConfig.choices = nextProps.application[updatedFormElem.elementConfig.endpoint] ?
                        nextProps.application[updatedFormElem.elementConfig.endpoint] : [];
                    updatedFormElem.elementConfig = updatedElemConfig;
                }
                updatedEditForm.valid = true;
                updatedEditForm[inputIdentifier] = updatedFormElem;
            }
            this.setState({editForm: updatedEditForm, loaded: true});
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedEditForm = {
            ...this.state.editForm
        };
        const updatedFormElement = {...updatedEditForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;

        const isValid = validate({
            inputIdentifier: event.target.value
        }, {
            inputIdentifier: updatedFormElement.constraints
        });
        updatedFormElement.valid = !isValid;
        updatedFormElement.touched = true;
        if (inputIdentifier === 'retiredYear' || inputIdentifier === 'productionYear') {
            updatedFormElement.errHelperText = `${inputIdentifier} must be between 1950 and 2050`;
            if (updatedFormElement.value === "") {
                updatedFormElement.value = null;
                updatedFormElement.valid = true;
            }
        }
        updatedEditForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedEditForm) {
            if (updatedEditForm[inputIdentifier].valid !== undefined) {
                isFormValid = updatedEditForm[inputIdentifier].valid && isFormValid
            }
        }

        //create form should now have all elements including multiselect
        this.setState({editForm: updatedEditForm, isFormValid: isFormValid});
    };

    save() {
        if (!this.state.isFormValid) {
            this.props.showNotification({message: 'Validation Error: Fix fields before continuing', type: 'warning'});
            const updatedEditForm = {...this.state.editForm};
            for (let inputIdentifier in updatedEditForm) {
                const updatedEditFormElem = {...updatedEditForm[inputIdentifier]};
                updatedEditFormElem.touched = true;
                updatedEditForm[inputIdentifier] = updatedEditFormElem;
            }
            this.setState({createForm: updatedEditForm});
        } else {

            const applicationForm = {};
            for (let formElem in this.state.editForm) {
                if (formElem === 'technologies' || formElem === 'capabilities' || formElem === 'users' || formElem === 'business_pocs' || formElem === 'technical_pocs') {
                    applicationForm[formElem] = this.state.editForm[formElem].value ? removeDuplicates(this.state.editForm[formElem].value, 'id') :
                        null;
                } else {
                    applicationForm[formElem] = this.state.editForm[formElem].value;
                }
            }
            this.props.saveApplication(applicationForm);
        }
    }

    handleClick(data) {
        //maybe pop-up with information about the technology or open new tab to tech page
    }

    render() {
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
                        />
                    )
                })
            );
        }
        return (
            <SimpleForm record={this.state.editForm} resource="applications" save={this.save}>
                {simpleForm}
            </SimpleForm>
        );
    }
}

ApplicationEditForm.propTypes = {
    application: PropTypes.object.isRequired,
    loadApplication: PropTypes.func.isRequired,
    saveApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    application: state.application,
    loaded: state.application.loaded,
    errMessage: state.application.errorMessage,
    loading: state.application.loading
});

function mapDispatchToProps(dispatch) {
    return {
        loadApplication: bindActionCreators(loadApplicationAction, dispatch),
        saveApplication: bindActionCreators(saveApplicationAction, dispatch),
        saveApplicationStart: bindActionCreators(saveApplicationStart, dispatch),
        loadApplicationStart: bindActionCreators(loadApplicationStart, dispatch),
        showNotification: bindActionCreators((payload) => {
            return {type: 'RA/SHOW_NOTIFICATION', payload: payload}
        }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationEditForm));
