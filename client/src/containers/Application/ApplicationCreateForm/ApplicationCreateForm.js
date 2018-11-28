import React, {Component} from 'react';
import {SimpleForm} from 'react-admin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    loadApplication as loadApplicationAction,
    saveApplication as saveApplicationAction, saveNewApplication
} from "../../../actions/applicationActions";
import Input from "../../../components/presentational/Input";
import * as valueLists from "../../../valuelists";

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
                    value: ''
                },
                applicationAlias: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Alias'
                    },
                    value: ''
                },
                description: {
                    elementType: 'text',
                    elementConfig: {
                        multiline: true,
                        required: true,
                        label: "Description"
                    }
                },
                displayName: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Short name will appear in graphic',
                        required: true
                    },
                    value: ''
                },
                cloudIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Cloud',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                },
                mobileAppIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Mobile',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                },
                desktopIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Desktop',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                },
                regionalClassification: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Regional Classification',
                        choices: valueLists.RegionChoices
                    },
                    value: ''
                },
                applicationOrWebsite: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        required: true,
                        label: 'Application Or Website',
                        choices: valueLists.AppOrWebChoices
                    },
                    value: ''
                },
                objAppHostingproviderId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Application Hosting Provider',
                        choices: this.props.application.providers
                    },
                    value: ''
                },
                numberOfUsers: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Number of users',
                        choices: valueLists.UserCountBreakdown
                    },
                    value: ''
                },
                generateRevenueIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Generates Revenue',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                },
                tier: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Tier',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                },
                productionYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Production Year'
                    },
                    value: ''
                },
                retiredYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Retired Year'
                    },
                    value: ''
                },
                url: {
                    elementType: 'text',
                    elementConfig: {
                        type: "url",
                        label: 'URL'
                    },
                    value: ''
                },
                cuiIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'CUI',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                },
                uniqueIdentifierCode: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Unique Identifier Code',
                        required: true
                    },
                    value: ''
                },
                referenceDocument: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Reference Document'
                    },
                    value: ''
                },
                objOrgSsoId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'SSO',
                        choices: this.props.application.users
                    },
                    value: ''
                },
                objParentSystemId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Parent System',
                        choices: this.props.application.parents
                    },
                    value: ''
                },
                objInvestmentId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Investment',
                        choices: this.props.application.investments
                    },
                    value: ''
                },
                objPortfolioId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Parent System',
                        choices: this.props.application.portfolios
                    },
                    value: ''
                },
                objFismaId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'FISMA System',
                        choices: this.props.application.fismas
                    },
                    value: ''
                },
                objAppUserlocId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'User Location',
                        choices: this.props.application.userlocations
                    },
                    value: ''
                },
                objApplicationStatusId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Application Status',
                        required: true,
                        choices: valueLists.ApplicationStatuses
                    },
                    value: ''
                },
                applicationNotes: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Notes',
                        multiline: true
                    },
                    value: ''
                }

            }
        };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCreateForm = {
            ...this.state.createForm
        };
        const updatedFormElement = {...updatedCreateForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedCreateForm[inputIdentifier] = updatedFormElement;
        this.setState({createForm: updatedCreateForm});
    };

    save = () => {
        const applicationForm = {};
        console.log('CreateForm', this.state);
        for (let formElem in this.state.createForm) {
            applicationForm[formElem] = this.state.createForm[formElem].value;
        }
        this.props.saveApplication(applicationForm);
    };


    render() {
        const formElements = [];
        for (let key in this.state.createForm) {
            formElements.push({
                id: key,
                config: this.state.createForm[key]
            })
        }
        let form = (
            formElements.map(elem => (
                <Input
                    key={elem.id}
                    elemType={elem.config.elementType}
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value}
                    changed={(event) => this.inputChangedHandler(event, elem.id)}
                />
            ))
        );
        return (
            <SimpleForm resource="applications" save={this.save}>
                {form}
            </SimpleForm>)
    }
}

const mapStateToProps = state => ({application: state.application});

function mapDispatchToProps(dispatch) {
    return {
        saveApplication: bindActionCreators(saveNewApplication, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCreateForm);

