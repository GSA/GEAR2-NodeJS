import React, {Component} from "react";
import {SimpleForm} from 'react-admin';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadApplication as loadApplicationAction} from "./actions/applicationActions";
import {saveApplication as saveApplicationAction} from "./actions/applicationActions";
import {ConfirmChoices, RegionChoices, AppOrWebChoices, UserCountBreakdown, TierChoices} from './valuelists';
import GTextControl from "./components/presentational/GTextControl";
import GSelectControl from "./components/presentational/GSelectControl";
import GMultiSelectControl from "./components/presentational/GMultiSelectControl";

class ApplicationEditForm extends Component {

    constructor(props) {
        super(props);
        this.props.loadApplication(this.props.id);
        this.state = {
                keyname: " ",
                technologies: [],
                users: [],
                capabilities: [],
                business_pocs: [],
                technical_pocs: [],
                fismas: [],
                platforms: []

        };

        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteChip = this.handleDeleteChip.bind(this);
        this.addChip = this.addChip.bind(this);
        this.modifyValue = this.modifyValue.bind(this);

        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({...nextProps.application.application});
    }


    componentDidMount() {

    }

    addChip(fieldId, item) {
        let newState = Object.assign({}, this.state);
        newState.application[fieldId].push(item);
        this.setState(newState);
    }

    handleDeleteChip(fieldId, deletedChip) {
        let newState = Object.assign({}, this.state);
        newState.application[fieldId] = newState.application[fieldId].filter(function (obj) {
            return obj.id !== deletedChip;
        });
        this.setState(newState);
    }

    modifyValue(e, fieldName) {
        console.log("changing " + fieldName);
        this.setState({ ...this.state, [fieldName]: e.target.value });
    }

    save() {
        this.props.saveApplication(this.state);
        this.props.history.push('/applications');
    }

    handleClick(data) {
       //maybe pop-up with information about the technology or open new tab to tech page
    }

