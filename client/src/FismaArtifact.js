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
        <TextInput label="keyname" source="kn" />
      </Filter>
  );

export const FismaArtifactList  = (props) => (
    <List {...props} actions={<ListActions />} title="Fisma Artifacts" filters={<KeynameFilter />} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="link" />
            <EditButton />
        </Datagrid>
    </List>
);

const FismaArtifactTitle = ({ record }) => {
    return <span>FismaArtifact {record ? `"${record.keyname}"` : ''}</span>;
};

export const FismaArtifactEdit = (props) => (
    <Edit keyname={<FismaArtifactTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <TextInput source="link" validate={[required(), maxLength(500)]} />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const FismaArtifactCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="keyname" validate={[required(), maxLength(80)]} />
          <TextInput source="link" validate={[required(), maxLength(500)]} />
          <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);
