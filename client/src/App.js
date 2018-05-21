import React from 'react';
import { Admin, Resource, Delete } from 'react-admin';
import epilogueClient from 'aor-epilogue-client';

import { ApplicationList, ApplicationEdit, ApplicationCreate } from './Application';
import { CapabilityList, CapabilityEdit, CapabilityCreate } from './Capability';
import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { InvestmentList, InvestmentEdit, InvestmentCreate } from './Investment';
import { ParentSystemList, ParentSystemEdit, ParentSystemCreate } from './ParentSystem';
import { PocList, PocEdit, PocCreate } from './Poc';
import { TechnologyList, TechnologyEdit, TechnologyCreate } from './Technology';

import Dashboard from './Dashboard';

const App = () => (
    <Admin  dashboard={Dashboard} dataProvider={epilogueClient(`/api/v1`)}>

      <Resource name="application" options={{ label: 'Business Applications' }} list={ApplicationList} edit={ApplicationEdit} create={ApplicationCreate} remove={Delete} />
      <Resource name="capability" options={{ label: 'Business Capabilities' }} list={CapabilityList} edit={CapabilityEdit} create={CapabilityCreate} remove={Delete} />
      <Resource name="poc" options={{ label: 'Contacts' }} list={PocList} edit={PocEdit} create={PocCreate} remove={Delete} />
      <Resource name="fisma" options={{ label: 'FISMA Systems' }} list={FismaList} edit={FismaEdit} create={FismaCreate} remove={Delete} />
      <Resource name="investment" options={{ label: 'Investments' }} list={InvestmentList} edit={InvestmentEdit} create={InvestmentCreate} remove={Delete} />
      <Resource name="parentSystem" options={{ label: 'Parent Systems' }} list={ParentSystemList} edit={ParentSystemEdit} create={ParentSystemCreate} remove={Delete} />
      <Resource name="technology" options={{ label: 'Technologies' }} list={TechnologyList} edit={TechnologyEdit} create={TechnologyCreate} remove={Delete} />

      <Resource name="appHostingProvider" />
      <Resource name="applicationCost" />
      <Resource name="applicationInterfaces" />
      <Resource name="applicationLocalization" />
      <Resource name="applicationStatus" />
      <Resource name="appPlatform" />
      <Resource name="appUserLoc" />
      <Resource name="atoType" />
      <Resource name="cuiCategory" />
      <Resource name="deploymentType" />
      <Resource name="fismaArtifacts" />
      <Resource name="fsCloudSp" />
      <Resource name="fsCloudSt" />
      <Resource name="fy" />
      <Resource name="investmentCost" />
      <Resource name="investmentType" />
      <Resource name="ombArmCategory" />
      <Resource name="ombAssetInventory" />
      <Resource name="ombDataTopic" />
      <Resource name="ombIrmCategory" />
      <Resource name="ombSrmInfo" />
      <Resource name="ombSupportedGoal" />
      <Resource name="ombMeasurementCategory" />
      <Resource name="organization" />
      <Resource name="parentSystemCost" />
      <Resource name="piiCategory" />
      <Resource name="portfolio" />
      <Resource name="referenceDocument" />
      <Resource name="scImpactLevel" />
      <Resource name="standardCategory" />
      <Resource name="standardType" />
      <Resource name="technologyStatus" />
      <Resource name="timeQuadrant" />
      <Resource name="year" />
    </Admin>
);

export default App;