    render() {
        return (
            <SimpleForm record={this.state} resource="applications" save={this.save}>
                <GTextControl id = 'id' value = {this.state.id} label = 'Id' disabled = {true}/>

                <GTextControl id = 'keyname' label = 'Application name *' handleChange = {this.modifyValue}
                    value = {this.state.keyname}/>

                <GTextControl id = 'applicationAlias' handleChange = {this.modifyValue}
                    label = 'Application alias' value = {this.state.applicationAlias}/>

                <GTextControl id = 'displayName' handleChange = {this.modifyValue} label = 'Short name will appear in graphic *'
                              value={this.state.displayName}/>

                <GTextControl id = 'description' handleChange = {this.modifyValue} label = 'Description *'
                              value={this.state.description}/>

                <GSelectControl field={{id: 'mobileAppIndicator', value: this.state.mobileAppIndicator,
                    choices: ConfirmChoices, label: 'Mobile', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'desktopIndicator', value: this.state.desktopIndicator,
                    choices: ConfirmChoices, label: 'Desktop', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'regionalClassification', value: this.state.regionalClassification,
                    choices: RegionChoices, label: 'Regional classification', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'applicationOrWebsite', value: this.state.applicationOrWebsite,
                    choices: AppOrWebChoices, label: 'Application or website *', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'numberOfUsers', value: this.state.numberOfUsers,
                    choices: UserCountBreakdown, label: 'Number of users', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'generateRevenueIndicator', value: this.state.generateRevenueIndicator,
                    choices: ConfirmChoices, label: 'Generates revenue', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objAppPlatformId', value: this.state.objAppPlatformId,
                    choices: this.props.application.platforms, nameField: 'keyname',
                    label: 'Application Platform', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objAppHostingproviderId', value: this.state.objAppHostingproviderId,
                    choices: this.props.application.providers, nameField: 'keyname', label: 'Application Hosting Provider', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'tier', value: this.state.tier,
                    choices: TierChoices, label: 'Tier', handleChange: this.modifyValue}}/>

                <GTextControl id = 'productionYear' label = 'Production Year' handleChange = {this.modifyValue}
                              value={this.state.productionYear}/>

                <GTextControl id = 'retiredYear' label = 'Retired Year' handleChange = {this.modifyValue}
                              value={this.state.retiredYear}/>

                <GTextControl id = 'url' label = 'URL' handleChange = {this.modifyValue}
                                value={this.state.url}/>

                <GSelectControl field={{id: 'cuiIndicator', value: this.state.cuiIndicator,
                    choices: ConfirmChoices, label: 'CUI', handleChange: this.modifyValue}}/>

                <GTextControl id = 'uniqueIdentifierCode' handleChange = {this.modifyValue}
                    defaultValue = "0233-0000-0000000-xxxx" label = 'Unique identifier code *'
                              value={this.state.uniqueIdentifierCode}/>

                <GTextControl id = 'referenceDocument' label = 'Reference Document' handleChange = {this.modifyValue}
                              value={this.state.referenceDocument}/>

                <GSelectControl field={{id: 'objOrgSsoId', value: this.state.objOrgSsoId,
                    choices: this.props.application.users, nameField: 'keyname', label: 'SSO', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objParentSystemId', value: this.state.objParentSystemId,
                    choices: this.props.application.parents, nameField: 'keyname', label: 'Parent system', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objInvestmentId', value: this.state.objInvestmentId,
                    choices: this.props.application.investments, nameField: 'keyname', label: 'Investment', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objPortfolioId', value: this.state.objPortfolioId,
                    choices: this.props.application.portfolios, nameField: 'keyname', label: 'Portfolio', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objFismaId', value: this.state.objFismaId,
                    choices: this.props.application.fismas, nameField: 'fismaSysId', label: 'FISMA system', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objAppUserLocId', value: this.state.objAppUserLocId,
                    choices: this.props.application.userlocations, nameField: 'keyname', label: 'User location', handleChange: this.modifyValue}}/>

                <GSelectControl field={{id: 'objApplicationStatusId', value: this.state.objApplicationStatusId,
                    choices: ConfirmChoices, label: 'Application status', handleChange: this.modifyValue}}/>

                <GMultiSelectControl field={{
                    id: 'technologies',
                    label: 'Technologies',
                    values: this.state.technologies,
                    handleDeleteChip: this.handleDeleteChip,
                    handleChipClick: this.handleChipClick,
                    add: this.addChip,
                    options: this.props.application.technologies,
                    helper: 'Add this technology'
                }} />

                <GMultiSelectControl field={{
                    id: 'capabilities',
                    label: 'Capabilities',
                    values: this.state.capabilities,
                    handleDeleteChip: this.handleDeleteChip,
                    handleChipClick: this.handleChipClick,
                    add: this.addChip,
                    options: this.props.application.capabilities,
                    helper: 'Add this capability'
                }} />

                <GMultiSelectControl field={{
                    id: 'users',
                    label: 'Users',
                    values: this.state.users,
                    handleDeleteChip: this.handleDeleteChip,
                    handleChipClick: this.handleChipClick,
                    add: this.addChip,
                    options: this.props.application.users,
                    helper: 'Add this user'
                }} />

                <GMultiSelectControl field={{
                    id: 'business_pocs',
                    label: 'Business POCs',
                    values: this.state.business_pocs,
                    handleDeleteChip: this.handleDeleteChip,
                    handleChipClick: this.handleChipClick,
                    add: this.addChip,
                    options: this.props.application.pocs,
                    helper: 'Add the POC'
                }} />

                 <GMultiSelectControl field={{
                    id: 'technical_pocs',
                    label: 'Technology POCs',
                    values: this.state.technical_pocs,
                    handleDeleteChip: this.handleDeleteChip,
                    handleChipClick: this.handleChipClick,
                    add: this.addChip,
                    options: this.props.application.pocs,
                    helper: 'Add the POC'
                }} />

                <GTextControl id = 'applicationNotes' handleChange = {this.modifyValue}
                    label = 'Application notes' multiline = {true}
                              value={this.state.applicationNotes}/>

            </SimpleForm>
        );
    }
}

ApplicationEditForm.propTypes = {
    application: PropTypes.object.isRequired,
    loadApplication: PropTypes.func.isRequired,
    saveApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ application: state.application });

function mapDispatchToProps(dispatch) {
    return {
        loadApplication: bindActionCreators(loadApplicationAction, dispatch),
        saveApplication: bindActionCreators(saveApplicationAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationEditForm);
