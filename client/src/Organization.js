import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , CardActions, CreateButton, RefreshButton, Filter
  , DisabledInput, LongTextInput, SimpleForm, TextInput
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
        <TextInput label="Organization Name" source="kn" />
      </Filter>
  );

  export const OrganizationList = (props) => (
      <List {...props} actions={<ListActions />} title="Organizations" filters={<KeynameFilter />} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="Organization Name"/>
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const OrganizationTitle = ({ record }) => {
    return <span>Organization {record ? `"${record.keyname}"` : ''}</span>;
};

export const OrganizationEdit = (props) => (
    <Edit undoable={false} keyname={<OrganizationTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="displayName" validate={[required(), maxLength(25)]} />
            <TextInput source="link" />
            <TextInput source="parentId" />
        </SimpleForm>
    </Edit>
);

export const OrganizationCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="displayName" validate={[required(), maxLength(25)]} />
            <TextInput source="link" />
            <TextInput source="parentId" />
        </SimpleForm>
    </Create>
);
