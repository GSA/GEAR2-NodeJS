import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput
  , required, maxLength } from 'react-admin';

  const ListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, push }) => (
      <CardActions>
          {filters && React.cloneElement(filters, {
              resource,
              showFilter,
              displayedFilters,
              filterValues,
              context: 'button',
          }) }
          <CreateButton basePath={basePath} />
          <RefreshButton />
      </CardActions>
  );

  const KeynameFilter = props => (
      <Filter {...props}>
        <TextInput label="FISMA Artifacts Name" source="kn" />
      </Filter>
  );

export const FismaArtifactList  = (props) => (
    <List {...props} actions={<ListActions />} title="FISMA Artifacts" filters={<KeynameFilter />} bulkActionButtons={false} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="FISMA Artifacts Name"/>
            <TextField source="link" label="Link"/>
            <EditButton />
        </Datagrid>
    </List>
);

const FismaArtifactTitle = ({ record }) => {
    return <span>FismaArtifact {record ? `"${record.keyname}"` : ''}</span>;
};

export const FismaArtifactEdit = (props) => (
    <Edit undoable={false} title="FISMA Artifact" keyname={<FismaArtifactTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname"  label="FISMA Artifact Name" validate={[required(), maxLength(80)]} />
            <TextInput source="link" validate={[required(), maxLength(500)]} />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const FismaArtifactCreate = (props) => (
    <Create undoable={false} title="FISMA Artifact" {...props}>
        <SimpleForm>
          <TextInput source="keyname" label="FISMA Artifact Name" validate={[required(), maxLength(80)]} />
          <TextInput source="link" validate={[required(), maxLength(500)]} />
          <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);
