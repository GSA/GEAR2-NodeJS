import React, { Component } from 'react';
import { SimpleForm } from 'react-admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    loadApplication as loadApplicationAction,
    saveApplication as saveApplicationAction
} from "../../actions/applicationActions";

class ApplicationCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (<SimpleForm>
            <button>CREATE</button>
        </SimpleForm>)
    }
}

const mapStateToProps = state => ({ application: state.application });

function mapDispatchToProps(dispatch) {
    return {
        loadApplication: bindActionCreators(loadApplicationAction, dispatch),
        saveApplication: bindActionCreators(saveApplicationAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCreateForm);

