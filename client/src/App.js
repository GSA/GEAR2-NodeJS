import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';
import epilogueClient from 'aor-epilogue-client';

import { AppHostingProviderList, AppHostingProviderEdit, AppHostingProviderCreate } from './AppHostingProvider';
import { ApplicationList, ApplicationEdit, ApplicationCreate } from './Application';
import { ApplicationCostList, ApplicationCostEdit, ApplicationCostCreate } from './ApplicationCost';
import { ApplicationInterfaceList, ApplicationInterfaceEdit, ApplicationInterfaceCreate } from './ApplicationInterface';
import { ApplicationLocalizationList, ApplicationLocalizationEdit, ApplicationLocalizationCreate } from './ApplicationLocalization';
import { ApplicationStatusList, ApplicationStatusEdit, ApplicationStatusCreate } from './ApplicationStatus';
import { AppPlatformList, AppPlatformEdit, AppPlatformCreate } from './AppPlatform';
import { AppUserLocList, AppUserLocEdit, AppUserLocCreate } from './AppUserLoc';
import { AtoTypeList, AtoTypeEdit, AtoTypeCreate } from './AtoType';
import { CapabilityList, CapabilityEdit, CapabilityCreate } from './Capability';
import { CuiCategoryList, CuiCategoryEdit, CuiCategoryCreate } from './CuiCategory';
import { DeploymentTypeList, DeploymentTypeEdit, DeploymentTypeCreate } from './DeploymentType';
import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { FismaArtifactList, FismaArtifactEdit, FismaArtifactCreate } from './FismaArtifact';
import { FsCloudSpList, FsCloudSpEdit, FsCloudSpCreate } from './FsCloudSp';
import { FsCloudStList, FsCloudStEdit, FsCloudStCreate } from './FsCloudSt';
import { FyList, FyEdit, FyCreate } from './Fy';
import { InvestmentList, InvestmentEdit, InvestmentCreate } from './Investment';
import { InvestmentCostList, InvestmentCostEdit, InvestmentCostCreate } from './InvestmentCost';
import { InvestmentTypeList, InvestmentTypeEdit, InvestmentTypeCreate } from './InvestmentType';
import { OmbArmCategoryList, OmbArmCategoryEdit, OmbArmCategoryCreate } from './OmbArmCategory';
import { OmbAssetInventoryList, OmbAssetInventoryEdit, OmbAssetInventoryCreate } from './OmbAssetInventory';
import { OmbDataTopicList, OmbDataTopicEdit, OmbDataTopicCreate } from './OmbDataTopic';
import { OmbIrmCategoryList, OmbIrmCategoryEdit, OmbIrmCategoryCreate } from './OmbIrmCategory';
import { OmbSrmInfoList, OmbSrmInfoEdit, OmbSrmInfoCreate } from './OmbSrmInfo';
import { OmbSupportedGoalList, OmbSupportedGoalEdit, OmbSupportedGoalCreate } from './OmbSupportedGoal';
import { OmbMeasurementCategoryList, OmbMeasurementCategoryEdit, OmbMeasurementCategoryCreate } from './OmbMeasurementCategory';
import { OrganizationList, OrganizationEdit, OrganizationCreate } from './Organization';
import { ParentSystemCostList, ParentSystemCostEdit, ParentSystemCostCreate } from './ParentSystemCost';
import { ParentSystemList, ParentSystemEdit, ParentSystemCreate } from './ParentSystem';
import { PiiCategoryList, PiiCategoryEdit, PiiCategoryCreate } from './PiiCategory';
import { PocList, PocEdit, PocCreate } from './Poc';
import { PortfolioList, PortfolioEdit, PortfolioCreate } from './Portfolio';
import { ReferenceDocumentList, ReferenceDocumentEdit, ReferenceDocumentCreate } from './ReferenceDocument';
import { ScImpactLevelList, ScImpactLevelEdit, ScImpactLevelCreate } from './ScImpactLevel';
import { StandardCategoryList, StandardCategoryEdit, StandardCategoryCreate } from './StandardCategory';
import { StandardTypeList, StandardTypeEdit, StandardTypeCreate } from './StandardType';
import { TechnologyList, TechnologyEdit, TechnologyCreate } from './Technology';
import { TechnologyStatusList, TechnologyStatusEdit, TechnologyStatusCreate } from './TechnologyStatus';
import { TimeQuadrantList, TimeQuadrantEdit, TimeQuadrantCreate } from './TimeQuadrant';
import { YearList, YearEdit, YearCreate } from './Year';

