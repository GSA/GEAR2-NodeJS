import {Component} from "react";
import ApplicationEditForm from "./ApplicationEditForm/ApplicationEditForm";
import ApplicationBusinessEdit from "./ApplicationEditForm/ApplicationBusinessEdit";
import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './react-tabs.css'
import {
    saveApplication, saveApplicationStart
} from "../../actions/applicationActions";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {SaveButton} from 'react-admin';

class AppEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            message: null
        }
    }

    myCallback = (dataFromChild, message) => {
        debugger;
        this.setState({ valid: dataFromChild,  message: message});

    };

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
            <div>
                <Tabs forceRenderTabPanel save={this.save}>
                    <TabList>
                        <Tab>Genreal</Tab>
                        <Tab>Business</Tab>
                    </TabList>
                    <TabPanel>
                        <ApplicationEditForm fromParent={this.myCallback} id={this.props.id} style={{padding: '10px'}}/>
                    </TabPanel>
                    <TabPanel>
                        <ApplicationBusinessEdit id={this.props.id}/>
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
    errMessage: state.application.errorMessage
});

function mapDispatchToProps(dispatch) {
    return {
        showNotification: bindActionCreators((payload) => {
            return {type: 'RA/SHOW_NOTIFICATION', payload: payload}
        }, dispatch),
        saveApplication: bindActionCreators(saveApplication, dispatch)
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(AppEdit));