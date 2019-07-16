import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , DisabledInput, SimpleForm, TextInput
  , CardActions, CreateButton, RefreshButton, Filter
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

  export const ReferenceDocumentList = (props) => (
      <List {...props} actions={<ListActions />} title="Technology Reference Documents" filters={<KeynameFilter />} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const ReferenceDocumentTitle = ({ record }) => {
    return <span>ReferenceDocument {record ? `"${record.keyname}"` : ''}</span>;
};

export const ReferenceDocumentEdit = (props) => (
    <Edit undoable={false} keyname={<ReferenceDocumentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
        </SimpleForm>
    </Edit>
);

export const ReferenceDocumentCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
        </SimpleForm>
    </Create>
);
