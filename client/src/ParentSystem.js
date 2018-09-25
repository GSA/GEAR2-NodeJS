import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , DisabledInput, LongTextInput, SimpleForm, TextInput
  , CardActions, CreateButton, RefreshButton, Filter
  , SelectInput, ReferenceInput
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
        <TextInput  label="Parent System Name" source="kn" />
      </Filter>
  );

  export const ParentSystemList = (props) => (
      <List {...props} actions={<ListActions />} title="Parent Systems" filters={<KeynameFilter />} bulkActionButtons={false} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="Parent System Name"/>
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const ParentSystemTitle = ({ record }) => {
    return <span>ParentSystem {record ? `"${record.keyname}"` : ''}</span>;
};

export const ParentSystemEdit = (props) => (
    <Edit undoable={false} keyname={<ParentSystemTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" label="Parent System Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="url" />
            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organizations"
				sort={{ field: 'keyname', order: 'ASC' }}
				perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const ParentSystemCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="keyname" label="Parent System Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="url" />
            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organizations"
			  sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
