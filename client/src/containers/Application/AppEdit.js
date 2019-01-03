import {Component} from "react";
import ApplicationEditForm from "./ApplicationEditForm/ApplicationEditForm";
import ApplicationBusinessEdit from "./ApplicationEditForm/ApplicationBusinessEdit";
import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Edit, TabbedForm, FormTab, CardActions, ShowButton
} from 'react-admin';
import {
    saveApplication, saveApplicationStart
} from "../../actions/applicationActions";

class AppEdit extends Component {
    constructor(props) {
        super(props);
    }

    save = () => {
        this.props.saveApplication(this.props.id);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errMessage) {
            this.props.showNotification({
                message: `Create Application Fail: ${nextProps.errMessage}`,
                type: 'warning'
            })
        }
    }

    render() {
        return (
            <TabbedForm save={this.save}>
                <FormTab label="General">
                    <ApplicationEditForm id={this.props.id}/>
                </FormTab>
                <FormTab label="Business" path="business">
                    <ApplicationBusinessEdit id={this.props.id}/>
                </FormTab>
            </TabbedForm>
        );
    }
}

const mapStateToProps = state => ({
    errMessage: state.application.errorMessage
});

function mapDispatchToProps(dispatch) {
    return {
        showNotification: bindActionCreators((payload) => {return {type: 'RA/SHOW_NOTIFICATION', payload: payload}}, dispatch),
        saveApplication: bindActionCreators(saveApplication, dispatch)
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(AppEdit));