import {Component} from "react";
import ApplicationEditForm from "../ApplicationEditForm/ApplicationEditForm";
import ApplicationBusinessEdit from "../ApplicationEditForm/ApplicationBusinessEdit";
import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router";
import '../react-tabs.css'
import {
    saveApplication, saveApplicationStart
} from "../../../actions/applicationActions";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {SaveButton} from 'react-admin';
import ApplicationGeneralTab from "./ApplicationGeneralTab/ApplicationGeneralTab";
import ApplicationBusinessTab from "./ApplicationBusinessTab/ApplicationBusinessTab";
import ApplicationTechnologyTab from "./ApplicationTechnologyTab/ApplicationTechnologyTab";

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
                message: `Edit Application Fail; All tabs not saved.`,
                type: 'warning'
            })
        } else if (nextProps.errMessageBusiness) {
            this.props.showNotification({
                message: `Edit Application Fail; Business and Technology tabs not saved.`,
                type: 'warning'
            })
        } else if (nextProps.errMessageTech)
            this.props.showNotification({
                message: `Edit Application Fail; Technology tab not saved.`,
                type: 'warning'
            });
        else if (nextProps.saved) {
            this.props.history.push('/applications');
            this.props.showNotification({
                message: `Edit Application Success: All tabs saved`,
                type: 'info'
            });

        }
    }

    render() {
        return (
            <div>
                <Tabs forceRenderTabPanel save={this.save}>
                    <TabList>
                        <Tab>General</Tab>
                        <Tab>Business</Tab>
                        <Tab>Technology</Tab>
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
    saved: state.appGeneral.saved
});

function mapDispatchToProps(dispatch) {
    return {
        showNotification: bindActionCreators((payload) => {
            return {type: 'RA/SHOW_NOTIFICATION', payload: payload}
        }, dispatch),
        saveApplication: bindActionCreators(saveApplication, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppEdit));