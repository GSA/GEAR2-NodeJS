import React, {Component} from 'react';
import * as valueLists from "../../../../valuelists";
import Spinner from "../../../../components/UI/Spinner/Spinner";

import {withRouter} from "react-router";
import {connect} from 'react-redux';
import Input from "../../../../components/presentational/Input";
import validate from "validate.js";

import './ApplicationBusinessTab.css';

import { bindActionCreators } from 'redux';
import {
    loadApplicationBusiness, loadApplicationBusinessStart, updateFieldApp
} from "../../../../actions/applicationActions";
import Paper from "@material-ui/core/Paper/Paper";

class ApplicationBusinessTab extends Component {
    constructor(props) {
        super(props);
        this.props.loadApplicationBusinessStart();
        this.props.loadApplicationBusiness(this.props.id);
        this.state = {
            editForm: {
                business_pocs: {
                    id: 'business_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Business POCs',
                        alien: true,
                        nameField: 'keyname',
                        endpoint: 'pocs',
                        choices: this.props.staticRepo.pocs
                    },
                    valid: true,
                    value: []
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
                organizations: {
                    id: 'organizations',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Two Letter Org',
                        endpoint: 'users',
                        alien: true,
                        nameField: 'keyname',
                        choices: this.props.staticRepo.users
                    },
                    valid: true,
                    value: []
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
                objInvestmentId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Investment',
                        alien: true,
                        endpoint: 'investments',
                        takes: 'number',
                        choices: this.props.staticRepo.investments
                    },
                    constraints: {},
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
                objPortfolioId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Portfolio',
                        alien: true,
                        endpoint: 'portfolios',
                        takes: 'number',
                        choices: this.props.staticRepo.portfolios
                    },
                    constraints: {},
                    valid: true,
                    value: null
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
                applicationNotes: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Notes',
                        multiline: true
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                userLocations: {
                    id: 'userLocations',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'User Locations',
                        endpoint: 'userlocations',
                        alien: true,
                        nameField: 'keyname',
                        choices: this.props.staticRepo.userLocations
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
                        choices: this.props.staticRepo.capabilities
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
                        choices: this.props.staticRepo.users
                    },
                    valid: true,
                    value: []
                }
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
            Something went wrong when saving this tab. Contact GEAR team!
        </Paper>

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
            <div className="ApplicationGeneralTab">
                {this.props.application.saveFailed ? paper : undefined}
                {simpleForm}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    application: state.appBusiness,
    staticRepo: state.staticRepo
});

function mapDispatchToProps(dispatch) {
    return {
        loadApplicationBusinessStart: bindActionCreators(loadApplicationBusinessStart, dispatch),
        loadApplicationBusiness: bindActionCreators(loadApplicationBusiness, dispatch),
        updateFieldApp: bindActionCreators(updateFieldApp, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationBusinessTab));