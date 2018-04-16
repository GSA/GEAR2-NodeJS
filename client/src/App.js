import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import epilogueClient from 'aor-epilogue-client';
import { FismaList, FismaEdit, FismaCreate } from './Fisma';
import { ArtifactsList, ArtifactsEdit, ArtifactsCreate } from './Artifacts';
import { PocsList, PocsEdit, PocsCreate } from './Pocs';

const App = () => (
    <Admin restClient={epilogueClient('http://127.0.0.1:3333')}>
      <Resource name="fisma" list={FismaList} edit={FismaEdit} create={FismaCreate} />
      <Resource name="artifacts" list={ArtifactsList} edit={ArtifactsEdit} create={ArtifactsCreate} />
      <Resource name="pocs" list={PocsList} edit={PocsEdit} create={PocsCreate} />
    </Admin>
);

export default App;
