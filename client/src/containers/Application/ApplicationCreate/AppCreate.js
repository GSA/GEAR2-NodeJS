import {Component} from "react";
import ApplicationEditForm from "../ApplicationEditForm/ApplicationEditForm";
import ApplicationBusinessEdit from "../ApplicationEditForm/ApplicationBusinessEdit";
import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router";
import '../react-tabs.css'
import {
    saveNewApplication
} from "../../../actions/applicationActions";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {SaveButton} from 'react-admin';
import ErrorIcon from '@material-ui/icons/Report'
import ApplicationGeneralTab from "./ApplicationGeneralTab/ApplicationGeneralTab";
import ApplicationBusinessTab from "./ApplicationBusinessTab/ApplicationBusinessTab";
import ApplicationTechnologyTab from "./ApplicationTechnologyTab/ApplicationTechnologyTab";

const TabCustom = (props) => {
    return (
        <div style={{alignItems: 'center', display: 'flex'}}>
            {props.label}
            {props.showChip ? <ErrorIcon
                label="Not Saved"
                style={{
                    margin: '10px',
                    color: "#f44336"
                }}
            /> : undefined }
        </div>
    )
};

class AppEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            message: null
        }
    }

    myCallback = (dataFromChild, message) => {
        this.setState({ valid: dataFromChild,  message: message});

    };

    save = () => {
        this.props.saveApplication(this.props.id);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errMessageGeneral) {
            this.props.showNotification({
                message: `General Tab was not saved; contact GEAR Team`,
                type: 'warning'
            })
        }
        if (nextProps.errMessageBusiness) {
            this.props.showNotification({
                message: `Business Tab was not saved; contact GEAR Team`,
                type: 'warning'
            })
        }
        if (nextProps.errMessageTech)
            this.props.showNotification({
                message: `Technology Tab was not saved; contact GEAR Team`,
                type: 'warning'
            });
        if (nextProps.saved) {
            this.props.history.push('/applications');
            this.props.showNotification({
                message: `Create Application Success: All tabs saved`,
                type: 'info'
            });
        }
    }

    render() {
        return (
            <div>
                <Tabs forceRenderTabPanel save={this.save}>
                    <TabList>
                        <Tab><TabCustom label="General" showChip={this.props.saveFailedGeneral}/></Tab>
                        <Tab><TabCustom label="Business" showChip={this.props.saveFailedBusiness}/></Tab>
                        <Tab><TabCustom label="Technology" showChip={this.props.saveFailedTechnology}/></Tab>
                    </TabList>
                    <TabPanel>
                        <ApplicationGeneralTab fromParent={this.myCallback} id={this.props.id} style={{padding: '10px'}}/>
                    </TabPanel>
                    <TabPanel>
                        <ApplicationBusinessTab fromParent={this.myCallback} id={this.props.id} style={{padding: '10px'}}/>
                    </TabPanel>
                    <TabPanel>
                        <ApplicationTechnologyTab fromParent={this.myCallback} id={this.props.id} style={{padding: '10px'}}/>
                    </TabPanel>
                </Tabs>

                <SaveButton disabled={!this.state.valid} style={{margin: '0px 0px 0px 40px'}} onClick={this.save}/>
                <div style={{margin: '0px 40px', color: 'salmon', fontSize: '70%'}}>
                    <p>{this.state.message} </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errMessageGeneral: state.appGeneral.errorMessage,
    errMessageBusiness: state.appBusiness.errorMessage,
    errMessageTech: state.appTechnology.errorMessage,
    saved: state.appGeneral.saved,

    saveFailedGeneral: state.appGeneral.saveFailed,
    saveFailedBusiness: state.appBusiness.saveFailed,
    saveFailedTechnology: state.appTechnology.saveFailed
});

function mapDispatchToProps(dispatch) {
    return {
        showNotification: bindActionCreators((payload) => {
            return {type: 'RA/SHOW_NOTIFICATION', payload: payload}
        }, dispatch),
        saveApplication: bindActionCreators(saveNewApplication, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppEdit));