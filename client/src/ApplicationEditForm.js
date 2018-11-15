import React, {Component} from "react";
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadApplication as loadApplicationAction} from "./actions/applicationActions";
import {loadTechnologies as loadTechnologiesAction} from "./actions/technologyActions";
import {loadUsers as loadUsersAction} from "./actions/userActions";
import {loadCapabilities as loadCapabilities} from "./actions/capabilitiesActions";
import {loadBusinessPOCs as loadBusinessPOCs} from "./actions/pocActions";
import {ConfirmChoices, RegionChoices, AppOrWebChoices, UserCountBreakdown, TierChoices} from './valuelists';
import {styles as styles} from './components/presentational/styles';
import GTextControl from "./components/presentational/GTextControl";
import GSelectControl from "./components/presentational/GSelectControl";
import GMultiSelectControl from "./components/presentational/GMultiSelectControl";

class ApplicationEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            application: {
                keyname: '',
                technologies: [],
                users: [],
                capabilities: [],
                business_pocs: [],
                technical_pocs: [],
                fismas: [],
                platforms: []
            },
            tech: '',
            user: '',
            capability: '',
            tpoc: '',
            bpoc: ''
        };

        //this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleDeleteTechChip = this.handleDeleteTechChip.bind(this);
        this.addTechnology = this.addTechnology.bind(this);
        this.saveTech = this.saveTech.bind(this);

        this.handleDeleteUserChip = this.handleDeleteUserChip.bind(this);
        this.addUser = this.addUser.bind(this);
        this.saveUser = this.saveUser.bind(this);

        this.handleDeleteCapabilityChip = this.handleDeleteCapabilityChip.bind(this);
        this.addCapability = this.addCapability.bind(this);
        this.saveCapability = this.saveCapability.bind(this);

        this.handleDeleteBPocChip = this.handleDeleteBPocChip.bind(this);
        this.addBPoc = this.addBPoc.bind(this);
        this.saveBPoc = this.saveBPoc.bind(this);

        this.handleDeleteTPocChip = this.handleDeleteTPocChip.bind(this);
        this.addTPoc = this.addTPoc.bind(this);
        this.saveTPoc = this.saveTPoc.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.application);
        this.setState(
            {
                application: nextProps.application.application,
                tech: (nextProps.application.technologies.length > 0) ? nextProps.application.technologies[0].keyname : '',
                user: (nextProps.application.users.length > 0) ? nextProps.application.users[0].keyname : '',
                capability: (nextProps.application.capabilities.length > 0) ? nextProps.application.capabilities[0].keyname : '',
                tpoc: (nextProps.application.pocs.length > 0) ? nextProps.application.pocs[0].keyname : '',
                bpoc: (nextProps.application.pocs.length > 0) ? nextProps.application.pocs[0].keyname : ''

            });
    }


    componentDidMount() {
        this.props.loadApplication(this.props.id);
    }

    addTechnology() {
        let newState = Object.assign({}, this.state);
        newState.application.technologies.push({id: new Date().getUTCMilliseconds(), keyname: this.state.tech});
        this.setState(newState);
    }

    addUser() {
        let newState = Object.assign({}, this.state);
        newState.application.users.push({id: new Date().getUTCMilliseconds(), keyname: this.state.user});
        this.setState(newState);
    }

    addBPoc() {
        let newState = Object.assign({}, this.state);
        newState.application.business_pocs.push({id: new Date().getUTCMilliseconds(), keyname: this.state.bpoc});
        this.setState(newState);
    }

    addTPoc() {
        let newState = Object.assign({}, this.state);
        newState.application.technical_pocs.push({id: new Date().getUTCMilliseconds(), keyname: this.state.tpoc});
        this.setState(newState);
    }

    addCapability() {
        let newState = Object.assign({}, this.state);
        newState.application.capabilities.push({id: new Date().getUTCMilliseconds(), keyname: this.state.capability});
        this.setState(newState);
    }

    handleDeleteTechChip(deletedChip) {
        let newState = Object.assign({}, this.state);
        let techs = newState.application.technologies.filter(function (obj) {
            return obj.keyname !== deletedChip;
        });
        newState.application.technologies = techs;
        this.setState(newState);
    }

    handleDeleteBPocChip(deletedChip) {
        let newState = Object.assign({}, this.state);
        /*let techs = newState.application.technologies.filter(function (obj) {
            return obj.keyname !== deletedChip;
        });
        newState.application.technologies = techs;*/
        this.setState(newState);
    }

    handleDeleteTPocChip(deletedChip) {
        let newState = Object.assign({}, this.state);
        /*let techs = newState.application.technologies.filter(function (obj) {
            return obj.keyname !== deletedChip;
        });
        newState.application.technologies = techs;*/
        this.setState(newState);
    }

    handleDeleteUserChip(deletedChip) {
        let newState = Object.assign({}, this.state);
        let users = newState.application.users.filter(function (obj) {
            return obj.keyname !== deletedChip;
        });
        newState.application.users = users;
        this.setState(newState);
    }

    handleDeleteCapabilityChip(deletedChip) {
        let newState = Object.assign({}, this.state);
        let users = newState.application.capabilities.filter(function (obj) {
            return obj.keyname !== deletedChip;
        });
        newState.application.capabilities = users;
        this.setState(newState);
    }

    handleClick(data) {
        /*this.setState(state => {
            const chipData = [...state.technologies];
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            return { chipData };
        });*/
    }

    saveTech(event) {
        this.setState({
            application: this.state.application,
            tech: event.target.value,
            user: this.state.user,
            capability: this.state.capability
        });
    }

    saveBPoc(event) {
        this.setState({
            application: this.state.application,
            tech: event.target.value,
            user: this.state.user,
            capability: this.state.capability
        });
    }

    saveTPoc(event) {
        this.setState({
            application: this.state.application,
            tech: event.target.value,
            user: this.state.user,
            capability: this.state.capability
        });
    }
    saveUser(event) {
        this.setState({
            application: this.state.application,
            tech: this.state.tech,
            user: event.target.value,
            capability: this.state.capability
        });
    }

    saveCapability(event) {
        this.setState({
            application: this.state.application,
            tech: this.state.tech,
            user: this.state.user,
            capability: event.target.value
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <GTextControl field={{id: 'id', value: this.state.application.id, label: 'Id', disabled: true}}/>

                <GTextControl field={{id: 'name', value: this.state.application.keyname, label: 'Application name *'}}/>

                <GTextControl field={{id: 'alias', value: this.state.application.applicationAlias, label: 'Application alias'}}/>

                <GTextControl field={{id: 'displayName', value: this.state.application.displayName, label: 'Short name will appear in graphic *'}}/>

                <GTextControl field={{id: 'description', value: this.state.application.description, label: 'Description *'}}/>

                <GSelectControl field={{id: 'mobileAppIndicator', value: this.state.application.mobileAppIndicator,
                    choices: ConfirmChoices, label: 'Mobile'}}/>

                <GSelectControl field={{id: 'desktopIndicator', value: this.state.application.desktopIndicator,
                    choices: ConfirmChoices, label: 'Desktop'}}/>

                <GSelectControl field={{id: 'regionalClassification', value: this.state.application.regionalClassification,
                    choices: RegionChoices, label: 'Regional classification'}}/>

                <GSelectControl field={{id: 'applicationOrWebsite', value: this.state.application.applicationOrWebsite,
                    choices: AppOrWebChoices, label: 'Application or website *'}}/>

                <GSelectControl field={{id: 'numberOfUsers', value: this.state.application.numberOfUsers,
                    choices: UserCountBreakdown, label: 'Number of users'}}/>

                <GSelectControl field={{id: 'generateRevenueIndicator', value: this.state.application.generateRevenueIndicator,
                    choices: ConfirmChoices, label: 'Generates revenue'}}/>

                <GSelectControl field={{id: 'objAppPlatformId', value: this.state.application.objAppPlatformId,
                    choices: this.props.application.platforms, nameField: 'keyname', label: 'Application Platform'}}/>

                <GSelectControl field={{id: 'objAppHostingproviderId', value: this.state.application.objAppHostingproviderId,
                    choices: this.props.application.providers, nameField: 'keyname', label: 'Application Hosting Provider'}}/>

                <GSelectControl field={{id: 'tier', value: this.state.application.tier,
                    choices: TierChoices, label: 'Tier'}}/>

                <GTextControl field={{id: 'prodYear', value: this.state.application.productionYear, label: 'Production Year'}}/>

                <GTextControl field={{id: 'retiredYear', value: this.state.application.retiredYear, label: 'Retired Year'}}/>

                <GTextControl field={{id: 'url', value: this.state.application.url, label: 'URL'}}/>

                <GSelectControl field={{id: 'cuiIndicator', value: this.state.application.cuiIndicator,
                    choices: ConfirmChoices, label: 'CUI'}}/>

                <GTextControl field={{id: 'uniqueIdentifierCode', value: this.state.application.uniqueIdentifierCode,
                    defaultValue: "0233-0000-0000000-xxxx", label: 'Unique identifier code *'}}/>

                <GTextControl field={{id: 'referenceDocument', value: this.state.application.referenceDocument, label: 'Reference Document'}}/>

                <GSelectControl field={{id: 'objOrgSsoId', value: this.state.application.objOrgSsoId,
                    choices: this.props.application.users, nameField: 'keyname', label: 'SSO'}}/>

                <GSelectControl field={{id: 'objParentSystemId', value: this.state.application.objParentSystemId,
                    choices: this.props.application.parents, nameField: 'keyname', label: 'Parent system'}}/>

                <GSelectControl field={{id: 'objInvestmentId', value: this.state.application.objInvestmentId,
                    choices: this.props.application.investments, nameField: 'keyname', label: 'Investment'}}/>

                <GSelectControl field={{id: 'objPortfolioId', value: this.state.application.objPortfolioId,
                    choices: this.props.application.portfolios, nameField: 'keyname', label: 'Portfolio'}}/>

                <GSelectControl field={{id: 'objFismaId', value: this.state.application.objFismaId,
                    choices: this.props.application.fismas, nameField: 'fismaSysId', label: 'FISMA system'}}/>

                {/*<FormControl fullWidth={true} classes={styles.formControl}>
                    <InputLabel className={styles.fieldLabel} htmlFor="name">User location</InputLabel>
                    <br/>
                    <Select native
                            value={this.state.application.objAppUserlocId}>
                        {ConfirmChoices.map(data => {
                            return (
                                <option key={data.id} value={data.id}>{data.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>
                <br/><br/>*/}

                <GSelectControl field={{id: 'objAppUserlocId', value: this.state.application.objAppUserlocId,
                    choices: this.props.application.userlocations, nameField: 'keyname', label: 'User location'}}/>

                <GSelectControl field={{id: 'objApplicationStatusId', value: this.state.application.objApplicationStatusId,
                    choices: ConfirmChoices, label: 'Application status'}}/>

                <GMultiSelectControl field={{
                    id: 'technologies',
                    label: 'Technologies',
                    values: this.state.application.technologies,
                    handleDeleteChip: this.handleDeleteTechChip,
                    handleChipClick: this.handleClick,
                    save: this.saveTech,
                    firstVal: this.state.tech,
                    add: this.addTechnology,
                    options: this.props.application.technologies,
                    helper: 'Add this technology'
                }} />

                <GMultiSelectControl field={{
                    id: 'capabilities',
                    label: 'Capabilities',
                    values: this.state.application.capabilities,
                    handleDeleteChip: this.handleDeleteCapabilityChip,
                    handleChipClick: this.handleClick,
                    save: this.saveCapability,
                    firstVal: this.state.capability,
                    add: this.addCapability,
                    options: this.props.application.capabilities,
                    helper: 'Add this capability'
                }} />

                <GMultiSelectControl field={{
                    id: 'users',
                    label: 'Users',
                    values: this.state.application.users,
                    handleDeleteChip: this.handleDeleteUserChip,
                    handleChipClick: this.handleClick,
                    save: this.saveUser,
                    firstVal: this.state.user,
                    add: this.addUser,
                    options: this.props.application.users,
                    helper: 'Add this user'
                }} />

                <GMultiSelectControl field={{
                    id: 'businesspocs',
                    label: 'Business POCs',
                    values: this.state.application.business_pocs,
                    handleDeleteChip: this.handleDeleteBPocChip,
                    handleChipClick: this.handleClick,
                    save: this.saveBPoc,
                    firstVal: this.state.bpoc,
                    add: this.addBPoc,
                    options: this.props.application.pocs,
                    helper: 'Add the POC'
                }} />

                 <GMultiSelectControl field={{
                    id: 'techpocs',
                    label: 'Technology POCs',
                    values: this.state.application.technical_pocs,
                    handleDeleteChip: this.handleDeleteTPocChip,
                    handleChipClick: this.handleClick,
                    save: this.saveTPoc,
                    firstVal: this.state.tpoc,
                    add: this.addTPoc,
                    options: this.props.application.pocs,
                    helper: 'Add the POC'
                }} />

                <GTextControl field={{id: 'applicationNotes', value: this.state.application.applicationNotes,
                    label: 'Application notes', multiline: true}}/>

            </div>
        );
    }
}

ApplicationEditForm.propTypes = {
    application: PropTypes.object.isRequired,
    loadApplication: PropTypes.func.isRequired,
    loadTechnologies: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    loadCapabilities: PropTypes.func.isRequired,
    loadBusinessPOCs: PropTypes.func.isRequired,
    loadTechPOCs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ application: state.application });

function mapDispatchToProps(dispatch) {
    return {
        loadApplication: bindActionCreators(loadApplicationAction, dispatch),
        loadTechnologies: bindActionCreators(loadTechnologiesAction, dispatch),
        loadUsers: bindActionCreators(loadUsersAction, dispatch),
        loadCapabilities: bindActionCreators(loadCapabilities, dispatch),
        loadBusinessPOCs: bindActionCreators(loadCapabilities, dispatch),
        loadTechPOCs: bindActionCreators(loadCapabilities, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationEditForm);