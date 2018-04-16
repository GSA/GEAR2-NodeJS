import React from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';
import epilogueClient from 'aor-epilogue-client';
import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { ArtifactsList, ArtifactsEdit, ArtifactsCreate } from './Artifacts';
import { PocsList, PocsEdit, PocsCreate } from './Pocs';

const App = () => (
    <Admin restClient={epilogueClient('http://localhost:3333')}>
      <Resource name="fisma" list={FismaList} edit={FismaEdit} create={FismaCreate} remove={Delete} />
      <Resource name="artifacts" list={ArtifactsList} edit={ArtifactsEdit} create={ArtifactsCreate} remove={Delete} />
      <Resource name="pocs" list={PocsList} edit={PocsEdit} create={PocsCreate} remove={Delete} />
    </Admin>
);

export default App;
