import React, {Component} from 'react';
import * as valueLists from "../../../../valuelists";
import Spinner from "../../../../components/UI/Spinner/Spinner";

import {withRouter} from "react-router";
import {connect} from 'react-redux';
import Input from "../../../../components/presentational/Input";
import validate from "validate.js";

import './ApplicationBusinessTab.css';

import {bindActionCreators} from 'redux';
import {
    loadApplicationBusiness, loadApplicationBusinessStart, updateFieldApp
} from "../../../../actions/applicationActions";
import Paper from "@material-ui/core/Paper/Paper";

class ApplicationBusinessTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            editForm: {
                business_pocs: {
                    id: 'business_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        id: 'business_pocs',
                        label: 'Business POCs',
                        alien: true,
                        nameField: 'keyname',
                        endpoint: 'pocs',
                        choices: this.props.staticRepo.pocs,
                        tooltipText: 'GSA person responsible for the requirements of the application, usually representing the user community.'
                    },
                    valid: true,
                    value: []
                },
                organizations: {
                    id: 'organizations',
                    elementType: 'multiselect',
                    elementConfig: {
                        id: 'organizations',
                        label: 'Owning Organizations',
                        endpoint: 'users',
                        alien: true,
                        nameField: 'keyname',
                        choices: this.props.staticRepo.users,
                        tooltipText: 'Organization Unit that funds, develops and maintains the application. '
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
                        choices: this.props.application.users,
                        tooltipText: 'High level organization using/owning the application.'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                productionYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Production Year',
                        tooltipText: 'Year the application entered production'
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
                        label: 'Retired Year',
                        tooltipText: 'Year the application entered retirement'
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
                objInvestmentId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Investment',
                        alien: true,
                        endpoint: 'investments',
                        takes: 'number',
                        choices: this.props.staticRepo.investments,
                        tooltipText: 'OMB Investment funding the application'
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
                        choices: valueLists.UserCountBreakdown,
                        tooltipText: 'Approximately how many people use this application.'
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
                        choices: valueLists.RegionChoices,
                        tooltipText: 'Field used to create sub reports of applications'
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
                        choices: valueLists.ConfirmChoices,
                        tooltipText: 'Does the application generate revenue?'
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
                        choices: valueLists.TierChoices,
                        tooltipText: 'Application Classification with respect to ownership/funding. '
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                url: {
                    elementType: 'text',
                    elementConfig: {
                        type: "url",
                        label: 'URL',
                        tooltipText: 'url used to access the application'
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
                        choices: valueLists.ConfirmChoices,
                        tooltipText: 'Indicator whether the application has some pricacy/PII or CUI implications'
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
                        choices: this.props.staticRepo.portfolios,
                        tooltipText: 'Governance portfolio to which the application belongs'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                referenceDocument: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Reference Document',
                        tooltipText: 'Link to the location where reference document is stored'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                applicationNotes: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Notes',
                        multiline: true,
                        tooltipText: 'Used to describe notes regarding the Application'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                userLocations: {
                    id: 'userLocations',
                    elementType: 'multiselect',
                    elementConfig: {
                        id: 'userLocations',
                        label: 'User Locations',
                        endpoint: 'userlocations',
                        alien: true,
                        nameField: 'keyname',
                        choices: this.props.staticRepo.userLocations,
                        tooltipText: 'Application user locations'
                    },
                    valid: true,
                    value: []
                },
                capabilities: {
                    id: 'capabilities',
                    elementType: 'multiselect',
                    elementConfig: {
                        id: 'capabilities',
                        label: 'Capabilties',
                        alien: true,
                        nameField: 'keyname',
                        endpoint: 'capabilities',
                        choices: this.props.staticRepo.capabilities,
                        tooltipText: 'List of Business Capabilities supported by the application'
                    },
                    valid: true,
                    value: []
                },
                users: {
                    id: 'users',
                    elementType: 'multiselect',
                    elementConfig: {
                        id: 'users',
                        label: 'Users',
                        alien: true,
                        nameField: 'keyname',
                        endpoint: 'users',
                        choices: this.props.staticRepo.users,
                        tooltipText: 'Organizations using the application'
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
        if (inputIdentifier === 'retiredYear') {
            if (!isValid) {
                const updatedElemProdYear = {...updatedEditForm['productionYear']};
                const updatedElemProdYearConstraints = {...updatedElemProdYear.constraints};
                const updatedElemProdYearConstraintsNumericality = {...updatedElemProdYearConstraints.numericality};
                updatedElemProdYearConstraintsNumericality.lessThan = +event.target.value;
                updatedElemProdYearConstraints.numericality = updatedElemProdYearConstraintsNumericality;
                updatedElemProdYear.constraints = updatedElemProdYearConstraints;
                updatedEditForm['productionYear'] = updatedElemProdYear;
            }

            if (updatedFormElement.value === "") {
                updatedFormElement.value = null;
                updatedFormElement.valid = true;
            }
        }
        if (inputIdentifier === 'productionYear') {
            if (!isValid) {
                const updatedElemRetYear = {...updatedEditForm['retiredYear']};
                const updatedElemRetYearConstraints = {...updatedElemRetYear.constraints};
                const updatedElemRetYearConstraintsNumericality = {...updatedElemRetYearConstraints.numericality};
                updatedElemRetYearConstraintsNumericality.greaterThan = +event.target.value;
                updatedElemRetYearConstraints.numericality = updatedElemRetYearConstraintsNumericality;
                updatedElemRetYear.constraints = updatedElemRetYearConstraints;
                updatedEditForm['retiredYear'] = updatedElemRetYear;
            }

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
        if (!this.state.loaded) {
            let loaded = true;

            const updatedEditForm = {...this.state.editForm};
            for (let inputIdentifier in updatedEditForm) {
                const updatedFormElem = {...updatedEditForm[inputIdentifier]};
                if (updatedFormElem.elementConfig && updatedFormElem.elementConfig.alien) {
                    const updatedElemConfig = {...updatedEditForm[inputIdentifier].elementConfig};
                    updatedElemConfig.choices = nextProps.staticRepo[updatedFormElem.elementConfig.endpoint] ?
                        nextProps.staticRepo[updatedFormElem.elementConfig.endpoint] : [];
                    if (updatedElemConfig.choices.length === 0) {
                        loaded = false
                    }
                    updatedFormElem.elementConfig = updatedElemConfig;
                }
                updatedEditForm[inputIdentifier] = updatedFormElem;
            }
            this.setState({editForm: updatedEditForm, loaded: loaded});
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
        updateFieldApp: bindActionCreators(updateFieldApp, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationBusinessTab));