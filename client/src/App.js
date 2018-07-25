import React from 'react';
import { Admin, Resource, Delete } from 'react-admin';
import epilogueClient from './client-config';
//import epilogueClient from './data-provider';

import { ApplicationList, ApplicationEdit, ApplicationCreate } from './Application';
import { CapabilityList, CapabilityEdit, CapabilityCreate } from './Capability';
import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { FismaArtifactList, FismaArtifactEdit, FismaArtifactCreate } from './FismaArtifact';
import { InvestmentList, InvestmentEdit, InvestmentCreate } from './Investment';
import { ParentSystemList, ParentSystemEdit, ParentSystemCreate } from './ParentSystem';
import { PocList, PocEdit, PocCreate } from './Poc';
import { TechnologyList, TechnologyEdit, TechnologyCreate } from './Technology';
import { ReferenceDocumentList, ReferenceDocumentEdit, ReferenceDocumentCreate } from './ReferenceDocument';

import authProvider from './authProvider';
import LoginPage from './LoginPage';
import LogoutButton from './LogoutButton';
import Dashboard from './Dashboard';

const App = () => (
    <Admin
      authProvider={authProvider}
      loginPage={LoginPage}
      logoutButton={LogoutButton}
      dashboard={Dashboard}
      dataProvider={epilogueClient(`/api/v1`)}
    >

      <Resource name="applications" options={{ label: 'Business Applications' }} list={ApplicationList} edit={ApplicationEdit} create={ApplicationCreate} remove={Delete} />
      <Resource name="capabilities" options={{ label: 'Business Capabilities' }} list={CapabilityList} edit={CapabilityEdit} create={CapabilityCreate} remove={Delete} />
      <Resource name="pocs" options={{ label: 'Contacts' }} list={PocList} edit={PocEdit} create={PocCreate} remove={Delete} />
      <Resource name="fismas" options={{ label: 'FISMA Systems' }} list={FismaList} edit={FismaEdit} create={FismaCreate} remove={Delete} />
      <Resource name="fisma_artifacts" options={{ label: 'FISMA Artifacts' }} list={FismaArtifactList} edit={FismaArtifactEdit} create={FismaArtifactCreate} />
      <Resource name="investments" options={{ label: 'Investments' }} list={InvestmentList} edit={InvestmentEdit} create={InvestmentCreate} remove={Delete} />
      <Resource name="parent_systems" options={{ label: 'Parent Systems' }} list={ParentSystemList} edit={ParentSystemEdit} create={ParentSystemCreate} remove={Delete} />
      <Resource name="technologies" options={{ label: 'Technologies' }} list={TechnologyList} edit={TechnologyEdit} create={TechnologyCreate} remove={Delete} />
      <Resource name="reference_documents" options={{ label: 'Technology Ref Doc' }} list={ReferenceDocumentList} edit={ReferenceDocumentEdit} create={ReferenceDocumentCreate} remove={Delete} />

      <Resource name="app_hostingproviders" />
      <Resource name="application_costs" />
      <Resource name="application_interfaces" />
      <Resource name="application_rationalizations" />
      <Resource name="application_statuses" />
      <Resource name="app_platforms" />
      <Resource name="ato_types" />
      <Resource name="cui_categories" />
      <Resource name="deployment_types" />
      <Resource name="fscloudsps" />
      <Resource name="fscloudsts" />
      <Resource name="fys" />
      <Resource name="investment_costs" />
      <Resource name="investment_types" />
      <Resource name="organizations" />
      <Resource name="parent_system_costs" />
      <Resource name="pii_categories" />
      <Resource name="portfolios" />
      <Resource name="sc_impact_levels" />
      <Resource name="standard_categories" />
      <Resource name="standard_types" />
      <Resource name="technology_statuses" />
      <Resource name="time_quadrants" />
      <Resource name="user_locations" />
      <Resource name="years" />
    </Admin>
);

export default App;