const App = () => (
    <Admin restClient={epilogueClient('http://localhost:3333')}>
      <Resource name="appHostingProvider" list={AppHostingProviderList} edit={AppHostingProviderEdit} create={AppHostingProviderCreate} remove={Delete} />
      <Resource name="application" list={ApplicationList} edit={ApplicationEdit} create={ApplicationCreate} remove={Delete} />
      <Resource name="applicationCost" list={ApplicationCostList} edit={ApplicationCostEdit} create={ApplicationCostCreate} remove={Delete} />
      <Resource name="applicationInterfaces" list={ApplicationInterfaceList} edit={ApplicationInterfaceEdit} create={ApplicationInterfaceCreate} remove={Delete} />
      <Resource name="applicationLocalization" list={ApplicationLocalizationList} edit={ApplicationLocalizationEdit} create={ApplicationLocalizationCreate} remove={Delete} />
      <Resource name="applicationStatus" list={ApplicationStatusList} edit={ApplicationStatusEdit} create={ApplicationStatusCreate} remove={Delete} />
      <Resource name="appPlatform" list={AppPlatformList} edit={AppPlatformEdit} create={AppPlatformCreate} remove={Delete} />
      <Resource name="appUserLoc" list={AppUserLocList} edit={AppUserLocEdit} create={AppUserLocCreate} remove={Delete} />
      <Resource name="atoType" list={AtoTypeList} edit={AtoTypeEdit} create={AtoTypeCreate} remove={Delete} />
      <Resource name="capability" list={CapabilityList} edit={CapabilityEdit} create={CapabilityCreate} remove={Delete} />

      <Resource name="cuiCategory" list={CuiCategoryList} edit={CuiCategoryEdit} create={CuiCategoryCreate} remove={Delete} />
      <Resource name="deploymentType" list={DeploymentTypeList} edit={DeploymentTypeEdit} create={DeploymentTypeCreate} remove={Delete} />
      <Resource name="fisma" list={FismaList} edit={FismaEdit} create={FismaCreate} remove={Delete} />
      <Resource name="fismaArtifact" list={FismaArtifactList} edit={FismaArtifactEdit} create={FismaArtifactCreate} remove={Delete} />
      <Resource name="fsCloudSp" list={FsCloudSpList} edit={FsCloudSpEdit} create={FsCloudSpCreate} remove={Delete} />
      <Resource name="fsCloudSt" list={FsCloudStList} edit={FsCloudStEdit} create={FsCloudStCreate} remove={Delete} />
      <Resource name="fy" list={FyList} edit={FyEdit} create={FyCreate} remove={Delete} />
      <Resource name="investment" list={InvestmentList} edit={InvestmentEdit} create={InvestmentCreate} remove={Delete} />
      <Resource name="investmentCost" list={InvestmentCostList} edit={InvestmentCostEdit} create={InvestmentCostCreate} remove={Delete} />
      <Resource name="investmentType" list={InvestmentTypeList} edit={InvestmentTypeEdit} create={InvestmentTypeCreate} remove={Delete} />

      <Resource name="ombArmCategory" list={OmbArmCategoryList} edit={OmbArmCategoryEdit} create={OmbArmCategoryCreate} remove={Delete} />
      <Resource name="ombAssetInventory" list={OmbAssetInventoryList} edit={OmbAssetInventoryEdit} create={OmbAssetInventoryCreate} remove={Delete} />
      <Resource name="ombDataTopic" list={OmbDataTopicList} edit={OmbDataTopicEdit} create={OmbDataTopicCreate} remove={Delete} />
      <Resource name="ombIrmCategory" list={OmbIrmCategoryList} edit={OmbIrmCategoryEdit} create={OmbIrmCategoryCreate} remove={Delete} />
      <Resource name="ombSrmInfo" list={OmbSrmInfoList} edit={OmbSrmInfoEdit} create={OmbSrmInfoCreate} remove={Delete} />
      <Resource name="ombSupportedGoal" list={OmbSupportedGoalList} edit={OmbSupportedGoalEdit} create={OmbSupportedGoalCreate} remove={Delete} />
      <Resource name="ombMeasurementCategory" list={OmbMeasurementCategoryList} edit={OmbMeasurementCategoryEdit} create={OmbMeasurementCategoryCreate} remove={Delete} />
      <Resource name="organization" list={OrganizationList} edit={OrganizationEdit} create={OrganizationCreate} remove={Delete} />
      <Resource name="parentSystemCost" list={ParentSystemCostList} edit={ParentSystemCostEdit} create={ParentSystemCostCreate} remove={Delete} />
      <Resource name="parentSystem" list={ParentSystemList} edit={ParentSystemEdit} create={ParentSystemCreate} remove={Delete} />

      <Resource name="piiCategory" list={PiiCategoryList} edit={PiiCategoryEdit} create={PiiCategoryCreate} remove={Delete} />
      <Resource name="poc" list={PocList} edit={PocEdit} create={PocCreate} remove={Delete} />
      <Resource name="portfolio" list={PortfolioList} edit={PortfolioEdit} create={PortfolioCreate} remove={Delete} />
      <Resource name="referenceDocument" list={ReferenceDocumentList} edit={ReferenceDocumentEdit} create={ReferenceDocumentCreate} remove={Delete} />
      <Resource name="scImpactLevel" list={ScImpactLevelList} edit={ScImpactLevelEdit} create={ScImpactLevelCreate} remove={Delete} />
      <Resource name="standardCategory" list={StandardCategoryList} edit={StandardCategoryEdit} create={StandardCategoryCreate} remove={Delete} />
      <Resource name="standardType" list={StandardTypeList} edit={StandardTypeEdit} create={StandardTypeCreate} remove={Delete} />
      <Resource name="technology" list={TechnologyList} edit={TechnologyEdit} create={TechnologyCreate} remove={Delete} />
      <Resource name="technologyStatus" list={TechnologyStatusList} edit={TechnologyStatusEdit} create={TechnologyStatusCreate} remove={Delete} />
      <Resource name="timeQuadrant" list={TimeQuadrantList} edit={TimeQuadrantEdit} create={TimeQuadrantCreate} remove={Delete} />

      <Resource name="year" list={YearList} edit={YearEdit} create={YearCreate} remove={Delete} />
    </Admin>
);

export default App;
