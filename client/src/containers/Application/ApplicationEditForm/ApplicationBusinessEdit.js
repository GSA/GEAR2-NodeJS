import React, {Component} from "react";
import { bindActionCreators } from 'redux';
import {
    loadApplicationBusiness as loadApplicationAction, loadApplicationBusinessStart,
} from "../../../actions/applicationActions";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/presentational/Input";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './ApplicationEditForm.css'
import * as _ from 'underscore';

class ApplicationBusinessEdit extends Component {
    constructor (props) {
        super (props);
        if (!this.props.application.called) {
            this.props.loadApplicationBusinessStart();
            this.props.loadApplicationBusiness(this.props.id);
        }
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
                organizations: {
                    id: 'organizations',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'SSO',
                        endpoint: 'users',
                        alien: true,
                        nameField: 'keyname',
                        choices: this.props.staticRepo.users
                    },
                    valid: true,
                    value: []
                }
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.application.saved) {
            this.props.history.push('/applications');
            this.props.showNotification({
                message: `Edit Application Success`,
                type: 'info'
            })
        }

        if (nextProps.application.id && !this.state.loaded && !nextProps.application.loading) {
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedEditForm = {
            ...this.state.editForm
        };
        const updatedFormElement = {...updatedEditForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;

        updatedEditForm[inputIdentifier] = updatedFormElement;

        //create form should now have all elements including multiselect
        this.setState({editForm: updatedEditForm});
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(nextProps, this.props);
    }

    render () {
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
        return (<div className="ApplicationEditForm">
            {simpleForm}
        </div>);
    }
}

const mapStateToProps = state => ({
    application: state.appBusiness,
    staticRepo: state.staticRepo,
    loaded: state.application.loaded,
    errMessage: state.application.errorMessage,
    loading: state.application.loading
});

function mapDispatchToProps(dispatch) {
    return {
        loadApplicationBusiness: bindActionCreators(loadApplicationAction, dispatch),
        loadApplicationBusinessStart: bindActionCreators(loadApplicationBusinessStart, dispatch),
        showNotification: bindActionCreators((payload) => {return {type: 'RA/SHOW_NOTIFICATION', payload: payload}}, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationBusinessEdit));