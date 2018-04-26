import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';
import epilogueClient from 'aor-epilogue-client';

import { AppHostingProviderList, AppHostingProviderEdit, AppHostingProviderCreate } from './AppHostingProvider';
import { ApplicationStatusList, ApplicationStatusEdit, ApplicationStatusCreate } from './ApplicationStatus';
import { ApplicationList, ApplicationEdit, ApplicationCreate } from './Application';
import { ApplicationCostList, ApplicationCostEdit, ApplicationCostCreate } from './ApplicationCost';
import { ApplicationInterfacesList, ApplicationInterfacesEdit, ApplicationInterfacesCreate } from './ApplicationInterfaces';
import { ApplicationLocalizationList, ApplicationLocalizationEdit, ApplicationLocalizationCreate } from './ApplicationLocalization';
import { ApplicationStatusList, ApplicationStatusEdit, ApplicationStatusCreate } from './ApplicationStatus';
import { AppPlatformList, AppPlatformEdit, AppPlatformCreate } from './AppPlatform';
import { AppUserLocList, AppUserLocEdit, AppUserLocCreate } from './AppUserLoc';
import { ATOTypeList, ATOTypeEdit, ATOTypeCreate } from './ATOType';
import { CapabilityList, CapabilityEdit, CapabilityCreate } from './Capability';
import { CUICategoryList, CUICategoryEdit, CUICategoryCreate } from './CUICategory';
import { DeploymentTypeList, DeploymentTypeEdit, DeploymentTypeCreate } from './DeploymentType';
import { FSCloudSPList, FSCloudSPEdit, FSCloudSPCreate } from './FSCloudSP';

import { _blankList, _blankEdit, _blankCreate } from './_blank';

import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { ArtifactsList, ArtifactsEdit, ArtifactsCreate } from './Artifacts';
import { PocsList, PocsEdit, PocsCreate } from './Pocs';
import { FSCloudSTList, FSCloudSTEdit, FSCloudSTCreate } from './FSCloudST';
import models from '../../models';

const App = () => (
    <Admin restClient={epilogueClient('http://localhost:3333')}>
      <Resource name="fisma" list={FismaList} edit={FismaEdit} create={FismaCreate} remove={Delete} />
      <Resource name="artifacts" list={ArtifactsList} edit={ArtifactsEdit} create={ArtifactsCreate} remove={Delete} />
      <Resource name="pocs" list={PocsList} edit={PocsEdit} create={PocsCreate} remove={Delete} />
      <Resource name="fscloudsts" />
    </Admin>
);

export default App;
