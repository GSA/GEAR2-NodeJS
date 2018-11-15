import React, {Component} from 'react';
import { Admin, Resource } from 'react-admin';
import epilogueClient from './data-provider';
import PropTypes from 'prop-types';
import { ApplicationList, ApplicationEdit, ApplicationCreate } from './Application';
import { ApplicationInterfaceList, ApplicationInterfaceEdit, ApplicationInterfaceCreate } from './ApplicationInterface';
import { ApplicationRationalizationList, ApplicationRationalizationEdit, ApplicationRationalizationCreate } from './ApplicationRationalization';
import { CapabilityList, CapabilityEdit, CapabilityCreate } from './Capability';
import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { FismaArtifactList, FismaArtifactEdit, FismaArtifactCreate } from './FismaArtifact';
import { InvestmentList, InvestmentEdit, InvestmentCreate } from './Investment';
import { ParentSystemList, ParentSystemEdit, ParentSystemCreate } from './ParentSystem';
import { PocList, PocEdit, PocCreate } from './Poc';
import { TechnologyList, TechnologyEdit, TechnologyCreate } from './Technology';

import authProvider from './authProvider';
import LoginPage from './LoginPage';
import LogoutButton from './LogoutButton';
import Dashboard from './Dashboard';

import application from './reducers/applicationReducer';
import technology from './reducers/technologyReducer';
import applicationSaga from './sagas/applicationSagas';
import technologySaga from './sagas/technologySagas';
import userSaga from './sagas/usersSagas';
import fismaSagas from './sagas/fismaSagas';
import platformsSagas from './sagas/platformsSagas';
import capabilitySagas from './sagas/capabilitySagas';
import parentSagas from './sagas/parentSagas';
import investmentSagas from './sagas/investmentSagas';
import portfolioSagas from './sagas/portfolioSagas';
import providersSagas from './sagas/providersSagas';
import appLoadSaga from './sagas/appLoadSagas';


class App extends Component {
    render() {
        return (
            <Admin
                authProvider={authProvider}
                loginPage={LoginPage}
                logoutButton={LogoutButton}
                dashboard={Dashboard}
                customReducers={{application: application, technology: technology}}
                customSagas={[appLoadSaga, applicationSaga, technologySaga, userSaga, capabilitySagas, fismaSagas,
                    platformsSagas, portfolioSagas, investmentSagas, parentSagas, providersSagas]}
                dataProvider={epilogueClient(`/api/v1`)}
            >
                {permissions => [
                    permissions.split(',').includes('application:PUT') || permissions.split(',').includes('application:POST') ?
                        <Resource name="applications" options={{label: 'Business Applications'}} list={ApplicationList}
                                  edit={ApplicationEdit} create={ApplicationCreate}/> : <Resource name="applications"/>,
                    permissions.split(',').includes('applicationInterface:PUT') || permissions.split(',').includes('applicationInterface:POST') ?
                        <Resource name="application_interfaces" options={{label: 'Application Interfaces'}}
                                  list={ApplicationInterfaceList} edit={ApplicationInterfaceEdit}
                                  create={ApplicationInterfaceCreate}/> : <Resource name="application_interfaces"/>,
                    permissions.split(',').includes('applicationRationalization:PUT') || permissions.split(',').includes('applicationRationalization:POST') ?
                        <Resource name="application_rationalizations" options={{label: 'App Rationalization'}}
                                  list={ApplicationRationalizationList} edit={ApplicationRationalizationEdit}
                                  create={ApplicationRationalizationCreate}/> :
                        <Resource name="application_rationalizations"/>,
                    permissions.split(',').includes('capability:PUT') || permissions.split(',').includes('capability:POST') ?
                        <Resource name="capabilities" options={{label: 'Business Capabilities'}} list={CapabilityList}
                                  edit={CapabilityEdit} create={CapabilityCreate}/> : <Resource name="capabilities"/>,
                    permissions.split(',').includes('poc:PUT') || permissions.split(',').includes('poc:POST') ?
                        <Resource name="pocs" options={{label: 'Point of Contacts'}} list={PocList} edit={PocEdit}
                                  create={PocCreate}/> : <Resource name="pocs"/>,
                    permissions.split(',').includes('fisma:PUT') || permissions.split(',').includes('fisma:POST') ?
                        <Resource name="fismas" options={{label: 'FISMA Systems'}} list={FismaList} edit={FismaEdit}
                                  create={FismaCreate}/> : <Resource name="fismas"/>,
                    permissions.split(',').includes('fismaArtifact:PUT') || permissions.split(',').includes('fismaArtifact:POST') ?
                        <Resource name="fisma_artifacts" options={{label: 'FISMA Artifacts'}} list={FismaArtifactList}
                                  edit={FismaArtifactEdit} create={FismaArtifactCreate}/> :
                        <Resource name="fisma_artifacts"/>,
                    permissions.split(',').includes('investment:PUT') || permissions.split(',').includes('investment:POST') ?
                        <Resource name="investments" options={{label: 'Investments'}} list={InvestmentList}
                                  edit={InvestmentEdit} create={InvestmentCreate}/> : <Resource name="investments"/>,
                    permissions.split(',').includes('parentSystem:PUT') || permissions.split(',').includes('parentSystemn:POST') ?
                        <Resource name="parent_systems" options={{label: 'Parent Systems'}} list={ParentSystemList}
                                  edit={ParentSystemEdit} create={ParentSystemCreate}/> :
                        <Resource name="parent_systems"/>,
                    permissions.split(',').includes('technology:PUT') || permissions.split(',').includes('technology:POST') ?
                        <Resource name="technologies" options={{label: 'Technologies'}} list={TechnologyList}
                                  edit={TechnologyEdit} create={TechnologyCreate}/> : <Resource name="technologies"/>,


                    <Resource name="app_hostingproviders"/>,
                    <Resource name="application_costs"/>,
                    <Resource name="application_statuses"/>,
                    <Resource name="app_platforms"/>,
                    <Resource name="ato_types"/>,
                    <Resource name="cui_categories"/>,
                    <Resource name="deployment_types"/>,
                    <Resource name="fscloudsps"/>,
                    <Resource name="fscloudsts"/>,
                    <Resource name="fys"/>,
                    <Resource name="investment_costs"/>,
                    <Resource name="investment_types"/>,
                    <Resource name="organizations"/>,
                    <Resource name="parent_system_costs"/>,
                    <Resource name="pii_categories"/>,
                    <Resource name="portfolios"/>,
                    <Resource name="sc_impact_levels"/>,
                    <Resource name="reference_documents"/>,
                    <Resource name="standard_categories"/>,
                    <Resource name="standard_types"/>,
                    <Resource name="technology_statuses"/>,
                    <Resource name="time_quadrants"/>,
                    <Resource name="user_locations"/>,
                    <Resource name="years"/>,
                    <Resource name="technologyreplacedbys"/>,
                    <Resource name="applicationreplacedbys"/>,
                    <Resource name="fismareplacedbys"/>,
                ]}
            </Admin>
        );
    }

}

export default App;