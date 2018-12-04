import React, {Component} from "react";
import {SimpleForm} from 'react-admin';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadApplication as loadApplicationAction, loadApplicationStart} from "./actions/applicationActions";
import {saveApplication as saveApplicationAction} from "./actions/applicationActions";
import {ConfirmChoices, RegionChoices, AppOrWebChoices, UserCountBreakdown, TierChoices} from './valuelists';
import GTextControl from "./components/presentational/GTextControl";
import GSelectControl from "./components/presentational/GSelectControl";
import GMultiSelectControl from "./components/presentational/GMultiSelectControl";
import { withRouter } from "react-router";
import Spinner from "./components/UI/Spinner/Spinner";

class ApplicationEditForm extends Component {

    constructor(props) {
        super(props);
        this.props.loadApplicationStart();
        this.props.loadApplication(this.props.id);
        this.state = {
                id: "",
                keyname: "",
                applicationAlias: "",
                displayName: "",
                description: "",
                mobileAppIndicator: "",
                desktopIndicator: "",
                regionalClassification: "",
                applicationOrWebsite: "",
                numberOfUsers: "",
                generateRevenueIndicator: "",
                objAppPlatformId: "",
                objAppHostingproviderId: "",
                tie: "",
                productionYear: "",
                retiredYear: "",
                url: "",
                cuiIndicator: "",
                uniqueIdentifierCode: "",
                referenceDocument: "",
                objOrgSsoId: "",
                objParentSystemId: "",
                objInvestmentId: "",
                objPortfolioId: "",
                objFismaId: "",
                objAppUserlocId: "",
                objApplicationStatusId: "",
                technologies: [],
                users: [],
                capabilities: [],
                business_pocs: [],
                technical_pocs: [],
                fismas: [],
                platforms: [],
                applicationNotes: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteChip = this.handleDeleteChip.bind(this);
        this.addChip = this.addChip.bind(this);
        this.modifyValue = this.modifyValue.bind(this);

        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
                ...this.state,
                ...nextProps.application.application});
    }


    addChip(fieldId, item) {
        let newState = Object.assign({}, this.state);
        newState[fieldId].push(item);
        this.setState({
            ...this.state,
            ...newState});
    }

    handleDeleteChip(fieldId, deletedChip) {
        let newState = Object.assign({}, this.state);
        newState[fieldId] = newState[fieldId].filter(function (obj) {
            return obj.id !== deletedChip;
        });
        this.setState({
            ...this.state,
            ...newState});
    }

    modifyValue(e, fieldName) {
        this.setState({
            ...this.state,
            [fieldName]: e.target.value });
    }

    save() {
        return Promise.all([
            this.props.saveApplication(this.state),
            this.props.history.push('/applications')
        ]);
    }

    handleClick(data) {
        //maybe pop-up with information about the technology or open new tab to tech page
    }

    render() {
        let simpleForm = (
            <Spinner />
        );
        if (!this.props.application.loading) {
            simpleForm = (
                <SimpleForm record={this.state} resource="applications" save={this.save}>
                    <GTextControl
                        id='id'
                        value={this.state.id}
                        label='Id'
                        disabled/>

                    <GTextControl id = 'keyname' label = 'Application name *' handleChange = {this.modifyValue}
                                  value = {this.state.keyname}/>

                    <GTextControl
                        id='applicationAlias'
                        value={this.state.applicationAlias}
                        label='Application alias'
                        handleChange={this.modifyValue}/>

                    <GTextControl
                        id='displayName'
                        value={this.state.displayName}
                        label='Short name will appear in graphic *'
                        handleChange={this.modifyValue}/>

                    <GTextControl
                        id='description'
                        value={this.state.description}
                        label='Description *'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='mobileAppIndicator'
                        value={this.state.mobileAppIndicator}
                        label='Mobile'
                        choices={ConfirmChoices}
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='desktopIndicator'
                        value={this.state.desktopIndicator}
                        choices={ConfirmChoices}
                        label='Desktop'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='regionalClassification'
                        value={this.state.regionalClassification}
                        choices={RegionChoices}
                        label='Regional classification'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='applicationOrWebsite'
                        value={this.state.applicationOrWebsite}
                        choices={AppOrWebChoices}
                        label='Application or website *'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='numberOfUsers'
                        value={this.state.numberOfUsers}
                        choices={UserCountBreakdown}
                        label='Number of users'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id= 'generateRevenueIndicator'
                        value= {this.state.generateRevenueIndicator}
                        choices= {ConfirmChoices}
                        label= 'Generates revenue'
                        handleChange= {this.modifyValue}/>

                    <GSelectControl
                        id='objAppPlatformId'
                        value={this.state.objAppPlatformId}
                        choices={this.props.application.platforms}
                        nameField='keyname'
                        label='Application Platform'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='objAppHostingproviderId'
                        value={this.state.objAppHostingproviderId}
                        choices={this.props.application.providers}
                        nameField='keyname'
                        label='Application Hosting Provider'
                        handleChange={this.modifyValue}/>

                    <GSelectControl
                        id='tier'
                        value={this.state.tie}
                        choices={TierChoices}
                        label='Tier'
                        handleChange={this.modifyValue}/>

                    <GTextControl
                        id='productionYear'
                        value={this.state.productionYear}
                        label='Production Year'
                        handleChange={this.modifyValue}/>

                    <GTextControl
                        id='retiredYear'
                        value={this.state.retiredYear}
                        label='Retired Year'
                        handleChange={this.modifyValue}/>

                    <GTextControl
                        id='url'
                        value={this.state.url}
                        label='URL'
                        handleChange={this.modifyValue}/>

                    <GSelectControl id= 'cuiIndicator' value= {this.state.cuiIndicator}
                                    choices= {ConfirmChoices} label= 'CUI' handleChange= {this.modifyValue}/>

                    <GTextControl id='uniqueIdentifierCode' value={this.state.uniqueIdentifierCode}
                                  defaultValue="0233-0000-0000000-xxxx" label='Unique identifier code *' handleChange={this.modifyValue}/>

                    <GTextControl
                        id='referenceDocument' value={this.state.referenceDocument} label='Reference Document'
                        handleChange={this.modifyValue}/>

                    <GSelectControl id='objOrgSsoId' value={this.state.objOrgSsoId}
                                    choices={this.props.application.users} nameField='keyname' label='SSO'
                                    handleChange={this.modifyValue}/>

                    <GSelectControl id='objParentSystemId' value={this.state.objParentSystemId}
                                    choices={this.props.application.parents} nameField='keyname' label='Parent system'
                                    handleChange={this.modifyValue}/>

                    <GSelectControl id='objInvestmentId' value={this.state.objInvestmentId}
                                    choices={this.props.application.investments} nameField='keyname' label='Investment'
                                    handleChange={this.modifyValue}/>

                    <GSelectControl id='objPortfolioId' value={this.state.objPortfolioId}
                                    choices={this.props.application.portfolios} nameField='keyname' label='Portfolio'
                                    handleChange={this.modifyValue}/>

                    <GSelectControl id='objFismaId' value={this.state.objFismaId}
                                    choices={this.props.application.fismas} nameField='fismaSysId' label='FISMA system'
                                    handleChange={this.modifyValue}/>

                    <GSelectControl id='objAppUserlocId' value={this.state.objAppUserlocId}
                                    choices={this.props.application.userlocations} nameField='keyname' label='User location'
                                    handleChange={this.modifyValue}/>

                    <GSelectControl id='objApplicationStatusId' value={this.state.objApplicationStatusId}
                                    choices={ConfirmChoices} label='Application status' handleChange={this.modifyValue}/>

                    <GMultiSelectControl
                        id='technologies'
                        label='Technologies'
                        value={this.state.technologies}
                        handleDeleteChip={this.handleDeleteChip}
                        handleChipClick={this.handleChipClick}
                        add={this.addChip}
                        options={this.props.application.technologies}
                        helper='Add this technology'
                    />

                    <GMultiSelectControl
                        id='capabilities'
                        label='Capabilities'
                        value={this.state.capabilities}
                        handleDeleteChip={this.handleDeleteChip}
                        handleChipClick={this.handleChipClick}
                        add={this.addChip}
                        options={this.props.application.capabilities}
                        helper='Add this capability'
                    />

                    <GMultiSelectControl
                        id='users'
                        label='Users'
                        value={this.state.users}
                        handleDeleteChip={this.handleDeleteChip}
                        handleChipClick={this.handleChipClick}
                        add={this.addChip}
                        options={this.props.application.users}
                        helper='Add this user'
                    />

                    <GMultiSelectControl
                        id='business_pocs'
                        label='Business POCs'
                        value={this.state.business_pocs}
                        handleDeleteChip={this.handleDeleteChip}
                        handleChipClick={this.handleChipClick}
                        add={this.addChip}
                        options={this.props.application.pocs}
                        helper='Add the POC'
                    />

                    <GMultiSelectControl
                        id='technical_pocs'
                        label='Technology POCs'
                        value={this.state.technical_pocs}
                        handleDeleteChip={this.handleDeleteChip}
                        handleChipClick={this.handleChipClick}
                        add={this.addChip}
                        options={this.props.application.pocs}
                        helper='Add the POC'
                    />
                    <GTextControl id='applicationNotes' value={this.state.applicationNotes}
                                  label='Application notes' multiline
                                  handleChange={this.modifyValue}/>

                </SimpleForm>
            )
        }
        return (
            <div>
                {simpleForm}
            </div>
        );
    }
}

ApplicationEditForm.propTypes = {
    application: PropTypes.object.isRequired,
    loadApplication: PropTypes.func.isRequired,
    saveApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({application: state.application});

function mapDispatchToProps(dispatch) {
    return {
        loadApplication: bindActionCreators(loadApplicationAction, dispatch),
        saveApplication: bindActionCreators(saveApplicationAction, dispatch),
        loadApplicationStart: bindActionCreators(loadApplicationStart, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationEditForm));
