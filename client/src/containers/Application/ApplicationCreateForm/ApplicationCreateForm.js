import React, {Component} from 'react';
import {SimpleForm} from 'react-admin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    saveNewApplication,
    saveApplication
} from "../../../actions/applicationActions";
import Input from "../../../components/presentational/Input";
import * as valueLists from "../../../valuelists";
import { withRouter } from "react-router";
import {removeDuplicates} from "../../../shared/utility";

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
                    value: null
                },
                applicationAlias: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Alias'
                    },
                    value: null
                },
                description: {
                    elementType: 'text',
                    elementConfig: {
                        multiline: true,
                        required: true,
                        label: "Description"
                    },
                    value: null
                },
                displayName: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Short name will appear in graphic',
                        required: true
                    },
                    value: null
                },
                cloudIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Cloud',
                        choices: valueLists.ConfirmChoices
                    },
                    value: null
                },
                mobileAppIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Mobile',
                        choices: valueLists.ConfirmChoices
                    },
                    value: null
                },
                desktopIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Desktop',
                        choices: valueLists.ConfirmChoices
                    },
                    value: null
                },
                regionalClassification: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Regional Classification',
                        choices: valueLists.RegionChoices
                    },
                    value: null
                },
                applicationOrWebsite: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        required: true,
                        label: 'Application Or Website',
                        choices: valueLists.AppOrWebChoices
                    },
                    value: null
                },
                objAppHostingproviderId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Application Hosting Provider',
                        choices: this.props.application.providers
                    },
                    value: null
                },
                numberOfUsers: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Number of users',
                        choices: valueLists.UserCountBreakdown
                    },
                    value: null
                },
                generateRevenueIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Generates Revenue',
                        choices: valueLists.ConfirmChoices
                    },
                    value: null
                },
                tier: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Tier',
                        choices: valueLists.ConfirmChoices
                    },
                    value: null
                },
                productionYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Production Year'
                    },
                    value: null
                },
                retiredYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Retired Year'
                    },
                    value: null
                },
                url: {
                    elementType: 'text',
                    elementConfig: {
                        type: "url",
                        label: 'URL'
                    },
                    value: null
                },
                cuiIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'CUI',
                        choices: valueLists.ConfirmChoices
                    },
                    value: null
                },
                uniqueIdentifierCode: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Unique Identifier Code',
                        required: true
                    },
                    value: null
                },
                referenceDocument: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Reference Document'
                    },
                    value: null
                },
                objOrgSsoId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'SSO',
                        choices: this.props.application.users
                    },
                    value: null
                },
                objParentSystemId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Parent System',
                        choices: this.props.application.parents
                    },
                    value: null
                },
                objInvestmentId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Investment',
                        choices: this.props.application.investments
                    },
                    value: null
                },
                objPortfolioId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Parent System',
                        choices: this.props.application.portfolios
                    },
                    value: null
                },
                objFismaId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'FISMA System',
                        choices: this.props.application.fismas
                    },
                    value: null
                },
                objAppUserlocId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'User Location',
                        choices: this.props.application.userlocations
                    },
                    value: null
                },
                objApplicationStatusId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Application Status',
                        required: true,
                        choices: valueLists.ApplicationStatuses
                    },
                    value: null
                },
                applicationNotes: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Notes',
                        multiline: true
                    },
                    value: null
                }
            },
            multipleSelect: {
                technologies: {
                    id: 'technologies',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technologies',
                        options: this.props.application.technologies
                    },
                    value: []
                },
                capabilities: {
                    id: 'capabilities',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Capabilties',
                        options: this.props.application.capabilities
                    },
                    value: []
                },
                users: {
                    id: 'users',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Users',
                        options: this.props.application.users
                    },
                    value: []
                },
                business_pocs: {
                    id: 'business_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Business POCs',
                        options: this.props.application.pocs
                    },
                    value: []
                },
                technical_pocs: {
                    id: 'technical_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technology POCs',
                        options: this.props.application.pocs
                    },
                    value: []
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
        for (let formElem in this.state.multipleSelect) {
            formElem.value = formElem.value ? removeDuplicates(formElem.value, 'id') : null;
        }
        const applicationForm = {};
        for (let formElem in this.state.createForm) {
            applicationForm[formElem] = this.state.createForm[formElem].value;
        }

        const applicationConsolidatedForm = {};
        const applicationConsolidated = {...this.state.multipleSelect};
        for (let formElem in applicationConsolidated) {
            applicationConsolidatedForm[formElem] = applicationConsolidated[formElem].value;
        }

        this.props.saveNewApplication(applicationForm, applicationConsolidatedForm);
            this.props.history.push('/applications');
    };


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
        saveNewApplication: bindActionCreators(saveNewApplication, dispatch),
        saveApplication: bindActionCreators(saveApplication, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationCreateForm));

