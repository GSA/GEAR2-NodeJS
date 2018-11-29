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
import { withRouter } from "react-router";

class ApplicationEditForm extends Component {

    constructor(props) {
        super(props);
        this.props.loadApplication(this.props.id);
        this.state = {
            application: {
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
            }
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
        newState[fieldId].push(item);
        this.setState(newState);
        console.log(this.state.technologies.length);
    }

    handleDeleteChip(fieldId, deletedChip) {
        let newState = Object.assign({}, this.state);
        newState[fieldId] = newState[fieldId].filter(function (obj) {
            return obj.id !== deletedChip;
        });
        this.setState(newState);
    }

    modifyValue(e, fieldName) {
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
            <SimpleForm record={this.state.application} resource="applications" save={this.save}>
                <GTextControl
                    id='id'
                    value={this.state.application.id}
                    label='Id'
                    disabled/>

                <GTextControl
                    id='name'
                    value={this.state.application.keyname}
                    label='Application name *'/>

                <GTextControl
                    id='alias'
                    value={this.state.application.applicationAlias}
                    label='Application alias'/>

                <GTextControl
                    id='displayName'
                    value={this.state.application.displayName}
                    label='Short name will appear in graphic *'/>

                <GTextControl
                    id='description'
                    value={this.state.application.description}
                    label='Description *'/>

                <GSelectControl
                    id='mobileAppIndicator'
                    value={this.state.application.mobileAppIndicator}
                    choices={ConfirmChoices}
                    label='Mobile'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id='desktopIndicator'
                    value={this.state.application.desktopIndicator}
                    choices={ConfirmChoices}
                    label='Desktop'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id='regionalClassification'
                    value={this.state.application.regionalClassification}
                    choices={RegionChoices}
                    label='Regional classification'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id='applicationOrWebsite'
                    value={this.state.application.applicationOrWebsite}
                    choices={AppOrWebChoices}
                    label='Application or website *'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id='numberOfUsers'
                    value={this.state.application.numberOfUsers}
                    choices={UserCountBreakdown}
                    label='Number of users'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id= 'generateRevenueIndicator'
                    value= {this.state.application.generateRevenueIndicator}
                    choices= {ConfirmChoices}
                    label= 'Generates revenue'
                    handleChange= {this.modifyValue}/>

                <GSelectControl
                    id='objAppPlatformId'
                    value={this.state.application.objAppPlatformId}
                    choices={this.props.application.platforms}
                    nameField='keyname'
                    label='Application Platform'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id='objAppHostingproviderId'
                    value={this.state.application.objAppHostingproviderId}
                    choices={this.props.application.providers}
                    nameField='keyname'
                    label='Application Hosting Provider'
                    handleChange={this.modifyValue}/>

                <GSelectControl
                    id='tier'
                    value={this.state.application.tie}
                    choices={TierChoices}
                    label='Tier'
                    handleChange={this.modifyValue}/>

                <GTextControl
                    id='productionYear'
                    value={this.state.application.productionYear}
                    label='Production Year'
                    handleChange={this.modifyValue}/>

                <GTextControl
                    id='retiredYear'
                    value={this.state.application.retiredYear}
                    label='Retired Year'/>

                <GTextControl
                    id='url'
                    value={this.state.application.url}
                    label='URL'/>

                <GSelectControl id= 'cuiIndicator' value= {this.state.application.cuiIndicator}
                                choices= {ConfirmChoices} label= 'CUI' handleChange= {this.modifyValue}/>

                <GTextControl id='uniqueIdentifierCode' value={this.state.application.uniqueIdentifierCode}
                              defaultValue="0233-0000-0000000-xxxx" label='Unique identifier code *'/>

                <GTextControl
                    id='referenceDocument' value={this.state.application.referenceDocument} label='Reference Document'/>

                <GSelectControl id='objOrgSsoId' value={this.state.application.objOrgSsoId}
                                choices={this.props.application.users} nameField='keyname' label='SSO'
                                handleChange={this.modifyValue}/>

                <GSelectControl id='objParentSystemId' value={this.state.application.objParentSystemId}
                                choices={this.props.application.parents} nameField='keyname' label='Parent system'
                                handleChange={this.modifyValue}/>

                <GSelectControl id='objInvestmentId' value={this.state.application.objInvestmentId}
                                choices={this.props.application.investments} nameField='keyname' label='Investment'
                                handleChange={this.modifyValue}/>

                <GSelectControl id='objPortfolioId' value={this.state.application.objPortfolioId}
                                choices={this.props.application.portfolios} nameField='keyname' label='Portfolio'
                                handleChange={this.modifyValue}/>

                <GSelectControl id='objFismaId' value={this.state.application.objFismaId}
                                choices={this.props.application.fismas} nameField='fismaSysId' label='FISMA system'
                                handleChange={this.modifyValue}/>

                <GSelectControl id='objAppUserlocId' value={this.state.application.objAppUserlocId}
                                choices={this.props.application.userlocations} nameField='keyname' label='User location'
                                handleChange={this.modifyValue}/>

                <GSelectControl id='objApplicationStatusId' value={this.state.application.objApplicationStatusId}
                                choices={ConfirmChoices} label='Application status' handleChange={this.modifyValue}/>

                <GMultiSelectControl
                    id='technologies'
                    label='Technologies'
                    values={this.state.application.technologies}
                    handleDeleteChip={this.handleDeleteChip}
                    handleChipClick={this.handleChipClick}
                    add={this.addChip}
                    options={this.props.application.technologies}
                    helper='Add this technology'
                />

                <GMultiSelectControl
                    id='capabilities'
                    label='Capabilities'
                    values={this.state.application.capabilities}
                    handleDeleteChip={this.handleDeleteChip}
                    handleChipClick={this.handleChipClick}
                    add={this.addChip}
                    options={this.props.application.capabilities}
                    helper='Add this capability'
                />

                <GMultiSelectControl
                    id='users'
                    label='Users'
                    values={this.state.application.users}
                    handleDeleteChip={this.handleDeleteChip}
                    handleChipClick={this.handleChipClick}
                    add={this.addChip}
                    options={this.props.application.users}
                    helper='Add this user'
                />

                <GMultiSelectControl
                    id='business_pocs'
                    label='Business POCs'
                    values={this.state.application.business_pocs}
                    handleDeleteChip={this.handleDeleteChip}
                    handleChipClick={this.handleChipClick}
                    add={this.addChip}
                    options={this.props.application.pocs}
                    helper='Add the POC'
                />

                <GMultiSelectControl
                    id='technical_pocs'
                    label='Technology POCs'
                    values={this.state.application.technical_pocs}
                    handleDeleteChip={this.handleDeleteChip}
                    handleChipClick={this.handleChipClick}
                    add={this.addChip}
                    options={this.props.application.pocs}
                    helper='Add the POC'
                />
                <GTextControl id='applicationNotes' value={this.state.application.applicationNotes}
                              label='Application notes' multiline/>


            </SimpleForm>
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
        saveApplication: bindActionCreators(saveApplicationAction, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationEditForm));
