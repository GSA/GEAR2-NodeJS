import React, {Component} from 'react';
import {SimpleForm} from 'react-admin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    loadApplication as loadApplicationAction,
    saveApplication as saveApplicationAction
} from "../../actions/applicationActions";
import Input from "../../components/presentational/Input";
import * as valueLists from "../../valuelists";

class ApplicationCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createForm: {
                applicationName: {
                    elementType: 'text',
                    elementConfig: {
                        placeholder: 'Application Name'
                    },
                    value: ''
                },
                applicationAlias: {
                    elementType: 'text',
                    elementConfig: {
                        placeholder: 'Application Alias'
                    },
                    value: ''
                },
                applicationShortName: {
                    elementType: 'text',
                    elementConfig: {
                        placeholder: 'Short name will appear in graphic'
                    },
                    value: ''
                },
                /*applicationCloud: {
                    elementType: 'select',
                    elementConfig: {
                        placeholder: 'Cloud',
                        choices: valueLists.ConfirmChoices
                    },
                    value: ''
                }*/
            }
        };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.createForm
        };
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
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
            <SimpleForm>
                {form}
            </SimpleForm>)
    }
}

const mapStateToProps = state => ({application: state.application});

function mapDispatchToProps(dispatch) {
    return {
        saveApplication: bindActionCreators(saveApplicationAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCreateForm);

